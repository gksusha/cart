import { useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

function Home() {
  // 1. State to track the search text
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Filter products based on what the user types
  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Header & Search Bar aligned together */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <h1 className="text-2xl font-normal tracking-widest text-gray-900 uppercase">
            Latest Products
          </h1>

          {/* Search Input Box */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Grid Layout or "No Results" Message */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-gray-50 border border-gray-100 rounded-sm">
            <p>No products found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Home;