import React from 'react';
import { Shield, Leaf, Heart, FlaskConical, Zap, Award } from 'lucide-react';

const WhyChooseThryv: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-[#688F4E]" />,
      title: "Packed with Protein",
      description: "25g complete protein in every serving for maximum muscle support"
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#688F4E]" />,
      title: "No Added Sugar",
      description: "Naturally sweetened for guilt-free nutrition"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#688F4E]" />,
      title: "GMO Free",
      description: "Clean, natural ingredients you can trust"
    },
    {
      icon: <Heart className="w-8 h-8 text-[#688F4E]" />,
      title: "Gut Friendly",
      description: "Easy to digest with digestive enzymes included"
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-[#688F4E]" />,
      title: "High in Fiber",
      description: "Supports digestive health and keeps you full"
    },
    {
      icon: <Award className="w-8 h-8 text-[#688F4E]" />,
      title: "Science Backed",
      description: "Formulated by nutritionists and fitness experts"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-[#688F4E]">Thryv?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Thryv, we believe you shouldn't have to choose between taste and nutrition. 
            Our protein products prove you can have the best of both worlds.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-[#688F4E]/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-green-50 rounded-full group-hover:bg-[#688F4E]/10 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-[#688F4E] rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Experience the Thryv Difference
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers who've made the switch to smarter nutrition
            </p>
            <button className="bg-white text-[#688F4E] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseThryv;
