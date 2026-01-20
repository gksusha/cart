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
  const [quantity, setQuantity] = useState(1);

  // Find the product that matches the URL id
  const product = PRODUCTS.find((p) => p.id === Number(id));

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Product not found.</p>
        <button onClick={() => navigate("/")} className="ml-4 text-blue-600 underline">
            Go Home
        </button>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart({ ...product, quantity });
    setIsAdding(false);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">GO BACK</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8 flex items-center justify-center">
            {/* mix-blend-multiply helps the white image background blend in */}
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[400px] w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Details */}
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

            <p className="text-gray-600 mb-8">
              Experience premium quality with the {product.name}. Designed for performance and durability.
            </p>

            {/* Quantity & Add Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 w-32">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-[#343a40] text-white h-12 px-8 flex items-center justify-center gap-3 text-sm tracking-widest hover:bg-[#23272b] transition-colors"
              >
                <ShoppingCart size={18} />
                {isAdding ? "ADDING..." : "ADD TO CART"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;