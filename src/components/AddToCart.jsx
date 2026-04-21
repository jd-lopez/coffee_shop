import { addToCart } from "../store/cart";

export default function AddToCartButton({ item }) {
  return (
    <button
      className="flex items-center justify-center gap-3 rounded-2xl   px-2 py-1 bg-primary text-white mt-auto active:scale-90 transition-all duration-150 ease-in"
      onClick={() => addToCart(item)}
    >
      Add to Cart
    </button>
  );
}
