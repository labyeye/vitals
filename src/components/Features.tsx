import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, 
  Zap, 
  Heart, 
  Leaf, 
  Award, 
  Clock, 
  Target, 
  Sparkles,
  CheckCircle,
  Globe
} from 'lucide-react';

const Features: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Target,
      title: '25g Complete Protein',
      description: 'All essential amino acids for optimal muscle recovery and growth',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      icon: Heart,
      title: 'No Added Sugar',
      description: 'Less than 200 calories with natural sweetness and zero guilt',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50'
    },
    {
      icon: Shield,
      title: 'Preservative Free',
      description: 'Clean, transparent ingredients with no artificial additives',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Leaf,
      title: 'Gut Health Support',
      description: 'Enhanced with prebiotics for digestive wellness',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50'
    },
    {
      icon: Zap,
      title: 'Ready to Drink',
      description: 'No scooping, no mixing, no cleanup - just grab and go',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      icon: Clock,
      title: 'Shelf Stable',
      description: 'Travel-friendly and no refrigeration needed until opened',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50'
    },
    {
      icon: Award,
      title: 'Quality Tested',
      description: 'Rigorously tested for purity, potency, and safety standards',
      color: 'from-amber-500 to-yellow-600',
      bgColor: 'from-amber-50 to-yellow-50'
    },
    {
      icon: Globe,
      title: 'Made in India',
      description: 'Scientifically formulated specifically for Indian bodies',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  const benefits = [
    { text: 'Supports muscle recovery and growth', icon: CheckCircle },
    { text: 'Boosts energy and reduces fatigue', icon: CheckCircle },
    { text: 'Convenient nutrition for busy lifestyles', icon: CheckCircle },
    { text: 'Promotes better snacking choices', icon: CheckCircle },
    { text: 'Supports weight management goals', icon: CheckCircle },
    { text: 'Enhances workout performance', icon: CheckCircle }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleFeatures(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = featuresRef.current?.querySelectorAll('[data-index]');
    featureElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-[#B1D182]/30 rounded-full px-6 py-3 mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-[#688F4E]" />
            <span className="text-sm font-semibold text-[#2B463C]">Why Choose Vital</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] bg-clip-text text-transparent">
              Scientifically Formulated
            </span>
            <br />
            <span className="text-[#2B463C]">For Your Success</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every bottle is crafted with precision, backed by science, and designed to fuel your ambitions. 
            Here's what makes Vital different from the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleFeatures.includes(index);
            
            return (
              <div
                key={index}
                data-index={index}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-700 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } hover:-translate-y-2 hover:scale-105`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon Background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#2B463C] mb-3 group-hover:text-[#688F4E] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#688F4E]/5 to-[#B1D182]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-[#2B463C] mb-4">
                  Transform Your Health Journey
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're powering through workouts, managing a busy schedule, or simply 
                  wanting to make better nutrition choices, Vital is designed to support every step 
                  of your wellness journey.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-3 group cursor-pointer"
                      style={{
                        animation: `fadeInLeft 0.6s ease-out ${index * 100}ms forwards`
                      }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#688F4E] to-[#B1D182] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 group-hover:text-[#2B463C] transition-colors duration-300">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6">
                <button className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                  <span className="flex items-center space-x-2">
                    <span>Start Your Journey</span>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-[#2B463C] mb-2">25g</div>
                  <div className="text-sm text-gray-600">Complete Protein</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-[#2B463C] mb-2">&lt;200</div>
                  <div className="text-sm text-gray-600">Calories Only</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-[#2B463C] mb-2">0g</div>
                  <div className="text-sm text-gray-600">Added Sugar</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-[#2B463C] mb-2">100%</div>
                  <div className="text-sm text-gray-600">Natural</div>
                </div>
              </div>

              {/* Indian Flag */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="w-8 h-6 bg-gradient-to-b from-orange-500 via-white via-50% to-green-500 rounded-sm shadow-md"></div>
                  <span className="font-bold text-[#2B463C]">Made in India</span>
                </div>
                <p className="text-sm text-gray-600">
                  Formulated specifically for Indian bodies and dietary preferences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Features;