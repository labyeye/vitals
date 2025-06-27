import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, Award, Shield, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const products = [
    {
      name: 'Strawberry',
      color: 'from-pink-400 to-red-400',
      bgColor: 'bg-gradient-to-br from-pink-50 to-red-50',
      image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Chocolate',
      color: 'from-amber-600 to-amber-800',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
      image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Vanilla',
      color: 'from-yellow-300 to-yellow-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50',
      image: 'https://images.pexels.com/photos/414262/pexels-photo-414262.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Coffee',
      color: 'from-amber-800 to-stone-800',
      bgColor: 'bg-gradient-to-br from-stone-50 to-amber-50',
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#B1D182]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#688F4E]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#2B463C]/5 to-[#688F4E]/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-[#B1D182]/30 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
              <Award className="w-4 h-4 text-[#688F4E]" />
              <span className="text-sm font-medium text-[#2B463C]">Made in India</span>
              <div className="w-6 h-4 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-sm"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] bg-clip-text text-transparent">
                  Protein That
                </span>
                <br />
                <span className="text-[#2B463C]">Tastes Like</span>
                <br />
                <span className="bg-gradient-to-r from-[#688F4E] to-[#B1D182] bg-clip-text text-transparent animate-pulse">
                  Dessert
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                25g of complete protein, zero added sugar, and flavors that make you forget you're being healthy. 
                No scooping, no mixing, no compromise.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center group cursor-pointer">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#B1D182]/30 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-[#2B463C]">25g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#B1D182]/30 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-[#2B463C]">&lt;200</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#B1D182]/30 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-[#2B463C]">0g</div>
                  <div className="text-sm text-gray-600">Added Sugar</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="group bg-white/80 backdrop-blur-sm border border-[#B1D182]/30 text-[#2B463C] px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Story</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">4.9/5 from 2,847 reviews</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              {/* Main Product Display */}
              <div className="relative w-full max-w-md mx-auto">
                <div className={`${products[currentSlide].bgColor} rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-500`}>
                  <img
                    src={products[currentSlide].image}
                    alt={`${products[currentSlide].name} Protein Shake`}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-[#2B463C]">
                      {products[currentSlide].name} Protein
                    </h3>
                    <p className="text-gray-600 mt-2">Your daily protein fix, dressed as a treat</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-[#B1D182]/30 animate-bounce">
                  <Shield className="w-6 h-6 text-[#688F4E]" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-[#B1D182]/30 animate-pulse">
                  <Zap className="w-6 h-6 text-[#688F4E]" />
                </div>
              </div>

              {/* Product Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-[#688F4E] scale-125'
                        : 'bg-gray-300 hover:bg-[#B1D182]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#688F4E] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#688F4E] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;