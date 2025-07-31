import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider, useCartContext } from './context/CartContext';
import Header from "./components/Home/Header";
import Cart, { CartItem } from "./components/Home/Cart";
import Footer from "./components/Home/Footer";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ProductPage from "./components/pages/ProductsPage";
import ContactPage from "./components/pages/ContactPage";
import UpdatesPage from "./components/pages/UpdatesPage";
import BlogsPage from "./components/pages/BlogsPage";
import ProfilePage from "./components/pages/ProfilePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProductDetailsPage from "./components/pages/ProductDetailsPage";
import Dashboard from "./components/pages/Dashboard";
import CheckoutPage from './components/pages/CheckoutPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <HeaderWithCartCount onCartClick={() => setIsCartOpen(true)} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/updates" element={<UpdatesPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product/:productId" element={<ProductDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <Footer />
            <CartWithContext isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function HeaderWithCartCount({ onCartClick }: { onCartClick: () => void }) {
  const { cartItems } = useCartContext();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return <Header cartCount={cartCount} onCartClick={onCartClick} />;
}

function CartWithContext({ isCartOpen, setIsCartOpen }: { isCartOpen: boolean, setIsCartOpen: (open: boolean) => void }) {
  const { cartItems, updateQuantity, removeItem } = useCartContext();
  const navigate = useNavigate();
  return (
    <Cart
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      items={cartItems}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      onProceedToCheckout={() => {
        setIsCartOpen(false);
        navigate('/checkout');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  );
}

export default App;
