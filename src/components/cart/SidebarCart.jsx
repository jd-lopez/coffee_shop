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
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

export default function SidebarCart() {
  const items = useStore(cart);
  console.log(items);

  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  let sidebar = true;

  if (items.length === 0) return;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{}}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="hidden  md:flex flex-col items-center gap-2 md:sticky top-24 h-screen w-100  bg-white shadow-md "
      >
        <div className="sticky top-0 bg-white w-full p-4 shadow ">
          <p className="mb-4">Subtotal: ${cartTotal} </p>

          <a
            href="/cart/"
            className="rounded-md text-black ring ring-primary py-1 px-1"
          >
            Ir al Carrito
          </a>
        </div>

        <div className="overflow-auto h-screen">
          <ItemCard items={items} isSidebar={sidebar} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
