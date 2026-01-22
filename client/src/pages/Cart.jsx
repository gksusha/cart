import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, RefreshCw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, loading } = useCart();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light tracking-wide text-gray-800 uppercase">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <RefreshCw size={12} /> CLEAR CART
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-sm">
            <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
            <Link
              to="/"
              className="inline-block bg-[#343a40] text-white py-3 px-8 text-sm tracking-wide hover:bg-[#23272b] transition-colors"
            >
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => {
              const itemId = item.productId || item.id;
              const productData = PRODUCTS.find((p) => p.id === Number(itemId)) || item;
              
              return (
                <div
                  key={itemId}
                  className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-gray-100 rounded-sm hover:shadow-sm transition-shadow bg-white"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-white flex-shrink-0 flex items-center justify-center border border-gray-100 p-2">
                    <img
                      src={productData.image} 
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-medium text-gray-800 text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      ${(item.price || 0).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300">
                    <button 
                      type="button"
                      onClick={() => updateQuantity(itemId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center font-medium text-sm border-l border-r border-gray-300">
                      {item.quantity}
                    </div>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(itemId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Total & Delete */}
                  <div className="flex items-center gap-6">
                    <p className="font-bold text-lg min-w-[80px] text-right">
                      ${((item.price || 0) * item.quantity).toFixed(2)}
                    </p>
                    
                    <button
                      type="button"
                      onClick={() => removeFromCart(itemId)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Checkout */}
            <div className="flex flex-col items-end pt-8 border-t border-gray-100 mt-8">
              <div className="flex justify-between items-center w-full max-w-sm mb-6">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-3xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full max-w-sm bg-[#343a40] text-white py-4 text-sm tracking-widest hover:bg-[#23272b] transition-colors cursor-pointer">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;