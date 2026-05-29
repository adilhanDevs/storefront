import { type TypedDocumentString } from "../gql/graphql";
import * as mocks from "./mocks";

// ============================================================================
// Result Types - Explicit error handling without exceptions
// ============================================================================

/**
 * Error layers in order of occurrence:
 * 1. network - Failed to reach server (timeout, DNS, connection refused)
 * 2. http - Server responded with error status (4xx, 5xx)
 * 3. graphql - Query/mutation syntax or validation errors
 * 4. validation - Saleor domain errors (e.g., "email already exists")
 */
export type GraphQLErrorType = "network" | "http" | "graphql" | "validation";

export interface GraphQLError {
	type: GraphQLErrorType;
	message: string;
	/** HTTP status code (only for 'http' type) */
	statusCode?: number;
	/** Whether the request could succeed if retried */
	isRetryable: boolean;
	/** Original error for debugging */
	cause?: unknown;
	/** Saleor validation errors with field info (only for 'validation' type) */
	validationErrors?: ReadonlyArray<{
		field?: string | null;
		message: string;
		code?: string | null;
	}>;
}

/** Success result with data */
export interface GraphQLSuccess<T> {
	ok: true;
	data: T;
}

/** Error result with typed error */
export interface GraphQLFailure {
	ok: false;
	error: GraphQLError;
}

/** Result type - either success with data or failure with error */
export type GraphQLResult<T> = GraphQLSuccess<T> | GraphQLFailure;

// ============================================================================
// Helper functions
// ============================================================================

function success<T>(data: T): GraphQLSuccess<T> {
	return { ok: true, data };
}

function productConnection(products = mocks.MOCK_PRODUCTS) {
	return {
		edges: products.map((node) => ({ node })),
		pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
		totalCount: products.length,
	};
}

/** User-friendly message for each error type */
export function getUserMessage(error: GraphQLError): string {
	switch (error.type) {
		case "network":
			return "Unable to connect to the store. Please check your internet connection.";
		case "http":
			if (error.statusCode === 401 || error.statusCode === 403) {
				return "You don't have permission to view this content.";
			}
			if (error.statusCode === 404) {
				return "The item you're looking for doesn't exist or has been removed.";
			}
			return "The store is temporarily unavailable. Please try again in a moment.";
		case "graphql":
			return "Something went wrong loading this page.";
		case "validation":
			return error.message || "Please check your input and try again.";
	}
}

// ============================================================================
// GraphQL Execution
// ============================================================================

type GraphQLOptions<Variables> = {
	headers?: HeadersInit;
	cache?: RequestCache;
	revalidate?: number;
} & (Variables extends Record<string, never> ? { variables?: never } : { variables: Variables });

/**
 * Internal base GraphQL executor. Returns a Result type.
 * MOCKED: Returns static data from src/lib/mocks.ts
 */
async function executeGraphQL<Result, Variables>(
	operation: TypedDocumentString<Result, Variables>,
	options: GraphQLOptions<Variables> & { withAuth: boolean },
): Promise<GraphQLResult<Result>> {
	const { variables } = options;
	const operationName = operation.toString().match(/(?:query|mutation)\s+(\w+)/)?.[1] || "UnknownOperation";

	if (process.env.DEBUG_MOCKS === "true") {
		console.log(`[GraphQL Mock] Executing ${operationName}`, variables);
	}

	let data: any = null;

	switch (operationName) {
		case "ChannelsList":
			data = { channels: [{ slug: mocks.MOCK_CHANNEL, isActive: true, name: "Default Channel" }] };
			break;
		case "MenuGetBySlug":
			data = { menu: mocks.MOCK_MENU };
			break;
		case "ProductListByCollection":
			const collectionSlug = (variables as any)?.slug || "featured-products";
			data = {
				collection:
					(mocks.MOCK_COLLECTIONS as any)[collectionSlug] || mocks.MOCK_COLLECTIONS["featured-products"],
			};
			break;
		case "ProductDetails":
			const productSlug = (variables as any)?.slug;
			data = { product: mocks.MOCK_PRODUCTS.find((p) => p.slug === productSlug) || mocks.MOCK_PRODUCTS[0] };
			break;
		case "ProductListByCategory":
			const categorySlug = (variables as any)?.slug;
			data = {
				category: (mocks.MOCK_CATEGORIES as any)[categorySlug] || Object.values(mocks.MOCK_CATEGORIES)[0],
			};
			break;
		case "ProductList":
		case "ProductListPaginated":
			data = { products: productConnection() };
			break;
		case "SearchProducts":
			data = { products: productConnection() };
			break;
		case "CategoriesBySlug":
			const slugs = ((variables as any)?.slugs ?? []) as string[];
			data = {
				categories: {
					edges: Object.values(mocks.MOCK_CATEGORIES)
						.filter((category) => slugs.includes(category.slug))
						.map((node) => ({ node })),
				},
			};
			break;
		case "PageGetBySlug":
			const pageSlug = (variables as any)?.slug;
			data = { page: (mocks.MOCK_PAGES as any)[pageSlug] || null };
			break;
		case "CurrentUser":
		case "CurrentUserProfile":
		case "CurrentUserOrdersPaginated":
		case "CurrentUserOrderList":
		case "OrderByNumber":
			data = { me: null };
			break;
		case "CheckoutCreate":
			data = {
				checkoutCreate: {
					checkout: {
						id: "mock-checkout-id",
						lines: [],
						totalPrice: { gross: { amount: 0, currency: "USD" } },
					},
					errors: [],
				},
			};
			break;
		case "CheckoutFind":
			data = {
				checkout: {
					id: "mock-checkout-id",
					lines: [],
					totalPrice: { gross: { amount: 0, currency: "USD" } },
				},
			};
			break;
		default:
			console.warn(`[GraphQL Mock] No mock for ${operationName}, returning empty data`);
			data = {};
	}

	return success(data as Result);
}

