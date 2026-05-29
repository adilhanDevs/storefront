export const MOCK_CHANNEL = "default-channel";

export const MOCK_MENU = {
	items: [
		{
			id: "menu-item-1",
			name: "Categories",
			level: 0,
			children: [
				{
					id: "menu-item-3",
					name: "T-shirts",
					level: 1,
					category: { id: "cat-1", slug: "t-shirts", name: "T-shirts" },
				},
				{
					id: "menu-item-4",
					name: "Accessories",
					level: 1,
					category: { id: "cat-2", slug: "accessories", name: "Accessories" },
				},
			],
		},
		{
			id: "menu-item-5",
			name: "Company",
			level: 0,
			children: [
				{
					id: "menu-item-6",
					name: "About Us",
					level: 1,
					page: { id: "page-1", slug: "about-us", title: "About Us" },
				},
			],
		},
	],
};

export const MOCK_PRODUCTS = [
	{
		id: "prod-1",
		name: "Saleor T-shirt",
		slug: "saleor-t-shirt",
		description:
			'{"blocks": [{"type": "paragraph", "data": {"text": "A high-quality cotton T-shirt with the Saleor logo."}}]}',
		pricing: {
			priceRange: {
				start: { gross: { amount: 20, currency: "USD" } },
				stop: { gross: { amount: 20, currency: "USD" } },
			},
			priceRangeUndiscounted: {
				start: { gross: { amount: 25, currency: "USD" } },
				stop: { gross: { amount: 25, currency: "USD" } },
			},
		},
		category: { id: "cat-1", name: "T-shirts", slug: "t-shirts" },
		thumbnail: { url: "https://picsum.photos/id/1/1024/1024", alt: "Saleor T-shirt" },
		media: [{ url: "https://picsum.photos/id/1/1024/1024", alt: "Saleor T-shirt", type: "IMAGE" }],
		variants: [
			{
				id: "var-1",
				name: "Small",
				sku: "TSHIRT-S",
				quantityAvailable: 12,
				pricing: { price: { gross: { amount: 20, currency: "USD" } } },
				attributes: [{ attribute: { name: "Size", slug: "size" }, values: [{ name: "S", value: "s" }] }],
			},
		],
	},
	{
		id: "prod-2",
		name: "Saleor Hoodie",
		slug: "saleor-hoodie",
		description:
			'{"blocks": [{"type": "paragraph", "data": {"text": "A warm and cozy hoodie for developers."}}]}',
		pricing: {
			priceRange: {
				start: { gross: { amount: 45, currency: "USD" } },
				stop: { gross: { amount: 45, currency: "USD" } },
			},
		},
		category: { id: "cat-3", name: "Hoodies", slug: "hoodies" },
		thumbnail: { url: "https://picsum.photos/id/2/1024/1024", alt: "Saleor Hoodie" },
		media: [{ url: "https://picsum.photos/id/2/1024/1024", alt: "Saleor Hoodie", type: "IMAGE" }],
		variants: [
			{
				id: "var-2",
				name: "Large",
				sku: "HOODIE-L",
				quantityAvailable: 7,
				pricing: { price: { gross: { amount: 45, currency: "USD" } } },
				attributes: [{ attribute: { name: "Size", slug: "size" }, values: [{ name: "L", value: "l" }] }],
			},
		],
	},
	{
		id: "prod-3",
		name: "Saleor Cap",
		slug: "saleor-cap",
		description:
			'{"blocks": [{"type": "paragraph", "data": {"text": "Perfect for sunny days at the office."}}]}',
		pricing: {
			priceRange: {
				start: { gross: { amount: 15, currency: "USD" } },
				stop: { gross: { amount: 15, currency: "USD" } },
			},
		},
		category: { id: "cat-2", name: "Accessories", slug: "accessories" },
		thumbnail: { url: "https://picsum.photos/id/3/1024/1024", alt: "Saleor Cap" },
		media: [{ url: "https://picsum.photos/id/3/1024/1024", alt: "Saleor Cap", type: "IMAGE" }],
		variants: [
			{
				id: "var-3",
				name: "One Size",
				sku: "CAP-OS",
				quantityAvailable: 20,
				pricing: { price: { gross: { amount: 15, currency: "USD" } } },
				attributes: [],
			},
		],
	},
];

export const MOCK_COLLECTIONS = {
	"featured-products": {
		id: "coll-1",
		name: "Featured Products",
		slug: "featured-products",
		description:
			'{"blocks": [{"type": "paragraph", "data": {"text": "A curated selection of storefront favorites."}}]}',
		products: {
			edges: MOCK_PRODUCTS.map((p) => ({ node: p })),
			pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
			totalCount: MOCK_PRODUCTS.length,
		},
	},
};

export const MOCK_CATEGORIES = {
	"t-shirts": {
		id: "cat-1",
		name: "T-shirts",
		slug: "t-shirts",
		description:
			'{"blocks": [{"type": "paragraph", "data": {"text": "Soft cotton staples for everyday wear."}}]}',
		products: {
			edges: MOCK_PRODUCTS.filter((p) => p.category.slug === "t-shirts").map((p) => ({ node: p })),
			pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
			totalCount: MOCK_PRODUCTS.filter((p) => p.category.slug === "t-shirts").length,
		},
	},
	accessories: {
		id: "cat-2",
		name: "Accessories",
		slug: "accessories",
		description:
			'{"blocks": [{"type": "paragraph", "data": {"text": "Finishing touches for a clean daily kit."}}]}',
		products: {
			edges: MOCK_PRODUCTS.filter((p) => p.category.slug === "accessories").map((p) => ({ node: p })),
			pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
			totalCount: MOCK_PRODUCTS.filter((p) => p.category.slug === "accessories").length,
		},
	},
	hoodies: {
		id: "cat-3",
		name: "Hoodies",
		slug: "hoodies",
		description: '{"blocks": [{"type": "paragraph", "data": {"text": "Warm layers for cool days."}}]}',
		products: {
			edges: MOCK_PRODUCTS.filter((p) => p.category.slug === "hoodies").map((p) => ({ node: p })),
			pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
			totalCount: MOCK_PRODUCTS.filter((p) => p.category.slug === "hoodies").length,
		},
	},
};

export const MOCK_PAGES = {
	"about-us": {
		id: "page-1",
		title: "About Us",
		slug: "about-us",
		content:
			'{"blocks": [{"type": "paragraph", "data": {"text": "We are a static storefront powered by Saleor mocks."}}]}',
		seoTitle: "About Us",
		seoDescription: "Learn more about our static storefront.",
	},
};
