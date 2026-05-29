import { SearchIcon } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mocks";
import { SearchResults } from "@/ui/components/search-results";
import type { SearchProduct } from "@/lib/search";
import { localeConfig } from "@/config/locale";

export const metadata = {
	title: "Search products · Saleor Storefront example",
	description: "Search products in Saleor Storefront example",
};

export default async function SearchPage(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;
	const products: SearchProduct[] = MOCK_PRODUCTS.map((product) => ({
		id: product.id,
		name: product.name,
		slug: product.slug,
		thumbnailUrl: product.thumbnail?.url,
		thumbnailAlt: product.thumbnail?.alt,
		price: product.pricing.priceRange.start.gross.amount,
		currency: product.pricing.priceRange.start.gross.currency ?? localeConfig.fallbackCurrency,
		categoryName: product.category?.name,
	}));

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-8 flex items-center gap-3">
				<div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
					<SearchIcon className="h-5 w-5 text-muted-foreground" />
				</div>
				<div>
					<h1 className="text-2xl font-semibold">Static catalog search</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Live search is disabled; showing all static products.
					</p>
				</div>
			</div>
			<SearchResults products={products} channel={channel} />
		</section>
	);
}
