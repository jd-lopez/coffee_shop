import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { cart, decreaseQuantity, increase, removeItem } from "../../store/cart";

export default function OrderSummary() {
  const items = useStore(cart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = parseFloat((totalPrice * 0.2).toFixed(2));

  const shipping = parseFloat((totalPrice * 0.1).toFixed(2));

  const netTotal = (totalPrice + shipping + tax).toFixed(2);

  if (items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h1 className="text-lg text-neutral mb-8">
        {items.length} are in your cart
      </h1>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-2 flex-2">
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white flex gap-2 shadow"
              >
                <div className="size-20 md:size-36">
                  <img src={item.image} alt="" className="h-full rounded-2xl" />
                </div>
                <div className="flex flex-col flex-1 p-2 md:p-6 justify-between">
                  <div className="flex justify-between ">
                    <h1 className="text-lg font-bold">{item.title}</h1>
                    <button
                      className="text-red-600"
                      onClick={() => removeItem(item.id)}
                    >
                      Delete
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
              </div>
            );
          })}
        </div>
        <div className="flex-1 bg-white shadow rounded-2xl p-6 h-fit flex flex-col gap-4">
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
              console.log(typeof shipping);
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
