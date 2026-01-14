function Cart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Cart Items */}
      <div className="md:col-span-2 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {/* Single Item (UI Sample) */}
        <div className="flex justify-between items-center border-b py-3">
          <div>
            <h3 className="font-medium">Product Name</h3>
            <p className="text-sm text-gray-500">₹999</p>
          </div>
          <button className="text-red-500 hover:underline">
            Remove
          </button>
        </div>

      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span className="font-semibold">₹999</span>
        </div>

        <button className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800">
          Checkout
        </button>
      </div>

    </div>
  );
}

export default Cart;
