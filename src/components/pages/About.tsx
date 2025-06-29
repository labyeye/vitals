import React from 'react';
import { Leaf, Globe, Zap, Award, Shield, Heart } from 'lucide-react';
import Header from '../Header';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] bg-clip-text text-transparent">
              Our Story
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From classrooms in the UK to building a protein revolution in India
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#2B463C] mb-4">Why We Started Vital</h3>
              <p className="text-gray-600 mb-4">
                We're three friends - Kushagra, Harsh, and Milan - who crossed paths in the UK but found our purpose back home in India.
              </p>
              <p className="text-gray-600 mb-4">
                What bonded us, beyond late-night assignments and endless coffees, was a shared amazement at how embedded fitness was in everyday British life. Walk into any store and you'd find rows of high-quality protein shakes, bars, and healthy snacks — all easily accessible, affordable, and normalized.
              </p>
              <p className="text-gray-600">
                Compare that to India, where fitness still feels like a "phase" for most, not a foundation. That contrast stuck with us and Vital was born from that vision.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#B1D182] to-[#688F4E] rounded-2xl p-1">
              <div className="bg-white/90 rounded-xl p-6 h-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#688F4E]/10 rounded-xl p-4 flex flex-col items-center text-center">
                    <Leaf className="w-8 h-8 text-[#688F4E] mb-2" />
                    <h4 className="font-semibold text-[#2B463C]">Clean Ingredients</h4>
                    <p className="text-sm text-gray-600">No artificial additives</p>
                  </div>
                  <div className="bg-[#688F4E]/10 rounded-xl p-4 flex flex-col items-center text-center">
                    <Globe className="w-8 h-8 text-[#688F4E] mb-2" />
                    <h4 className="font-semibold text-[#2B463C]">Made in India</h4>
                    <p className="text-sm text-gray-600">Proudly homegrown</p>
                  </div>
                  <div className="bg-[#688F4E]/10 rounded-xl p-4 flex flex-col items-center text-center">
                    <Zap className="w-8 h-8 text-[#688F4E] mb-2" />
                    <h4 className="font-semibold text-[#2B463C]">Ready to Drink</h4>
                    <p className="text-sm text-gray-600">Convenient nutrition</p>
                  </div>
                  <div className="bg-[#688F4E]/10 rounded-xl p-4 flex flex-col items-center text-center">
                    <Award className="w-8 h-8 text-[#688F4E] mb-2" />
                    <h4 className="font-semibold text-[#2B463C]">Quality Tested</h4>
                    <p className="text-sm text-gray-600">Rigorously verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#2B463C] mb-8 text-center">Meet The Founders</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#B1D182] to-[#688F4E] rounded-xl p-1 mb-4">
                <div className="bg-white rounded-lg h-64 w-full flex items-center justify-center">
                  <span className="text-[#2B463C] font-bold">Kushagra Saboo Photo</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-[#2B463C] mb-2">Kushagra Saboo</h4>
              <p className="text-gray-600 mb-4">University College London</p>
              <p className="text-gray-600">
                A fitness enthusiast committed to clean eating and a vegetarian diet, he knew that performance didn't stop at the gym. It started with nutrition.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#B1D182] to-[#688F4E] rounded-xl p-1 mb-4">
                <div className="bg-white rounded-lg h-64 w-full flex items-center justify-center">
                  <span className="text-[#2B463C] font-bold">Milan Koolwaal Photo</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-[#2B463C] mb-2">Milan Koolwaal</h4>
              <p className="text-gray-600 mb-4">University of Manchester</p>
              <p className="text-gray-600">
                A self-proclaimed foodie who transformed his own health through nutrition and fitness, bringing a perspective of balance and consistency.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#B1D182] to-[#688F4E] rounded-xl p-1 mb-4">
                <div className="bg-white rounded-lg h-64 w-full flex items-center justify-center">
                  <span className="text-[#2B463C] font-bold">Harsh Agarwal Photo</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-[#2B463C] mb-2">Harsh Agarwal</h4>
              <p className="text-gray-600 mb-4">University of Manchester</p>
              <p className="text-gray-600">
                While studying at the University of Manchester, he developed a sharp eye for patterns — not just in numbers, but in people, behavior, and the gaps between what consumers want and what markets offer. While most saw protein shakes as just another F&B trend, Harsh saw something else: a broken system.
A system where nutrition is either overpriced, underwhelming, or stuck in gym-bro culture. Where healthy eating feels like a task instead of a lifestyle. Where most Indian consumers — busy, ambitious, working-class and middle-class alike — are left out of the conversation entirely.
Harsh didn’t come from a fitness-first background. He came from a logic-first one. But when the three co-founders started digging into India’s protein problem, it clicked — and he became obsessed with building a solution that wasn’t just cool, but scalable.
At Vital, Harsh is the engine behind the scenes — streamlining supply chains, forecasting demand curves, and turning vision into execution. Because fixing a nation’s protein problem isn’t just about taste and marketing. It’s about building a system that works, bottle after bottle.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F4F1E9] to-[#B1D182]/20 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-[#2B463C] mb-4">Our Vision</h3>
              <p className="text-gray-600">
                With clean, convenient, and powerful nutrition made for modern Indian lives — because staying fit shouldn't be a luxury.
              </p>
            </div>
            <div className="md:w-1/2 bg-white/80 rounded-xl p-6 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-[#688F4E] animate-pulse" />
                <span className="text-lg font-semibold text-[#2B463C]">
                  Building a healthier India, one bottle at a time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;