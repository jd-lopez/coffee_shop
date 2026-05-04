import React from "react";
import ItemCard from "./ItemCard";
import { useStore } from "@nanostores/react";

import {
  cart,
  decreaseQuantity,
  increase,
  removeItem,
  clearCart,
  removeFromCart,
} from "../../store/cart";

export default function SidebarCart() {
  const items = useStore(cart);
  console.log(items);

  let sidebar = true;

  if (items.length === 0) return;

  return (
    <div className="hidden md:block md:sticky top-22 h-screen w-140 overflow-auto bg-white shadow-md ">
      <ItemCard
        items={items}
        isSidebar={sidebar}
        className={"flex-col items-center bg-white rounded-none"}
      />
    </div>
  );
}
