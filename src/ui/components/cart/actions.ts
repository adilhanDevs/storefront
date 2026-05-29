export async function getCart(...args: any[]) {
	console.log("mock", args);
	return null;
}
export async function addToCart(...args: any[]) {
	console.log("mock", args);
	return { success: true };
}
export async function deleteCartLine(...args: any[]) {
	console.log("mock", args);
	return { success: true };
}
export async function updateCartLineQuantity(...args: any[]) {
	console.log("mock", args);
	return { success: true };
}
