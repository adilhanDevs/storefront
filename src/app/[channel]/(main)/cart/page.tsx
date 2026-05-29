import { ShoppingBag } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export const metadata = {
	title: "Shopping Cart · Saleor Storefront example",
};

export default function CartPage() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
					<ShoppingBag className="h-8 w-8 text-muted-foreground" />
				</div>
				<h1 className="text-3xl font-semibold tracking-tight">Your bag is empty</h1>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					This static storefront does not keep a server-side cart. Browse the catalog and connect checkout
					later when the Saleor API is enabled again.
				</p>
				<LinkWithChannel
					href="/products"
					className="hover:bg-foreground/90 mt-8 inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors"
				>
					Explore products
				</LinkWithChannel>
			</div>
		</section>
	);
}
