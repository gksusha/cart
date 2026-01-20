import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, totalPrice, loading } =
    useContext(CartContext);

  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">
          Your Cart ({cartItems.length})
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500 hover:underline"
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
          className="w-full mt-4 bg-black text-white py-2 rounded disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
