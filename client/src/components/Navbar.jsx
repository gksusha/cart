function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-gray-800">
          Cart
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-gray-600 font-medium">
          <li className="cursor-pointer hover:text-black">Home</li>
          <li className="cursor-pointer hover:text-black">Cart</li>
          <li className="cursor-pointer hover:text-black">Login</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
