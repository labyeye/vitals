import React, { useEffect, useState } from "react";
import { ArrowRight, Play, Star, Award, Shield, Zap } from "lucide-react";

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Premium Protein Shakes",
      subtitle: "25g of complete protein in every delicious sip",
      cta: "Shop Now"
    },
    {
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Zero Added Sugar",
      subtitle: "Natural sweetness, maximum nutrition",
      cta: "Learn More"
    },
    {
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Gut Health Support",
      subtitle: "Prebiotics for a healthier digestive system",
      cta: "Discover"
    },
    {
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Multiple Flavors",
      subtitle: "Strawberry, Chocolate, Vanilla & Coffee",
      cta: "Explore Flavors"
    },
    {
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Convenient & Ready",
      subtitle: "No mixing, no mess - just grab and go",
      cta: "Get Started"
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Slider Container */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
             
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 absolute"
              }`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-[#688F4E] to-[#2B463C] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-4 h-6 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
