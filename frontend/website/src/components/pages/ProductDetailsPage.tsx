import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { getProductById } from "../../services/productService";

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

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeItem } = useCartContext();
  const [selectedPackSize, setSelectedPackSize] = useState<number>(1);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const data = await getProductById(productId);
          setProduct(data);
          // Set initial pack size to first available size
          const availableSizes = Object.keys(data.prices).map(Number).sort((a, b) => a - b);
          if (availableSizes.length > 0) {
            setSelectedPackSize(availableSizes[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#688F4E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const itemPrice = product.prices[selectedPackSize as keyof typeof product.prices] ?? 0;

    const cartItem = {
      id: product.id,
      name: product.name,
      packSize: selectedPackSize,
      quantity: quantity,
      price: itemPrice,
      image: product.image,
    };

    addToCart(cartItem);
  };

  const packSizes = Object.keys(product.prices).map(Number);
  const pricePerUnit = product.prices[selectedPackSize] / selectedPackSize;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white mt-20">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className={`rounded-2xl overflow-hidden ${product.bgGradient} p-8`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pack Size Selection */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pack Size</h2>
              <div className="flex flex-wrap gap-2">
                {packSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedPackSize(size)}
                    className={`px-4 py-2 rounded-full ${selectedPackSize === size 
                      ? `bg-gradient-to-r ${product.gradient} text-white` 
                      : 'bg-white border border-gray-300 text-gray-700'
                    }`}
                  >
                    {size} {size === 1 ? 'bottle' : 'bottles'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-gray-800 mr-2">
                  ₹{product.prices[selectedPackSize as keyof typeof product.prices]}
                </span>
                {selectedPackSize > 1 && (
                  <span className="text-sm text-gray-500">
                    (₹{pricePerUnit.toFixed(0)} per bottle)
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-full">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 bg-gradient-to-r ${product.gradient} text-white py-2 px-6 rounded-full font-medium hover:opacity-90 transition-opacity`}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* View Cart Button */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#2B463C] text-white py-3 px-6 rounded-full font-medium hover:bg-[#688F4E] transition-colors"
              >
                Proceed to Checkout ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
              </button>
              
              {cartItems.length > 0 && (
                <button
                  onClick={() => {
                    // This will open the cart modal by triggering the cart click
                    const cartButton = document.querySelector('[data-cart-button]') as HTMLElement;
                    if (cartButton) {
                      cartButton.click();
                    }
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  View Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsPage;