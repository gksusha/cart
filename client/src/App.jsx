import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4">
        <Cart />
      </main>
    </div>
  );
}

export default App;
