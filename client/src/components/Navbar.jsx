import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="border-b p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        CartApp
      </Link>

      <div className="space-x-4">
        {loggedIn ? (
          <>
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
