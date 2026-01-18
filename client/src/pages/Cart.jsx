import { useState } from "react";

function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 2000 },
    { id: 3, name: "Mouse", price: 800 },
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Cart Items */}
      <div className="md:col-span-2 p-4 rounded border">
        <h2 className="text-xl font-semibold mb-4">
          Your Cart ({items.length})
        </h2>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm">₹{item.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="p-4 rounded border h-fit">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span className="font-semibold">₹{total}</span>
        </div>

        <button
          disabled={items.length === 0}
          className="w-full mt-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          Checkout
        </button>
      </div>

    </div>
  );
}

export default Cart;
