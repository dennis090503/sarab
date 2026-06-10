import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('sarab_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('sarab_cart', JSON.stringify(cart));
  }, [cart]);

  // Helper function to safely parse price to number
  const parsePriceToNumber = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      // Remove $ sign and any other non-numeric characters except decimal
      const cleaned = price.replace(/[^0-9.-]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
      // Safely parse the price
      const numericPrice = parsePriceToNumber(item.price);
      
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      
      return [...prevCart, { 
        id: item.id, 
        title: item.title, 
        price: numericPrice, 
        img: item.img,
        quantity 
      }];
    });
  };

  const updateQuantity = (itemId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === itemId ? { ...item, quantity: amount } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);