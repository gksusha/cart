import { createContext, useContext, useEffect, useState } from "react";
import { fetchCart, addItemToCart, removeItemFromCart } from "../utils/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!localStorage.getItem("token")) {
          setCartItems([]);
          return;
        }
        const data = await fetchCart();
        if (data?.success && data?.cart) {
          setCartItems(data.cart.items || []);
        } else {
          setCartItems([]);
        }
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    // 1. Determine quantity to add (default to 1)
    const quantityToAdd = product.quantity || 1;
    
    // NOTE: 'product' comes from PRODUCTS array (has 'id'), 
    // but cart items usually need 'productId'. We normalize this here.
    const targetId = product.id || product.productId;

    // LOCAL (GUEST) LOGIC
    if (!localStorage.getItem("token")) {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.productId === targetId);
        
        if (existingItem) {
          // Add new quantity to existing quantity
          return prev.map((item) =>
            item.productId === targetId
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          );
        }
        // New item
        return [...prev, { ...product, productId: targetId, quantity: quantityToAdd }];
      });
      return;
    }

    // AUTHENTICATED LOGIC
    try {
      // Send the specific quantity to the backend
      const data = await addItemToCart({ ...product, productId: targetId, quantity: quantityToAdd });
      if (data?.success && data?.cart) {
        setCartItems(data.cart.items);
      }
    } catch {
      // Optimistic Update Fallback
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.productId === targetId);
        if (existingItem) {
          return prev.map((item) =>
            item.productId === targetId
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          );
        }
        return [...prev, { ...product, productId: targetId, quantity: quantityToAdd }];
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (!localStorage.getItem("token")) {
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }

    try {
      const data = await removeItemFromCart(productId);
      if (data?.success && data?.cart) {
        setCartItems(data.cart.items);
      }
    } catch {
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalPrice, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}