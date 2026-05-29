export async function getIdFromCookies(_channel: string) {
	return "";
}

export async function saveIdToCookie(_channel: string, _checkoutId: string) {
	return;
}

export async function clearCheckoutCookie(_channel: string) {
	return;
}

export async function find(_checkoutId: string) {
	return null;
}

export async function findOrCreate(_input: { checkoutId?: string; channel: string }) {
	return null;
}

export const create = async (_input: { channel: string }) => ({
	ok: true as const,
	data: { checkoutCreate: { checkout: null, errors: [] } },
});
