import { type ReactNode } from "react";

export const metadata = {
	title: "My Account",
};

export default function AccountLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
