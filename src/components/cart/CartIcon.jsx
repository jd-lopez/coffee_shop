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
      <span className="text-4xl">🛒</span>
      {totalItems > 0 && (
        <div className="absolute -top-2 left-0 text-white font-bold rounded-full bg-red-600 grid place-content-center size-5 text-xs ">
          <span>
            {totalItems === 0 ? null : totalItems > 9 ? "9+" : totalItems}
          </span>
        </div>
      )}

      <span className="absolute -top-2 left-8 text-red-500 font-bold text-[0.7rem]">
        {totalItems === 0 ? null : "$" + netTotal}
      </span>
    </div>
  );
}
