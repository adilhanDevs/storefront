import { type ReactNode } from "react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

interface StaticAccountNoticeProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export function StaticAccountNotice({ icon, title, description }: StaticAccountNoticeProps) {
	return (
		<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
					{icon}
				</div>
				<h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
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
