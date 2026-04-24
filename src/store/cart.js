import { atom } from "nanostores";

const storedCart =
  typeof localStorage !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];

export const cart = atom(storedCart);

cart.listen((items) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
});

export function addToCart(item) {
  const currentCart = cart.get();

  const existingItem = currentCart.find((p) => p.id === item.id);

  if (existingItem) {
    cart.set(
      currentCart.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    );
  } else {
    cart.set([...currentCart, { ...item, quantity: 1 }]);
  }
}

export function decreaseQuantity(id) {
  const currentCart = cart.get();

  cart.set(
    currentCart
      .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
      .filter((p) => p.quantity > 0),
  );
}

export function increase(id) {
  const currentCart = cart.get();

  cart.set(
    currentCart
      .map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
      .filter((p) => p.quantity > 0),
  );
}

export function removeItem(id) {
  const currentCart = cart.get();

  cart.set(currentCart.filter((p) => p.id !== id));
}

export function clearCart() {
  cart.set([]);
}
