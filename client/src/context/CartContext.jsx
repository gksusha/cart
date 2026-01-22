import { createContext, useContext, useEffect, useState } from "react";
import { fetchCart, addItemToCart, removeItemFromCart } from "../utils/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper: Force IDs to be numbers
  const normalizeId = (id) => Number(id);

  // Helper: Group duplicate items from server to clean up UI
  const cleanCartData = (items) => {
    if (!items || !Array.isArray(items)) return [];
    
    const uniqueItems = [];
    items.forEach(item => {
      const targetId = normalizeId(item.productId || item.id);
      const existing = uniqueItems.find(u => normalizeId(u.productId || u.id) === targetId);
      
      if (existing) {
        // If duplicate found, just add quantities together
        existing.quantity += item.quantity;
      } else {
        uniqueItems.push({ ...item, productId: targetId, id: targetId });
      }
    });
    return uniqueItems;
  };

  const saveToGuestCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("guestCart", JSON.stringify(newCart));
  };

  useEffect(() => {
    const loadCart = async () => {
      // 1. GUEST MODE
      if (!localStorage.getItem("token")) {
        const saved = localStorage.getItem("guestCart");
        setCartItems(saved ? JSON.parse(saved) : []);
        setLoading(false);
        return;
      }
      
      // 2. SERVER MODE
      try {
        const data = await fetchCart();
        // Clean up any server duplicates immediately
        setCartItems(cleanCartData(data?.cart?.items || []));
      } catch (err) {
        console.error("Server Load Error:", err);
        const saved = localStorage.getItem("guestCart");
        setCartItems(saved ? JSON.parse(saved) : []);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const targetId = normalizeId(product.id || product.productId);
    const qty = Number(product.quantity) || 1;

    // GUEST LOGIC
    if (!localStorage.getItem("token")) {
      const currentCart = [...cartItems];
      const existingIndex = currentCart.findIndex(item => 
        normalizeId(item.id || item.productId) === targetId
      );

      if (existingIndex > -1) {
        currentCart[existingIndex].quantity += qty;
      } else {
        currentCart.push({ ...product, id: targetId, productId: targetId, quantity: qty });
      }
      saveToGuestCart(currentCart);
      return;
    }

    // SERVER LOGIC
    try {
      const payload = { 
        productId: targetId, 
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty 
      };
      
      const data = await addItemToCart(payload);
      if (data?.success) {
        setCartItems(cleanCartData(data.cart.items));
      }
    } catch (err) {
      alert("Server Error: Could not add item.");
    }
  };

  const removeFromCart = async (productId) => {
    const targetId = normalizeId(productId);

    // 1. Optimistic Update (Remove from screen immediately)
    const newCart = cartItems.filter(item => 
      normalizeId(item.id || item.productId) !== targetId
    );
    setCartItems(newCart);

    // Guest Mode: Save and done
    if (!localStorage.getItem("token")) {
      localStorage.setItem("guestCart", JSON.stringify(newCart));
      return;
    }

    // Server Mode: Send request silently
    try {
      await removeItemFromCart(targetId);
      // We do NOT reload from server here to prevent "Zombie" items from returning
    } catch (err) {
      console.error("Server delete failed:", err);
    }
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    const targetId = normalizeId(productId);

    const updatedCart = cartItems.map(item => {
      if (normalizeId(item.id || item.productId) === targetId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    if (!localStorage.getItem("token")) {
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  // NEW: Function to wipe cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("guestCart");
    // If logged in, we should ideally tell server to clear, 
    // but for now we just clear UI to fix the stuck state.
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}