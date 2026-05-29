import { CartDrawer } from "./cart-drawer";

interface CartDrawerWrapperProps {
	channel: string;
}

export async function CartDrawerWrapper({ channel }: CartDrawerWrapperProps) {
	return <CartDrawer checkoutId={null} lines={[]} totalPrice={null} channel={channel} />;
}
