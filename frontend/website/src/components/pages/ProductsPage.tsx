import React, { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import ProductGrid from "../Home/ProductGrid";
import Reviews from "../Home/Review";
import { getProducts } from "../../services/productService";
import { CartItem } from "../Home/Cart";
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
  const { addToCart } = useCartContext();

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
  const handleAddToCart = (productId: string, quantity: number, packSize: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
  
    const price = product.prices[packSize] || 0;
  
    const cartItem = {
      id: productId,
      name: product.name,
      packSize,
      quantity,
      price,
      image: product.image
    };
  
    addToCart(cartItem);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#688F4E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#688F4E] text-white px-4 py-2 rounded hover:bg-[#2B463C] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white">
      <main>
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
        <Reviews />
      </main>
    </div>
  );
};

export default ProductPage;