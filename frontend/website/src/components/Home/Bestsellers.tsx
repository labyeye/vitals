import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Product, getBestsellers } from "../../services/productService";
import ProductCard from "./ProductCard";

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
          {bestsellerProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-700"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                viewDetailsLink={`/product/${product.id}`}
              />
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
