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
        className="absolute inset-0 bg-gray-400/50 "
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
        className="fixed z-60 md:max-h-110 top-1/5 md:left-1/3 p-6 min-w-60 md:w-120 rounded-2xl overflow-hidden"
      >
        <form
          action=""
          onSubmit={handleSubmition}
          className="flex flex-col gap-4  "
        >
          <div className="overflow-y-scroll md:max-h-70">
            <h1 className="text-2xl text-primary font-bold">
              Detalles del pedido
            </h1>
            <p className="text-sm">
              Agrega detalles del pedido como nombre, direccion, forma de pago.
              Esto sera el contenido del mensaje de whatsapp.
            </p>
            <div className="flex flex-col gap-2 mt-1 font-semibold ">
              <div className="flex flex-col gap-1">
                <label htmlFor="">Nombre</label>

                <div className="flex border border-gray-500 py-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  <input
                    required
                    type="text"
                    placeholder="Escribe tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 border-l border-gray-500 px-2 outline-0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">Telefono</label>

                <div className="flex border border-gray-500 py-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mx-2 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <input
                    value={number}
                    type="number"
                    placeholder="agrega numero de contacto"
                    onChange={(e) => setNumber(e.target.value)}
                    className="flex-1 border-l border-gray-500 px-2 outline-0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="">Direccion</label>

                <div className="flex border border-gray-500 py-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>

                  <input
                    value={address}
                    required
                    type="text"
                    placeholder="Agrega tu direccion de entrega"
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-l border-gray-500 flex-1 outline-0 px-2"
                  />
                </div>
              </div>
              <fieldset className="">
                <legend className="text-lg">
                  Selecciona un metodo de pago
                </legend>
                <div className="flex justify-between gap-4">
                  <label
                    htmlFor="tarjecta"
                    className="has-checked:ring ring-blue-600 border border-gray-300 p-2 relative rounded-lg shadow flex-1"
                  >
                    <input
                      id="tarjecta"
                      required
                      value="Tarjeta"
                      type="radio"
                      name="payment"
                      checked={payment === "Tarjeta"}
                      onChange={(e) => setPayment(e.target.value)}
                      className="absolute right-1 top-1"
                    />

                    <div className="rounded-full bg-primary/30 size-fit p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                    </div>
                    <span>Tarjeta</span>
                  </label>

                  <label
                    htmlFor="transferencia"
                    className="has-checked:ring ring-blue-600 border border-gray-300 p-2 relative rounded-lg shadow flex-1"
                  >
                    <input
                      id="transferencia"
                      required
                      value="Transferencia"
                      type="radio"
                      name="payment"
                      checked={payment === "Transferencia"}
                      onChange={(e) => setPayment(e.target.value)}
                      className="absolute right-1 top-1"
                    />
                    <div className="rounded-full bg-primary/30 size-fit p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                        />
                      </svg>
                    </div>
                    <span>Transferencia</span>
                  </label>

                  <label
                    htmlFor="efectivo"
                    className="has-checked:ring ring-blue-600 border border-gray-300 p-2 relative rounded-lg shadow flex-1"
                  >
                    <input
                      id="efectivo"
                      required
                      value="Efectivo"
                      type="radio"
                      name="payment"
                      checked={payment === "Efectivo"}
                      onChange={(e) => setPayment(e.target.value)}
                      className="absolute right-1 top-1"
                    />
                    <div className="rounded-full bg-primary/30 size-fit p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                    </div>
                    <span>Efectivo</span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="flex justify-between">
            <button className="bg-red-600 rounded-lg px-4 py-0.5 text-white font-bold active:scale-90 ease-in transition-all">
              Cancel
            </button>
            <button className="rounded-lg bg-primary text-white px-4 py-1 font-bold active:scale-90 ease-in transition-all flex items-center gap-2">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white md:hover:scale-110 transition-all ease-in size-5"
              >
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
              </svg>
              <span>Ordena en Whatsapp</span>
            </button>
          </div>
        </form>
      </motion.dialog>
    </div>
  );
}
