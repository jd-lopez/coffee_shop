import { atom } from "nanostores";

export const cart = atom([]);

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
