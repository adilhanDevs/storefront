import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductListPaginatedDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CategoryHero, transformToProductCard } from "@/ui/components/plp";
import { ProductsPageClient } from "./products-client";

export const metadata = {
	title: "Products · Saleor Storefront example",
	description: "All products in Saleor Storefront example",
};

type PageProps = {
	params: Promise<{ channel: string }>;
};

export default async function Page(props: PageProps) {
	const params = await props.params;

	const breadcrumbs = [
		{ label: "Home", href: `/${params.channel}` },
		{ label: "Products", href: `/${params.channel}/products` },
	];

	return (
		<>
			<CategoryHero
				title="All Products"
				description="Discover our full collection of premium products."
				breadcrumbs={breadcrumbs}
			/>
			<Suspense fallback={<ProductsGridSkeleton />}>
				<ProductsContent params={props.params} />
			</Suspense>
		</>
	);
}

async function ProductsContent({ params: paramsPromise }: { params: Promise<{ channel: string }> }) {
	const params = await paramsPromise;

	const result = await executePublicGraphQL(ProductListPaginatedDocument, {
		variables: {
			first: 100,
			after: null,
			before: null,
			last: null,
			channel: params.channel,
			sortBy: null,
			filter: {},
		},
		revalidate: 300,
	});

	if (!result.ok || !result.data.products) {
		notFound();
	}

	const products = result.data.products;
	const productCards = products.edges.map((e) => transformToProductCard(e.node, params.channel));

	return (
		<ProductsPageClient
			products={productCards}
			pageInfo={products.pageInfo}
			totalCount={products.totalCount ?? productCards.length}
			resolvedCategories={[]}
		/>
	);
}

function ProductsGridSkeleton() {
	return (
		<div className="mx-auto max-w-7xl animate-skeleton-delayed px-4 py-8 opacity-0 sm:px-6 lg:px-8">
			<div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="animate-pulse">
						<div className="mb-4 aspect-[3/4] rounded-xl bg-muted" />
						<div className="space-y-1.5">
							<div className="h-4 w-3/4 rounded bg-muted" />
							<div className="h-4 w-1/2 rounded bg-muted" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
