import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Home/Header";
import Cart, { CartItem } from "./components/Home/Cart";
import Footer from "./components/Home/Footer";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage"; // You'll need to create this
import ProductPage from "./components/pages/ProductsPage";
import ContactPage from "./components/pages/ContactPage";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
 


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
          <Route path="/contact" element={<ContactPage />} />
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
