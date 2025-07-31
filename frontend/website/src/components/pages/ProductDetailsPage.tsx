import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Cart from "../Home/Cart";
import { getProductById } from "../../services/productService";

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

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPackSize, setSelectedPackSize] = useState<number>(1);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const data = await getProductById(productId);
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    const itemPrice = product.prices[selectedPackSize as keyof typeof product.prices] ?? 0;

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.packSize === selectedPackSize
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          packSize: selectedPackSize,
          quantity,
          price: itemPrice,
          image: product.image,
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

  const packSizes = Object.keys(product.prices).map(Number);
  const pricePerUnit = product.prices[selectedPackSize] / selectedPackSize;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white mt-20">
      <Header
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

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
          </div>
        </div>
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


export default ProductDetailsPage;