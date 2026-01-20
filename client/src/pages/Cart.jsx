import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, totalPrice, loading } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-2xl font-light tracking-wide text-gray-800 mb-8">
          SHOPPING CART
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Link
              to="/"
              className="inline-block bg-[#343a40] text-white py-3 px-8 text-sm tracking-wide hover:bg-[#23272b] transition-colors"
            >
              GO BACK
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-sm"
              >
                <div className="w-20 h-20 bg-gray-50 p-2 flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-medium text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-600 p-2 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <span className="text-xl font-light">
                Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
              <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full bg-[#343a40] text-white py-3 text-sm tracking-wide hover:bg-[#23272b] transition-colors mt-4 cursor-pointer">
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;