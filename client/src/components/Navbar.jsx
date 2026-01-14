import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="text-xl font-bold text-gray-800">
          Cart
        </Link>

        <ul className="flex gap-6 text-gray-600 font-medium">
          <li>
            <Link to="/" className="hover:text-black">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-black">Cart</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            Login
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
