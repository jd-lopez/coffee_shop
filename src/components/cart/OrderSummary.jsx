import { useEffect, useState } from "react";
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
import OrderFormModal from "./OrderFormModal";
import ItemCard from "./ItemCard";

export default function OrderSummary() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const items = useStore(cart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = parseFloat((totalPrice * 0.2).toFixed(2));

  const shipping = parseFloat((totalPrice * 0.1).toFixed(2));

  const netTotal = (totalPrice + shipping + tax).toFixed(2);

  async function handleClearCart() {
    for (const item of items) {
      removeFromCart(item.id);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-primary font-bold text-2xl">
          Tu carrito está vacío
        </h1>
        <img src="/images/menu/delivery.gif" alt="" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex mb-6 justify-between">
        <h1 className="text-lg text-neutral">
          {totalItems} artículo(s) en tu carrito
        </h1>
        <button
          onClick={() => {
            handleClearCart();
          }}
        >
          Vaciar carrito
        </button>
      </div>
      <div className="flex flex-col landscape:flex-row md:flex-row justify-between gap-10">
        <LayoutGroup>
          <div className="flex flex-col gap-4 flex-2">
            <ItemCard items={items} />
          </div>
        </LayoutGroup>
        <div className="flex-1 bg-lightbg shadow rounded-2xl p-6 h-fit flex flex-col gap-4">
          <h1>Order Summary</h1>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>

            <div className="flex justify-between">
              <p>Iva</p>
              <p>${tax}</p>
            </div>

            <div className="flex justify-between">
              <p>Shipping</p>
              <p>${shipping}</p>
            </div>
          </div>

          <hr className="text-gray-300" />

          <div className="flex justify-between">
            <p>Total</p>
            <p>${netTotal}</p>
          </div>

          <button
            className="rounded-3xl p-2 bg-primary text-white font-bold"
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            Checkout
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <OrderFormModal openForm={isFormOpen} setIsFormOpen={setIsFormOpen} />
        )}
      </AnimatePresence>
    </div>
  );
}
