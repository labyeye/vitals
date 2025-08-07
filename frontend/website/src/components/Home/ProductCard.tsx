import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: string;
  name: string;
  flavor: string;
  description: string;
  image: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  prices: Record<number, number>;
  features: string[];
  gradient: string;
  bgGradient: string;
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
  const [isHovered, setIsHovered] = useState(false);

  // Get default price (first available or single pack)
  const defaultPrice = product.prices[1] || Object.values(product.prices)[0] || 0;
  const defaultPackSize = product.prices[1] ? 1 : Number(Object.keys(product.prices)[0]) || 1;

  // Get primary and hover images
  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.image;
  const hoverImage = product.images?.find(img => !img.isPrimary)?.url || primaryImage;

  const handleViewDetails = () => {
    if (viewDetailsLink) {
      navigate(viewDetailsLink);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      // Use default pack size and quantity of 1
      onAddToCart(product.id, 1, defaultPackSize);
    }
  };

  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-2 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isHovered ? 'scale-105' : 'scale-100'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge - only show for 6-packs if they exist */}
      {product.prices[6] && (
        <div className="absolute -top-3 left-12 bg-gradient-to-r from-[#688F4E] to-[#B1D182] text-white px-4 py-1 text-sm font-semibold z-10 animate-pulse">
          6-Pack Available
        </div>
      )}

      {/* Heart Icon */}
      <button className="absolute top-8 right-8 p-2 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110 z-10">
        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 hover:fill-red-500 transition-colors duration-300" />
      </button>

      {/* Product Image - Extra large square with smooth fade transition */}
      <div className="relative overflow-hidden rounded-2xl bg-white mb-10 aspect-square">
        {/* Primary Image - Square */}
        <img
          src={primaryImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 ease-in-out"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        
        {/* Hover Image - Square */}
        <img
          src={hoverImage}
          alt={`${product.name} - Alternative view`}
          className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 ease-in-out"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Floating Info Button */}
        <button className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Info className="w-5 h-5 text-[#2B463C]" />
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

        {/* Price - Show starting price */}
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-[#2B463C]">₹{defaultPrice.toFixed(0)}</span>
            <span className="text-sm text-gray-500">starting from</span>
          </div>
          <p className="text-sm text-[#688F4E] font-medium">
            Multiple pack sizes available
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
            <span>Earn {Math.floor(defaultPrice * 0.10)} Thryv points</span>
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

        {/* Quick Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white py-3 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>Quick Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;