import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, totalPrice } =
    useContext(CartContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Cart Items */}
      <div className="md:col-span-2 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">
          Your Cart ({cartItems.length})
        </h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="p-4 border rounded h-fit">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span className="font-semibold">₹{totalPrice}</span>
        </div>

        <button
          disabled={cartItems.length === 0}
          className="w-full mt-4 py-2 bg-black text-white disabled:opacity-50"
        >
          Checkout
        </button>
      </div>

    </div>
  );
}

export default Cart;
