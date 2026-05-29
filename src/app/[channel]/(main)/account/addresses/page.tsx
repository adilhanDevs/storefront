import { MapPin } from "lucide-react";
import { StaticAccountNotice } from "../static-account-notice";

export default function AddressesPage() {
	return (
		<StaticAccountNotice
			icon={<MapPin className="h-8 w-8 text-muted-foreground" />}
			title="Addresses are unavailable"
			description="Saved addresses require an authenticated customer session, so they are excluded from this static build."
		/>
	);
}
