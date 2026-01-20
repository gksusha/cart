import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { isAuthenticated } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#212529] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo - Pure White */}
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
        >
          DEVCART
        </Link>

        {/* Right Side Actions */}
        <div className="flex gap-8 items-center">
          {/* Cart Link - Icon + Text in White */}
          <Link 
            to="/cart" 
            className="group flex items-center gap-2 text-xs font-medium tracking-widest text-white hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <ShoppingCart size={20} className="stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <span>CART</span>
          </Link>

          {/* Login / Logout - Icon + Text in White */}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-medium tracking-widest text-white hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
            >
              <LogOut size={20} className="stroke-[1.5]" />
              <span>LOGOUT</span>
            </button>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-xs font-medium tracking-widest text-white hover:opacity-80 transition-opacity"
            >
              <User size={20} className="stroke-[1.5]" />
              <span>SIGN IN</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;