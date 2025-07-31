import React, { useState, useEffect } from "react";
import Header from "../Home/Header";
import ProductGrid from "../Home/ProductGrid";
import Reviews from "../Home/Review";
import Cart from "../Home/Cart";
import { getProducts } from "../../services/productService";
// Types for Cart
interface CartItem {
  id: string;
  name: string;
  packSize: number;
  quantity: number;
  price: number;
  image: string;
}

interface Product {
  id: string;
  name: string;
  flavor: string;
  description: string;
  image: string;
  prices: Record<number, number>;
  features: string[];
  gradient: string;
  bgGradient: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError('');
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]); // Set to empty array instead of undefined
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
      productToAdd.prices[packSize as keyof typeof productToAdd.prices] ?? 0;

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
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
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