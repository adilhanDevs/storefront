import { Settings } from "lucide-react";
import { StaticAccountNotice } from "../static-account-notice";

export default function AccountSettingsPage() {
	return (
		<StaticAccountNotice
			icon={<Settings className="h-8 w-8 text-muted-foreground" />}
			title="Settings are unavailable"
			description="Profile settings need authenticated mutations, which are intentionally disabled for static deployment."
		/>
	);
}