/**
 * Execute a GraphQL query for public data (no user authentication).
 */
export async function executePublicGraphQL<Result, Variables>(
	operation: TypedDocumentString<Result, Variables>,
	options: GraphQLOptions<Variables>,
): Promise<GraphQLResult<Result>> {
	return executeGraphQL(operation, { ...options, withAuth: false });
}

/**
 * Execute a GraphQL query/mutation with user authentication.
 */
export async function executeAuthenticatedGraphQL<Result, Variables>(
	operation: TypedDocumentString<Result, Variables>,
	options: GraphQLOptions<Variables>,
): Promise<GraphQLResult<Result>> {
	return executeGraphQL(operation, { ...options, withAuth: true });
}

// ============================================================================
// Raw GraphQL Execution (for API routes without codegen)
// ============================================================================

interface RawGraphQLOptions {
	query: string;
	variables?: Record<string, unknown>;
	headers?: HeadersInit;
}

/**
 * Execute a raw GraphQL mutation without codegen types.
 * MOCKED: Returns static data.
 */
export async function executeRawGraphQL<T = unknown>(options: RawGraphQLOptions): Promise<GraphQLResult<T>> {
	const { query, variables } = options;
	const operationName = query.match(/(?:query|mutation)\s+(\w+)/)?.[1] || "RawOperation";

	if (process.env.DEBUG_MOCKS === "true") {
		console.log(`[GraphQL Mock] Executing Raw ${operationName}`, variables);
	}

	return success({} as T);
}

/**
 * Helper to create a validation error result from Saleor mutation errors.
 * Use after checking the mutation response for domain errors.
 *
 * @example
 * const { accountRegister } = result.data;
 * if (accountRegister.errors?.length) {
 *   return asValidationError(accountRegister.errors);
 * }
 */
export function asValidationError(
	errors: ReadonlyArray<{ field?: string | null; message: string; code?: string | null }>,
): GraphQLFailure {
	return {
		ok: false,
		error: {
			type: "validation",
			message: errors.map((e) => e.message).join(", "),
			isRetryable: false,
			validationErrors: errors,
		},
	};
}

// ============================================================================
// Legacy exports (for gradual migration)
// ============================================================================

// Re-export error types for backwards compatibility during migration
export type SaleorErrorType = GraphQLErrorType;

/**
 * @deprecated Use Result pattern instead. This class is kept for gradual migration.
 */
export class SaleorError extends Error {
	public readonly type: SaleorErrorType;
	public readonly statusCode?: number;
	public readonly isRetryable: boolean;

	constructor(
		message: string,
		options: {
			type: SaleorErrorType;
			statusCode?: number;
			isRetryable?: boolean;
			cause?: unknown;
		},
	) {
		super(message, { cause: options.cause });
		this.name = "SaleorError";
		this.type = options.type;
		this.statusCode = options.statusCode;
		this.isRetryable = options.isRetryable ?? (options.type === "network" || options.type === "http");
		Object.setPrototypeOf(this, new.target.prototype);
	}

	get userMessage(): string {
		return getUserMessage({
			type: this.type,
			message: this.message,
			statusCode: this.statusCode,
			isRetryable: this.isRetryable,
		});
	}
}
