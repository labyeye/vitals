import React from "react";
import { ArrowRight, Zap, Droplets, Package } from "lucide-react";

const ProductRange: React.FC = () => {
  const categories = [
    {
      icon: Droplets,
      name: "Protein Shakes",
      description: "Ready-to-drink protein shakes with 25g complete protein. Perfect for post-workout recovery.",
      link: "/products?category=shakes",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a",
      features: ["25g Protein", "4 Flavors", "No Added Sugar", "Ready to Drink"]
    },
    {
      icon: Package,
      name: "Sachet Powders",
      description: "Convenient single-serving protein powder sachets. Mix anywhere, anytime nutrition.",
      link: "/products?category=sachets",
      gradient: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      features: ["25g Protein", "Portable", "Mix with Water/Milk", "Travel Friendly"]
    },
    {
      icon: Zap,
      name: "Variety Packs",
      description: "Try all our flavors in one convenient pack. Perfect for discovering your favorite.",
      link: "/products?category=variety",
      gradient: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      features: ["All Flavors", "Best Value", "Great for Beginners", "Mix & Match"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-[#F4F1E9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] bg-clip-text text-transparent">
              The Thryv Range
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of premium nutrition products, each crafted with precision and passion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-[#B1D182]/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* Image Header with Gradient Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2B463C] mb-3 group-hover:text-[#688F4E] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#688F4E] rounded-full"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <button className="inline-flex items-center space-x-2 text-[#688F4E] font-semibold group-hover:text-[#2B463C] transition-colors">
                      <span>Explore Range</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Can't Decide? Try Our Starter Pack
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get a taste of all our products with our specially curated variety pack
            </p>
            <button className="bg-white text-[#2B463C] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
              <span>Shop Starter Pack</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductRange;
