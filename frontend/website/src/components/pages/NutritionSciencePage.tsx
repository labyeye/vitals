import React from "react";
import { Beaker, Award, Shield, Microscope, Users, CheckCircle } from "lucide-react";

const NutritionSciencePage: React.FC = () => {
  const scienceFeatures = [
    {
      icon: Beaker,
      title: "Lab-Tested Formula",
      description: "Every batch undergoes rigorous testing for protein content, amino acid profile, and purity standards."
    },
    {
      icon: Award,
      title: "Complete Amino Profile",
      description: "All 9 essential amino acids (EAAs) in optimal ratios for maximum muscle protein synthesis."
    },
    {
      icon: Shield,
      title: "Bioavailability Focus",
      description: "Enhanced absorption with digestive enzymes and optimal pH balance for gut comfort."
    },
    {
      icon: Microscope,
      title: "Research-Backed",
      description: "Formulated based on latest sports nutrition research and Indian dietary requirements."
    }
  ];

  const nutritionalBenefits = [
    "25g Complete Protein per serving",
    "Zero Added Sugar (Naturally Sweetened)",
    "Enhanced with Prebiotics for Gut Health",
    "Fortified with Vitamin B12 & D3",
    "Low Glycemic Index for Sustained Energy",
    "Anti-inflammatory Turmeric Extract",
    "Digestive Enzymes for Better Absorption",
    "No Artificial Colors or Preservatives"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#F4F1E9] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] bg-clip-text text-transparent">
                The Science Behind Thryv
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every Thryv product is formulated with cutting-edge nutrition science, 
              specifically tailored for Indian bodies and lifestyles.
            </p>
          </div>

          {/* Science Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {scienceFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-[#688F4E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#688F4E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2B463C] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nutritional Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2B463C] mb-4">
              What Makes Our Formula Superior
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unlike generic protein powders, Thryv is specifically formulated for Indian nutrition needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nutritionalBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-[#F4F1E9] rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-[#688F4E] flex-shrink-0" />
                <span className="text-[#2B463C] font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-20 bg-gradient-to-br from-[#F4F1E9] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2B463C] mb-6">
                Built on Indian Nutrition Research
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-[#688F4E] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#2B463C]">Population-Specific Formula</h4>
                    <p className="text-gray-600">Designed considering Indian dietary patterns, lifestyle, and genetic factors.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Beaker className="w-6 h-6 text-[#688F4E] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#2B463C]">Clinical Testing</h4>
                    <p className="text-gray-600">Extensive testing for digestibility, absorption, and effectiveness in Indian participants.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-[#688F4E] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#2B463C]">Safety Standards</h4>
                    <p className="text-gray-600">Exceeds FSSAI standards with additional voluntary testing for heavy metals and contaminants.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#688F4E] to-[#2B463C] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Science-Based Nutrition?</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Better absorption and utilization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Optimal amino acid timing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Reduced digestive discomfort</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Enhanced muscle recovery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Long-term health benefits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#2B463C] mb-8">Certifications & Standards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['FSSAI Approved', 'ISO 22000', 'Lab Tested', 'GMP Certified'].map((cert, index) => (
              <div key={index} className="bg-[#F4F1E9] rounded-lg p-6">
                <Award className="w-12 h-12 text-[#688F4E] mx-auto mb-3" />
                <h4 className="font-semibold text-[#2B463C]">{cert}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NutritionSciencePage;
