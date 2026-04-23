import { useStore } from "@nanostores/react";
import { cart } from "../../store/cart";

export default function CartIcon() {
  const items = useStore(cart);
  console.log(items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const netTotal = parseFloat(
    totalAmount + (totalAmount * 0.2 + totalAmount * 0.1),
  ).toFixed(2);

  return (
    <div className="relative">
      <span className="text-2xl">🛒</span>
      <span className="absolute -top-2 left-0 text-red-400 font-bold">
        {totalItems === 0 ? null : totalItems > 9 ? "9+" : totalItems}
      </span>

      <span className="absolute -bottom-2 left-1 text-red-500 font-bold text-[0.6rem]">
        {totalItems === 0 ? null : "$" + netTotal}
      </span>
    </div>
  );
}
