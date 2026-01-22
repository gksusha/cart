import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Check, ShoppingCart, Minus, Plus } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1); // This holds the number you select (e.g., 4)

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-gray-500">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // --- THE FIX IS HERE ---
    // Previously, this might have said 'quantity: 1'
    // Now we pass the 'quantity' state variable (which is 4, 5, etc.)
    await addToCart({ ...product, quantity: quantity });
    
    setIsAdding(false);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">GO BACK</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[400px] w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-light text-gray-900 mb-4">{product.name}</h1>

            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} reviews={product.reviews} />
                <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                  <Check size={16} /> In Stock
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience premium quality with the {product.name}. Designed for 
              performance and durability, this product offers exceptional value for everyday use.
            </p>

            {/* Quantity Selector */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 w-32">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add To Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-[#343a40] text-white h-12 px-8 flex items-center justify-center gap-3 text-sm tracking-widest hover:bg-[#23272b] transition-colors cursor-pointer"
              >
                <ShoppingCart size={18} />
                {isAdding ? "ADDING..." : "ADD TO CART"}
              </button>
            </div>
            
            <div className="mt-6 text-xs text-gray-400">
              SKU: DEV-{product.id}00-X
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;