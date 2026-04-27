import { motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { cart, clearCart } from "../../store/cart";

export default function OrderFormModal({ isFormOpen, setIsFormOpen }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  function handleSubmition(e) {
    e.preventDefault();
    messageBuilder();
    setName("");
    setNumber("");
    setAddress("");
    setPayment("");
    clearCart();

    console.log(name, address);
  }

  function messageBuilder() {
    const items = cart.get();

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const itemsText = items
      .map(
        (item) =>
          `- ${item.title} x${item.quantity} — $${(
            item.price * item.quantity
          ).toFixed(2)}`,
      )
      .join("\n");

    const message = `Hola, me gustaria ordenar:

Pedido:
${itemsText}

Nombre: ${name}
Telefono: ${number}
Direccion: ${address}
Forma de pago: ${payment}

Total: $${total.toFixed(2)}
`;
    const whatsappUrl = `https://wa.me/+50587952614?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="">
      <div
        className="absolute inset-0 bg-gray-400/50"
        onClick={() => setIsFormOpen(false)}
      ></div>
      <motion.dialog
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.2, ease: "easeIn" },
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
        }}
        open
        className="absolute top-1/8 md:left-1/3 p-4 min-w-60 md:w-120 rounded-2xl overflow-auto"
      >
        <form action="" onSubmit={handleSubmition} className="flex flex-col">
          <h1 className="text-2xl text-primary font-bold">
            Detalles del pedido
          </h1>
          <p className="text-sm">
            Agrega detalles del pedido como nombre, direccion, forma de pago.
            Esto sera el contenido del mensaje de whatsapp.
          </p>
          <div className="flex flex-col gap-2 mt-4 text-primary font-semibold">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Nombre</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-600 rounded-lg px-2 py-0.5 outline-0 focus:ring focus:ring-blue-600"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Telefono</label>
              <input
                value={number}
                type="number"
                onChange={(e) => setNumber(e.target.value)}
                className="border border-gray-600 rounded-lg px-2 py-0.5 outline-0 focus:ring focus:ring-blue-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Direccion</label>
              <input
                value={address}
                required
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-600 rounded-lg px-2 py-0.5 outline-0 focus:ring focus:ring-blue-600"
              />
            </div>
            <fieldset>
              <legend>Selecciona un metodo de pago</legend>
              <div>
                <input
                  required
                  value="Tarjeta"
                  type="radio"
                  name="payment"
                  checked={payment === "Tarjeta"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="">Tarjeta</label>
              </div>

              <div>
                <input
                  required
                  value="Transferencia"
                  type="radio"
                  name="payment"
                  checked={payment === "Transferencia"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="">Transferencia</label>
              </div>

              <div>
                <input
                  required
                  value="Efectivo"
                  type="radio"
                  name="payment"
                  checked={payment === "Efectivo"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="">Efectivo</label>
              </div>
            </fieldset>
          </div>

          <button className="rounded-2xl bg-primary text-white px-2 py-1 self-center">
            Order On Whatsapp
          </button>
        </form>
      </motion.dialog>
    </div>
  );
}
