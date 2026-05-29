"use client";

import { type ReactNode } from "react";

export const saleorAuthClient = {
	fetchWithAuth: fetch,
};

export function AuthProvider({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
