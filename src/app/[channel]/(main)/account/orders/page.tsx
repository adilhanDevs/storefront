import { Receipt } from "lucide-react";
import { StaticAccountNotice } from "../static-account-notice";

export default function AccountOrdersPage() {
	return (
		<StaticAccountNotice
			icon={<Receipt className="h-8 w-8 text-muted-foreground" />}
			title="Orders are unavailable"
			description="Order history is user-specific data and is not included in the static storefront export."
		/>
	);
}
