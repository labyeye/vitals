import React from 'react';
import { Droplets, Package, Grid } from 'lucide-react';

interface ProductFilterProps {
  selectedCategory: 'all' | 'shakes' | 'sachets';
  onCategoryChange: (category: 'all' | 'shakes' | 'sachets') => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'all' as const,
      name: 'All Products',
      icon: Grid,
      description: 'View complete range'
    },
    {
      id: 'shakes' as const,
      name: 'Protein Shakes',
      icon: Droplets,
      description: 'Ready-to-drink with 25g protein'
    },
    {
      id: 'sachets' as const,
      name: 'Sachet Powders',
      icon: Package,
      description: 'Mix anywhere nutrition'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-[#688F4E]">Nutrition Style</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you prefer ready-to-drink convenience or mix-your-own flexibility, we've got you covered
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-4xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#688F4E] to-[#2B463C] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-xl border border-gray-200'
                }`}
              >
                {/* Background pattern for active state */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className={`p-3 rounded-full transition-colors duration-300 ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-[#688F4E]/10 group-hover:bg-[#688F4E]/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isActive ? 'text-white' : 'text-[#688F4E]'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category.name}
                      </h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        isActive ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Category description */}
        <div className="text-center mt-8">
          {selectedCategory === 'all' && (
            <p className="text-gray-600 text-lg">
              Explore our complete range of premium protein products
            </p>
          )}
          {selectedCategory === 'shakes' && (
            <p className="text-gray-600 text-lg">
              Ready-to-drink protein shakes with 25g complete protein - perfect for post-workout recovery
            </p>
          )}
          {selectedCategory === 'sachets' && (
            <p className="text-gray-600 text-lg">
              Convenient single-serving protein powder sachets - mix with water or milk anywhere, anytime
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductFilter;
