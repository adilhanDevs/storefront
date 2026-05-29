import { UserPlus } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export const metadata = {
	title: "Create Account",
	description: "Account creation is disabled in the static storefront build.",
};

export default function SignUpPage() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
					<UserPlus className="h-8 w-8 text-muted-foreground" />
				</div>
				<h1 className="text-3xl font-semibold tracking-tight">Account creation is disabled</h1>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					Registration requires API routes and authenticated mutations, so it is not included in this static
					export.
				</p>
				<LinkWithChannel
					href="/products"
					className="hover:bg-foreground/90 mt-8 inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors"
				>
					Browse products
				</LinkWithChannel>
			</div>
		</section>
	);
}
