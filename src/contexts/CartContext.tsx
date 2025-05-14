
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  updateQuantity: (productId: string, quantity: number) => void;
  getProductQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    // Check if product is already in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity if already in cart
      updateQuantity(product.id, existingItem.quantity + 1);
      toast({
        title: "Updated cart",
        description: `Increased ${product.name} quantity in your cart.`,
      });
    } else {
      // Add new item with quantity 1
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== productId);
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getProductQuantity = (productId: string): number => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal,
      getCartCount,
      updateQuantity,
      getProductQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
