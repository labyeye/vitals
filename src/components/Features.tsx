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
    <section className="py-12 bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10">
      <div className="mx-auto px-4 w-full max-w-7xl"> {/* Increased max-width */}
        <div className="text-center">
          {/* Logo */}
          <div className="mb-10">
            <div className="text-4xl font-bold text-[#2B463C] mb-2">VITAL</div>
            <div className="h-1 w-20 bg-[#688F4E] mx-auto"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B463C] mb-12 leading-tight">
            Pure, premium nutrition.
            <br />
            Made with only the good stuff.
          </h1>

          {/* Wider Feature Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#B1D182]/30 mb-10 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4"> {/* Responsive columns */}
              {allergenFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 group min-w-[100px]" /* Compact cards */
                  >
                    <div className="w-12 h-12 rounded-full bg-[#688F4E]/10 flex items-center justify-center mb-2 group-hover:bg-[#688F4E]/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#688F4E]" />
                    </div>
                    <span className="text-sm font-medium text-[#2B463C] text-center leading-tight">
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