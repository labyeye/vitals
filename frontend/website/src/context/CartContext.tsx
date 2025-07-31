import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../components/Home/Cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  isLoading: boolean; // Add loading state
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      console.log('Loading cart from localStorage:', stored);
      if (stored) {
        const parsedItems = JSON.parse(stored);
        setCartItems(Array.isArray(parsedItems) ? parsedItems : []);
        console.log('Loaded cart items:', parsedItems);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever cartItems change
  useEffect(() => {
    if (!isLoading) { // Only save after initial load
      try {
        console.log('Saving cart to localStorage:', cartItems);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoading]);

  const addToCart = (item: CartItem) => {
    console.log('Adding item to cart:', item);
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === item.id && i.packSize === item.packSize
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].quantity += item.quantity;
        console.log('Updated existing item, new cart:', updated);
        return updated;
      }
      const newCart = [...prev, item];
      console.log('Added new item, new cart:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    console.log('Updating quantity for item:', cartItemId, 'to:', newQuantity);
    if (newQuantity === 0) {
      removeItem(cartItemId);
    } else {
      setCartItems((items) =>
        items.map((item) =>
          `${item.id}-${item.packSize}` === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeItem = (cartItemId: string) => {
    console.log('Removing item:', cartItemId);
    setCartItems((items) =>
      items.filter((item) => `${item.id}-${item.packSize}` !== cartItemId)
    );
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
};