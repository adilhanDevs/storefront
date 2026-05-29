import { UserRound } from "lucide-react";
import { StaticAccountNotice } from "./static-account-notice";

export default function AccountOverviewPage() {
	return (
		<StaticAccountNotice
			icon={<UserRound className="h-8 w-8 text-muted-foreground" />}
			title="Account is disabled in static mode"
			description="Customer accounts need cookies, authenticated GraphQL calls, and server actions. Those runtime features are intentionally removed for this static Vercel export."
		/>
	);
}
