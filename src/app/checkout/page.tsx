import Link from "next/link";
import { Lock } from "lucide-react";
import { DefaultChannelSlug } from "@/app/config";

export const metadata = {
	title: "Checkout · Saleor Storefront example",
	description: "Checkout is disabled in the static storefront build.",
};

export default function CheckoutPage() {
	return (
		<section className="flex min-h-screen items-center justify-center px-4 py-16">
			<div className="max-w-md text-center">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
					<Lock className="h-8 w-8 text-muted-foreground" />
				</div>
				<h1 className="text-3xl font-semibold tracking-tight">Checkout is disabled</h1>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					This site is exported as static files for Vercel, so payments, sessions, and checkout mutations are
					not available.
				</p>
				<Link
					href={`/${DefaultChannelSlug}/products`}
					className="hover:bg-foreground/90 mt-8 inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors"
				>
					Back to products
				</Link>
			</div>
		</section>
	);
}
