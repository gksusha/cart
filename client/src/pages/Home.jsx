import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 2000 },
    { id: 3, name: "Mouse", price: 800 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 border rounded"
        >
          <h3 className="font-semibold">{product.name}</h3>
          <p className="mb-2">₹{product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="px-3 py-1 bg-black text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
