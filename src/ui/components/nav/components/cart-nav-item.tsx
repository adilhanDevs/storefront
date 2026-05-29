import { CartButton } from "@/ui/components/cart";

export const CartNavItem = async ({ channel: _channel }: { channel: string }) => {
	return <CartButton itemCount={0} />;
};
