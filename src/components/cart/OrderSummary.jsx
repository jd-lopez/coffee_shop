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
        <h1 className="text-primary font-bold text-2xl">Your Cart is Empty</h1>
        <img src="/images/menu/delivery.gif" alt="" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex mb-6 justify-between">
        <h1 className="text-lg text-neutral">
          {totalItems} items are in your cart
        </h1>
        <button
          onClick={() => {
            handleClearCart();
          }}
        >
          Clear cart
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <LayoutGroup>
          <div className="flex flex-col gap-4 flex-2">
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    className="rounded-2xl bg-lightbg flex gap-2 shadow"
                    layout
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="size-20 md:size-36">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-2 md:p-6 justify-between">
                      <div className="flex justify-between ">
                        <h1 className="text-lg font-bold">{item.title}</h1>
                        <button
                          className="text-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke=""
                            className="size-6 stroke-red-600 active:animate-spin"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-between">
                        <p>${item.price}</p>
                        <div className="flex gap-4 rounded-2xl bg-green-500 px-2 py-1 text-white items-center">
                          <button
                            className="text-xl text-black size-6 bg-lightbg rounded-full grid place-content-center"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className=" size-6 bg-primary text-lg rounded-full grid content-center"
                            onClick={() => increase(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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
