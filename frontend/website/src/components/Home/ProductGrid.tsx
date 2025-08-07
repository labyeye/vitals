import React, { useState, useMemo } from "react";
import ProductCard, { Product } from "./ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: string, quantity: number, packSize: number) => void;
  // Keep this signature to maintain compatibility
}
const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterOpen, setFilterOpen] = useState(false);
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.flavor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            Math.min(...Object.values(a.prices)) -  // Changed from price to prices
            Math.min(...Object.values(b.prices))   // Changed from price to prices
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            Math.min(...Object.values(b.prices)) -  // Changed from price to prices
            Math.min(...Object.values(a.prices))    // Changed from price to prices
        );
        break;
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  
    return filtered;
  }, [products, searchTerm, sortBy]);

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        
    
        

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
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