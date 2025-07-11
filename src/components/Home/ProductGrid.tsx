import React, { useState, useMemo } from "react";
import ProductCard, { Product } from "./ProductCard";
import {Search, SlidersHorizontal } from "lucide-react";

interface ProductGridProps {
  onAddToCart: (
    productId: string,
    quantity: number,
    packSize: keyof Product["price"]
  ) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterOpen, setFilterOpen] = useState(false);

  const products: Product[] = [
    {
      id: "strawberry",
      name: "Vital Strawberry Protein Shake",
      flavor: "Strawberry",
      description:
        "Your daily protein fix, dressed as a treat. Tastes like dessert, performs like a pro.",
      image:
        "https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: { 1: 149, 6: 799, 12: 1499, 24: 2799 },
      features: [
        "25g Complete Protein",
        "No Added Sugar",
        "Preservative Free",
        "Gut Health Support",
      ],
      gradient: "from-pink-400 to-red-400",
      bgGradient: "bg-gradient-to-br from-pink-50 to-red-50",
    },
    {
      id: "chocolate",
      name: "Vital Chocolate Protein Shake",
      flavor: "Chocolate",
      description:
        "Classic flavour, smarter fuel. Rich taste of real cocoa with 25g of clean, complete protein.",
      image:
        "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: { 1: 149, 6: 799, 12: 1499, 24: 2799 },
      features: [
        "25g Complete Protein",
        "No Added Sugar",
        "Preservative Free",
        "Gut Health Support",
      ],
      gradient: "from-amber-600 to-amber-800",
      bgGradient: "bg-gradient-to-br from-amber-50 to-orange-50",
    },
    {
      id: "vanilla",
      name: "Vital Vanilla Protein Shake",
      flavor: "Vanilla",
      description:
        "Simple doesn't mean boring. Smooth, balanced, and endlessly drinkable everyday essential.",
      image:
        "https://images.pexels.com/photos/414262/pexels-photo-414262.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: { 1: 149, 6: 799, 12: 1499, 24: 2799 },
      features: [
        "25g Complete Protein",
        "No Added Sugar",
        "Preservative Free",
        "Gut Health Support",
      ],
      gradient: "from-yellow-300 to-yellow-500",
      bgGradient: "bg-gradient-to-br from-yellow-50 to-amber-50",
    },
    {
      id: "coffee",
      name: "Vital Coffee Protein Shake",
      flavor: "Coffee",
      description:
        "Your morning brew just got an upgrade. Daily protein and caffeine kick in one smooth bottle.",
      image:
        "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: { 1: 159, 6: 849, 12: 1599, 24: 2999 },
      features: [
        "25g Complete Protein",
        "100mg Natural Caffeine",
        "Preservative Free",
        "Gut Health Support",
      ],
      gradient: "from-amber-800 to-stone-800",
      bgGradient: "bg-gradient-to-br from-stone-50 to-amber-50",
    },
    {
      id: "variety",
      name: "Vital Variety Pack",
      flavor: "Mixed",
      description:
        "All the flavours. All the functions. One pack. Perfect for those who can't pick just one.",
      image:
        "https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: { 4: 599, 12: 1699, 24: 3199 },
      features: [
        "All 4 Flavours",
        "25g Complete Protein",
        "Perfect Variety",
        "Great Value",
      ],
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.flavor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            Math.min(...Object.values(a.price)) -
            Math.min(...Object.values(b.price))
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            Math.min(...Object.values(b.price)) -
            Math.min(...Object.values(a.price))
        );
        break;
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchTerm, sortBy]);

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 mt-10">
            <span className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] bg-clip-text text-transparent">
              Our Products
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of delicious protein shakes, each crafted with
            25g of complete protein and zero added sugar. Choose your favorite
            or try them all!
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-12 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search - now takes up remaining space */}
            <div className="relative w-full lg:w-auto lg:flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Sort and Filter - now only takes necessary space */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent transition-all duration-300 w-full lg:w-auto"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-[#688F4E]/10 hover:border-[#688F4E] transition-all duration-300"
              >
                <SlidersHorizontal className="w-5 h-5 text-[#2B463C]" />
              </button>
            </div>
          </div>

          {/* Filter Panel remains the same */}
          {filterOpen && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B463C]">
                    Flavor
                  </label>
                  <div className="space-y-1">
                    {[
                      "All",
                      "Strawberry",
                      "Chocolate",
                      "Vanilla",
                      "Coffee",
                    ].map((flavor) => (
                      <label
                        key={flavor}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#688F4E] focus:ring-[#688F4E]"
                        />
                        <span>{flavor}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B463C]">
                    Pack Size
                  </label>
                  <div className="space-y-1">
                    {["Single", "6-Pack", "12-Pack", "24-Pack"].map((size) => (
                      <label
                        key={size}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#688F4E] focus:ring-[#688F4E]"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B463C]">
                    Price Range
                  </label>
                  <div className="space-y-1">
                    {[
                      "Under ₹500",
                      "₹500 - ₹1000",
                      "₹1000 - ₹2000",
                      "Over ₹2000",
                    ].map((range) => (
                      <label
                        key={range}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#688F4E] focus:ring-[#688F4E]"
                        />
                        <span>{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B463C]">
                    Features
                  </label>
                  <div className="space-y-1">
                    {["High Protein", "No Sugar", "Caffeine", "Prebiotics"].map(
                      (feature) => (
                        <label
                          key={feature}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#688F4E] focus:ring-[#688F4E]"
                          />
                          <span>{feature}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-700"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-[#B1D182] to-[#688F4E] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2B463C] mb-4">
              No products found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSortBy("name");
              }}
              className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      
    </section>
  );
};

export default ProductGrid;
