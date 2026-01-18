import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar({ dark, setDark }) {
  const { cartItems } = useContext(CartContext);

  return (
    <nav
      style={{
        backgroundColor: dark ? "#1f2937" : "white",
        color: dark ? "white" : "black",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
      }}
    >
      <strong>Cart</strong>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cartItems.length})
        </Link>

        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
