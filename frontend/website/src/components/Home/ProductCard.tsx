import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Star, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Product {
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

interface CartItem {
  id: string;
  name: string;
  packSize: number;
  quantity: number;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number, packSize: number) => void;
  viewDetailsLink?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  viewDetailsLink
}) => {
  const navigate = useNavigate();
  const availablePackSizes = Object.keys(product.prices).map(Number).sort((a, b) => a - b);

  // Initialize selectedPack with the first available pack size or fallback to 1
  const getInitialPackSize = (): number => {
    if (product.prices[1]) return 1;
    if (product.prices[6]) return 6;
    return availablePackSizes[0] || 1;
  };

  const [selectedPack, setSelectedPack] = useState<number>(getInitialPackSize());
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Update selectedPack if the current selection is not available for this product
  useEffect(() => {
    if (!product.prices[selectedPack]) {
      setSelectedPack(getInitialPackSize());
    }
  }, [product.id, selectedPack]);

  // Generate pack options based on available sizes
  const packOptions = availablePackSizes.map(size => ({
    size,
    label: size === 1 ? 'Single' : `${size}-Pack`,
    popular: size === 6
  }));

  const currentPrice = product.prices[selectedPack] || 0;
  const pricePerBottle = selectedPack > 0 ? currentPrice / selectedPack : 0;

  const handleViewDetails = () => {
    if (viewDetailsLink) {
      navigate(viewDetailsLink);
    } else {
      navigate(`/product/${product.id}`);
    }
  };
  const handleAddToCart = () => {
    if (onAddToCart) {
      // Call the parent's function with the expected parameters
      onAddToCart(product.id, quantity, selectedPack);
    }
  };

  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isHovered ? 'scale-105' : 'scale-100'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {selectedPack === 6 && (
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-[#688F4E] to-[#B1D182] text-white px-4 py-1 rounded-full text-sm font-semibold z-10 animate-pulse">
          Most Popular
        </div>
      )}

      {/* Heart Icon */}
      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110 z-10">
        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 hover:fill-red-500 transition-colors duration-300" />
      </button>

      {/* Product Image */}
      <div className={`relative overflow-hidden rounded-2xl ${product.bgGradient} p-4 mb-6`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>

        {/* Floating Info Button */}
        <button className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Info className="w-4 h-4 text-[#2B463C]" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-[#2B463C] group-hover:text-[#688F4E] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500">(4.9)</span>
        </div>

        {/* Pack Size Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[#2B463C]">Pack Size</label>
          <div className="grid grid-cols-2 gap-2">
            {packOptions.map((option) => (
              <button
                key={option.size}
                onClick={() => setSelectedPack(option.size)}
                className={`relative p-3 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${selectedPack === option.size
                  ? 'border-[#688F4E] bg-[#688F4E]/10 text-[#2B463C]'
                  : 'border-gray-200 hover:border-[#B1D182] text-gray-600 hover:text-[#2B463C]'
                  }`}
              >
                {option.label}
                {option.popular && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#688F4E] rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2B463C]">Quantity</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-[#688F4E] flex items-center justify-center font-bold text-[#2B463C] hover:bg-[#688F4E]/10 transition-all duration-300"
            >
              -
            </button>
            <span className="w-12 text-center font-semibold text-[#2B463C]">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-[#688F4E] flex items-center justify-center font-bold text-[#2B463C] hover:bg-[#688F4E]/10 transition-all duration-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-[#2B463C]">₹{currentPrice.toFixed(0)}</span>
            <span className="text-sm text-gray-500">per pack</span>
          </div>
          <p className="text-sm text-[#688F4E] font-medium">
            ₹{pricePerBottle.toFixed(0)} per bottle
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-[#688F4E] rounded-full animate-pulse"></div>
            <span>25g Complete Protein</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-[#688F4E] rounded-full animate-pulse"></div>
            <span>No Added Sugar</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-[#688F4E] rounded-full animate-pulse"></div>
            <span>Shelf Stable</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-[#688F4E]">
  <div className="flex items-center">
    <Star className="w-4 h-4 mr-1" />
    <span>Earn {Math.floor(currentPrice * 0.10)} Evolv points</span>
  </div>
</div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white py-3 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group mb-2"
        >
          <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>View Details</span>
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white py-3 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;