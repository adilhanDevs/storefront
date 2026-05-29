import { type ReactNode } from "react";
import { DefaultChannelSlug } from "@/app/config";

/**
 * Generate static params for channel routes.
 *
 * Uses the static default channel only.
 */
export const generateStaticParams = async () => {
	return [{ channel: DefaultChannelSlug }];
};

export default function ChannelLayout({ children }: { children: ReactNode }) {
	return children;
}
