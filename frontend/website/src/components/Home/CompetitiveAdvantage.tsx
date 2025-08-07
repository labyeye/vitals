import React from 'react';
import { Check, X, Award, Star } from 'lucide-react';

const CompetitiveAdvantage: React.FC = () => {
  const comparisonData = [
    {
      feature: "Protein Content",
      thryv: "25g complete protein",
      competitor: "10-18g protein",
      thryvAdvantage: true
    },
    {
      feature: "Sugar Content",
      thryv: "No added sugar",
      competitor: "Added sugars",
      thryvAdvantage: true
    },
    {
      feature: "Convenience",
      thryv: "Ready-to-drink + Sachets",
      competitor: "Limited formats",
      thryvAdvantage: true
    },
    {
      feature: "Price per gram protein",
      thryv: "₹5.96 per gram",
      competitor: "₹8+ per gram",
      thryvAdvantage: true
    },
    {
      feature: "Flavor Options",
      thryv: "4 premium flavors",
      competitor: "Multiple but artificial",
      thryvAdvantage: true
    },
    {
      feature: "Clean Ingredients",
      thryv: "GMO-free, natural",
      competitor: "Processed ingredients",
      thryvAdvantage: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-[#688F4E] mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Why Choose <span className="text-[#688F4E]">Thryv</span> Over Others?
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just compete, we lead. Here's how Thryv outperforms the competition in every aspect that matters.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-green-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#688F4E]/20">
                  <th className="text-left py-6 px-4 text-lg font-bold text-gray-900">Feature</th>
                  <th className="text-center py-6 px-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#688F4E] rounded-full flex items-center justify-center mb-2">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-lg font-bold text-[#688F4E]">Thryv</span>
                    </div>
                  </th>
                  <th className="text-center py-6 px-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-2">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-lg font-bold text-gray-600">Competitors</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-green-50/50 transition-colors">
                    <td className="py-6 px-4 font-semibold text-gray-900">{item.feature}</td>
                    <td className="py-6 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <Check className="w-6 h-6 text-[#688F4E] flex-shrink-0" />
                        <span className="font-medium text-[#688F4E]">{item.thryv}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <span className="font-medium text-gray-600">{item.competitor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Advantages */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-[#688F4E] to-[#2B463C] rounded-2xl text-white">
            <div className="text-4xl font-bold mb-2">25g</div>
            <div className="text-lg font-semibold mb-2">Complete Protein</div>
            <div className="text-sm opacity-90">vs 10-18g in competitors</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
            <div className="text-4xl font-bold mb-2">₹149</div>
            <div className="text-lg font-semibold mb-2">Best Value</div>
            <div className="text-sm opacity-90">vs ₹200+ for similar quality</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
            <div className="text-4xl font-bold mb-2">0g</div>
            <div className="text-lg font-semibold mb-2">Added Sugar</div>
            <div className="text-sm opacity-90">vs sugar-loaded alternatives</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-[#688F4E] rounded-2xl p-8 text-white inline-block">
            <h3 className="text-2xl font-bold mb-4">Experience the Thryv Advantage Today</h3>
            <p className="text-lg mb-6 opacity-90">Join the protein revolution with superior quality and unbeatable value</p>
            <button className="bg-white text-[#688F4E] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              Shop Now & Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantage;
