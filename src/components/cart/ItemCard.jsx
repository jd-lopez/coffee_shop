import React from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import {
  cart,
  decreaseQuantity,
  increase,
  removeItem,
  clearCart,
  removeFromCart,
} from "../../store/cart";
export default function ItemCard({ items, className, isSidebar }) {
  return (
    <AnimatePresence mode="popLayout">
      {items.map((item) => {
        return (
          <motion.div
            key={item.id}
            className={`rounded-2xl bg-lightbg flex gap-2 shadow ${isSidebar ? "flex-col items-center bg-white w-full rounded-none" : ""}`}
            layout
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`size-20  ${isSidebar ? "md:size-16" : "md:size-36"}`}
            >
              <img src={item.image} alt="" className={`h-full rounded-2xl`} />
            </div>
            <div
              className={`flex flex-col flex-1 p-2 justify-between ${isSidebar ? "md:p-1" : " md:p-6"}`}
            >
              <div className="flex justify-between ">
                <h1
                  className={`text-lg font-bold ${isSidebar ? "text-sm" : ""}`}
                >
                  {item.title}
                </h1>
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
                <p
                  className={`text-tertiary font-bold ${isSidebar ? "hidden" : "static"}`}
                >
                  ${item.price}
                </p>
                <div className="flex gap-4 rounded-2xl bg-green-500 px-2 py-1 text-white items-center">
                  <button
                    className="active:scale-90 text-xl text-black size-6 bg-lightbg rounded-full grid place-content-center"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className=" active:scale-90 size-6 bg-primary text-lg rounded-full grid content-center"
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
  );
}
