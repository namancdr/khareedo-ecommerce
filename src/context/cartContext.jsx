import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export const useCart = () => {
  return useContext(cartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  //Add to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item }]);
    }
  };

  //Remove from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  //Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //Decrease quantity
  const decreaseQuantity = (id) => {
    const existingItem = cartItems.find((i) => i.id === id);
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const value = {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartItems,
    setCartItems
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
