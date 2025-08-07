import React, { useState, useEffect } from "react";
import { Star, TrendingUp, Award } from "lucide-react";
import { Product, getBestsellers } from "../../services/productService";

interface BestsellersProps {
  onAddToCart: (productId: string, quantity: number, packSize: number) => void;
}

const Bestsellers: React.FC<BestsellersProps> = ({ onAddToCart }) => {
  const [bestsellerProducts, setBestsellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const products = await getBestsellers(4);
        setBestsellerProducts(products);
        setError(null);
      } catch (err) {
        console.error('Error fetching bestsellers:', err);
        setError('Failed to load bestsellers');
        setBestsellerProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-8 h-8 text-[#688F4E]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2B463C]">
                Bestsellers
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most loved products - tried, tested, and trusted by thousands of customers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-[#B1D182]/20 overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B463C] mb-4">
              Bestsellers
            </h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-8 h-8 text-[#688F4E]" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B463C]">
              Bestsellers
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most loved products - tried, tested, and trusted by thousands of customers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellerProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-lg border border-[#B1D182]/20 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              {/* Bestseller Badge */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#688F4E] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>Bestseller</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2B463C] mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(128 reviews)</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-[#688F4E]">
                    ₹{Math.round(product.prices[1] * 0.75)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.prices[1]}
                  </span>
                  <span className="text-sm text-red-600 font-semibold bg-red-100 px-2 py-1 rounded">
                    25% OFF
                  </span>
                </div>

                {/* Pack Size Selection */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.prices).slice(0, 2).map(([size, price]) => (
                      <button
                        key={size}
                        className="text-xs border border-[#B1D182] rounded-lg px-2 py-1 hover:bg-[#688F4E] hover:text-white transition-colors"
                      >
                        {size} pack - ₹{Math.round(price * 0.75)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product.id, 1, 1)}
                  className="w-full bg-gradient-to-r from-[#688F4E] to-[#2B463C] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-[#2B463C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#688F4E] transition-colors duration-300 inline-flex items-center space-x-2">
            <span>View All Products</span>
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
