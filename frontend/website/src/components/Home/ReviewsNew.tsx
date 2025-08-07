import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Award, Users } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  verified: boolean;
  productUsed: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Akshay Golccha',
      role: 'Fitness Enthusiast',
      comment: 'This is the best protein shake here in the market! After trying almost all protein brands, I found that Vitals tastes the least artificial and actually helps with my workouts.',
      rating: 5,
      verified: true,
      productUsed: 'Chocolate Protein Shake'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Working Professional',
      comment: 'Perfect for my busy lifestyle. The sachets are so convenient and the taste is amazing. Finally found a protein that doesn\'t feel like punishment!',
      rating: 5,
      verified: true,
      productUsed: 'Strawberry Sachet Pack'
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      role: 'Gym Trainer',
      comment: 'I recommend Vitals to all my clients. Clean ingredients, great taste, and actually works. The 25g protein content is perfect for muscle building.',
      rating: 5,
      verified: true,
      productUsed: 'Vanilla Protein Shake'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      role: 'Nutritionist',
      comment: 'As a nutritionist, I\'m very particular about ingredients. Vitals impressed me with their transparency and quality. No added sugar is a huge plus.',
      rating: 5,
      verified: true,
      productUsed: 'Coffee Protein Shake'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Marathon Runner',
      comment: 'Great for post-workout recovery. The variety pack helped me find my favorite flavors. Will definitely reorder.',
      rating: 5,
      verified: true,
      productUsed: 'Variety Pack'
    },
    {
      id: 6,
      name: 'Ananya Desai',
      role: 'College Student',
      comment: 'Finally a protein shake that doesn\'t break the bank and actually tastes good! Perfect for my dorm room.',
      rating: 4,
      verified: true,
      productUsed: 'Sachet Variety Pack'
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentReview]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentReview((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#2B463C] to-[#688F4E] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Quote className="w-8 h-8 text-white" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Don't Take Our Word, Take Theirs
            </h2>
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made Vitals their daily nutrition choice
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="w-6 h-6 text-white" />
                <span className="text-2xl font-bold text-white">10,000+</span>
              </div>
              <p className="text-white/80">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold text-white">4.9/5</span>
              </div>
              <p className="text-white/80">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Award className="w-6 h-6 text-white" />
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <p className="text-white/80">Would Recommend</p>
            </div>
          </div>
        </div>

        {/* Main Review Display */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/20">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-white/60 mb-6" />
              
              {/* Review Content */}
              <blockquote className="text-xl sm:text-2xl font-medium text-white mb-6 leading-relaxed">
                "{reviews[currentReview].comment}"
              </blockquote>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {renderStars(reviews[currentReview].rating)}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-bold text-white">
                      {reviews[currentReview].name}
                    </h4>
                    {reviews[currentReview].verified && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ✓ Verified
                      </div>
                    )}
                  </div>
                  <p className="text-white/80">{reviews[currentReview].role}</p>
                  <p className="text-white/60 text-sm">Used: {reviews[currentReview].productUsed}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePrev}
                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                    disabled={isAnimating}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                    disabled={isAnimating}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Review Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentReview === index
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/80 mb-6">
            Ready to join our community of satisfied customers?
          </p>
          <button className="bg-white text-[#2B463C] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
            <span>Shop Now</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
