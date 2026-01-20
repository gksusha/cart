import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header matching the screenshot */}
        <h1 className="text-2xl font-normal tracking-widest text-gray-900 mb-10 uppercase">
          Latest Products
        </h1>

        {/* Grid Layout: 1 col mobile -> 2 col tablet -> 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;