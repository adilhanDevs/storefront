import Link from "next/link";
import { DefaultChannelSlug } from "@/app/config";
import { brandConfig } from "@/config/brand";

/**
 * Root page redirects to the default channel.
 *
 * Requires NEXT_PUBLIC_DEFAULT_CHANNEL to be set.
 * In development, shows setup instructions if not configured.
 */
export default function RootPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-8">
			<div className="max-w-md text-center">
				<h1 className="mb-4 text-3xl font-semibold text-foreground">{brandConfig.siteName}</h1>
				<p className="mb-8 text-muted-foreground">{brandConfig.description}</p>
				<Link
					href={`/${DefaultChannelSlug}`}
					className="hover:bg-foreground/90 inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors"
				>
					Enter store
				</Link>
			</div>
		</div>
	);
}
