import "server-only";

export const getServerAuthClient = async () => ({
	fetchWithAuth: fetch,
});
