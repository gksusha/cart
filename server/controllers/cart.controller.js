import Cart from "../models/Cart.js";

// @desc Get user cart
// @route GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.json({
      success: true,
      cart: cart || { items: [] },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get cart",
    });
  }
};

// @desc Add item to cart
// @route POST /api/cart/add
export const addToCart = async (req, res) => {
  try {
    // FIX 1: Destructure 'image' and 'quantity' so they are not ignored
    const { productId, name, price, image, quantity } = req.body;
    
    // FIX 2: Ensure quantity is a number (default to 1 if missing)
    const qty = Number(quantity) || 1;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        // FIX 3: Save 'image' and use 'qty' variable
        items: [{ productId, name, price, image, quantity: qty }],
      });
    } else {
      // FIX 4: Use .toString() to ensure we match IDs correctly (prevents duplicates)
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (itemIndex > -1) {
        // FIX 5: Add the actual selected quantity (e.g., +4), not just +1
        cart.items[itemIndex].quantity += qty;
      } else {
        // FIX 6: Push new item with image and correct quantity
        cart.items.push({ productId, name, price, image, quantity: qty });
      }

      await cart.save();
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("ADD CART ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
    });
  }
};

// @desc Remove item from cart
// @route POST /api/cart/remove
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // FIX 7: Use .toString() so the ID comparison actually works
    // (Old code failed if database ID was ObjectId and request ID was String)
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await cart.save();

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("REMOVE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove item",
    });
  }
};

// @desc Clear cart
// @route DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};