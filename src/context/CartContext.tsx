'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service } from '@/lib/types';

interface CartContextProps {
  cart: Service[];
  addToCart: (service: Service) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Service[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service: Service) => {
    setCart((prevCart) => {
      // Check if the service is already in the cart
      const existingService = prevCart.find((item) => item.id === service.id);
      if (existingService) {
        // If it exists, return the previous cart without adding it again
        return prevCart;
      }
      // If it doesn't exist, add it to the cart
      return [...prevCart, service];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((service) => service.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
