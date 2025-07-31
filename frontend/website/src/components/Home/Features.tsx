import React from "react";
import {
  Milk,
  Leaf,
  Zap,
  Egg,
  Heart,
  FlaskConical,
  Shield,
  Globe,
  CheckCircle,
} from "lucide-react";

const Features: React.FC = () => {
  const allergenFeatures = [
    { icon: Milk, name: "Rich in protein" },
    { icon: Leaf, name: "No added sugar" },
    { icon: Zap, name: "Ready to drink" },
    { icon: Egg, name: "Clean ingredients" },
    { icon: Heart, name: "Gut health" },
    { icon: FlaskConical, name: "Science-backed" },
    { icon: CheckCircle, name: "Complete EAAs" },
    { icon: Shield, name: "Quality tested" },
    { icon: Globe, name: "Made in India" },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl lg:max-w-8xl xl:max-w-9xl">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B463C] mb-2">VITAL</div>
            <div className="h-1 w-16 sm:w-18 md:w-20 bg-[#688F4E] mx-auto"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2B463C] mb-8 sm:mb-10 md:mb-12 leading-tight px-4">
            Pure, premium nutrition.
            <br />
            Made with only the good stuff.
          </h1>

          {/* Wider Feature Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-[#B1D182]/30 mb-8 sm:mb-10 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3 sm:gap-4 md:gap-6">
              {allergenFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 sm:p-3 group min-w-[80px] sm:min-w-[90px] md:min-w-[100px]"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#688F4E]/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-[#688F4E]/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#688F4E]" />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#2B463C] text-center leading-tight">
                      {feature.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;