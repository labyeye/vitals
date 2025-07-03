import React, { useState } from "react";
import Header from "../Home/Header";
import ProductGrid from "../Home/ProductGrid";
import Reviews from "../Home/Review";

import Cart from "../Home/Cart";

const ProductPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (
    productId: string,
    quantity: number,
    packSize: number
  ) => {
    // Find the product being added
    const productToAdd = products.find((p) => p.id === productId);

    if (!productToAdd) return;

    // Get the price or default to 0 if not found (though this shouldn't happen with valid packSize)
    const itemPrice =
      productToAdd.price[packSize as keyof typeof productToAdd.price] ?? 0;

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === productId && item.packSize === packSize
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item to cart
      setCartItems([
        ...cartItems,
        {
          id: productId,
          name: productToAdd.name,
          packSize,
          quantity,
          price: itemPrice,
          image: productToAdd.image,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        `${item.id}-${item.packSize}` === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(
      cartItems.filter((item) => `${item.id}-${item.packSize}` !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white">
      <Header
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <ProductGrid onAddToCart={handleAddToCart} />
        <Reviews />
      </main>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default ProductPage;

// Types for Cart
interface CartItem {
  id: string;
  name: string;
  packSize: number;
  quantity: number;
  price: number;
  image: string;
}

// Mock products data (should match your Product interface)
const products = [
  {
    id: "strawberry",
    name: "Vital Strawberry Protein Shake",
    flavor: "Strawberry",
    description:
      "Your daily protein fix, dressed as a treat. Tastes like dessert, performs like a pro.",
    image:
      "https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: { 1: 149, 6: 799, 12: 1499, 24: 2799 },
    features: [
      "25g Complete Protein",
      "No Added Sugar",
      "Preservative Free",
      "Gut Health Support",
    ],
    gradient: "from-pink-400 to-red-400",
    bgGradient: "bg-gradient-to-br from-pink-50 to-red-50",
  },
  {
    id: "chocolate",
    name: "Vital Chocolate Protein Shake",
    flavor: "Chocolate",
    description:
      "Classic flavour, smarter fuel. Rich taste of real cocoa with 25g of clean, complete protein.",
    image:
      "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: { 1: 149, 6: 799, 12: 1499, 24: 2799 },
    features: [
      "25g Complete Protein",
      "No Added Sugar",
      "Preservative Free",
      "Gut Health Support",
    ],
    gradient: "from-amber-600 to-amber-800",
    bgGradient: "bg-gradient-to-br from-amber-50 to-orange-50",
  },
  {
    id: "vanilla",
    name: "Vital Vanilla Protein Shake",
    flavor: "Vanilla",
    description:
      "Simple doesn't mean boring. Smooth, balanced, and endlessly drinkable everyday essential.",
    image:
      "https://images.pexels.com/photos/414262/pexels-photo-414262.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: { 1: 149, 6: 799, 12: 1499, 24: 2799 },
    features: [
      "25g Complete Protein",
      "No Added Sugar",
      "Preservative Free",
      "Gut Health Support",
    ],
    gradient: "from-yellow-300 to-yellow-500",
    bgGradient: "bg-gradient-to-br from-yellow-50 to-amber-50",
  },
  {
    id: "coffee",
    name: "Vital Coffee Protein Shake",
    flavor: "Coffee",
    description:
      "Your morning brew just got an upgrade. Daily protein and caffeine kick in one smooth bottle.",
    image:
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: { 1: 159, 6: 849, 12: 1599, 24: 2999 },
    features: [
      "25g Complete Protein",
      "100mg Natural Caffeine",
      "Preservative Free",
      "Gut Health Support",
    ],
    gradient: "from-amber-800 to-stone-800",
    bgGradient: "bg-gradient-to-br from-stone-50 to-amber-50",
  },
  {
    id: "variety",
    name: "Vital Variety Pack",
    flavor: "Mixed",
    description:
      "All the flavours. All the functions. One pack. Perfect for those who can't pick just one.",
    image:
      "https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: { 4: 599, 12: 1699, 24: 3199 },
    features: [
      "All 4 Flavours",
      "25g Complete Protein",
      "Perfect Variety",
      "Great Value",
    ],
    gradient: "from-purple-400 to-pink-400",
    bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
];
