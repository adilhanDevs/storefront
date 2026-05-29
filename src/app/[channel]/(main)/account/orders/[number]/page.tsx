import { Receipt } from "lucide-react";
import { MOCK_CHANNEL } from "@/lib/mocks";
import { StaticAccountNotice } from "../../static-account-notice";

export async function generateStaticParams() {
	return [{ channel: MOCK_CHANNEL, number: "sample" }];
}

export default function OrderDetailPage() {
	return (
		<StaticAccountNotice
			icon={<Receipt className="h-8 w-8 text-muted-foreground" />}
			title="Order details are unavailable"
			description="Individual orders are private customer data and are not part of the static storefront export."
		/>
	);
}
