import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Home/Header";
import Hero from "./components/Home/Hero";
import ProductGrid from "./components/Home/ProductGrid";
import Features from "./components/Home/Features";
import Cart, { CartItem } from "./components/Home/Cart";
import Footer from "./components/Home/Footer";
import { Product } from "./components/Home/ProductCard";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage"; // You'll need to create this
import ProductPage from "./components/pages/ProductsPage";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products: Product[] = [
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
  ];

  const handleAddToCart = (
    productId: string,
    quantity: number,
    packSize: number
  ) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const cartItemId = `${productId}-${packSize}`;
    const existingItem = cartItems.find(
      (item) => `${item.id}-${item.packSize}` === cartItemId
    );

    if (existingItem) {
      setCartItems((items) =>
        items.map((item) =>
          `${item.id}-${item.packSize}` === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: productId,
        name: product.name,
        packSize: packSize,
        quantity,
        price: product.price[packSize],
        image: product.image,
      };
      setCartItems((items) => [...items, newItem]);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(cartItemId);
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

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((items) =>
      items.filter((item) => `${item.id}-${item.packSize}` !== cartItemId)
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>

        <Footer />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </Router>
  );
}

export default App;
