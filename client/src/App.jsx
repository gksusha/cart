import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <Router>
      <div
        style={{
          backgroundColor: dark ? "#111827" : "#f3f4f6",
          color: dark ? "white" : "black",
          minHeight: "100vh",
          transition: "all 0.3s",
        }}
      >
        <Navbar dark={dark} setDark={setDark} />

        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
