import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        {/* Image Section - Clean White Background */}
        <div className="p-8 flex items-center justify-center h-64 bg-white border-b border-gray-100">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-sm font-normal text-gray-800 mb-3 leading-relaxed">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          {/* Price - Pushed to bottom if content is short */}
          <div className="mt-auto">
            <p className="text-xl font-bold text-gray-900 tracking-wide">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;