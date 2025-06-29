import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      comment: 'The quality of the plants exceeded my expectations. My garden has never looked better!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Landscaper',
      comment: 'Great variety and healthy plants. My clients are always happy with the selections.',
      rating: 4
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Plant Enthusiast',
      comment: 'Excellent customer service and the plants arrived in perfect condition. Will order again!',
      rating: 5
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Interior Designer',
      comment: 'Perfect plants for office spaces. They thrive indoors and look beautiful year-round.',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 1500);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-[#2B463C] mb-12">
        What Our Customers Say
      </h2>
      
      <div className="relative h-64">
        {reviews.map((review, index) => (
          <div 
            key={review.id}
            className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-2xl w-full h-full flex flex-col">
              <Quote className="w-8 h-8 text-[#688F4E] mb-4" />
              <p className="text-gray-700 italic mb-6 flex-grow">"{review.comment}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#2B463C]">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#688F4E]' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-[#688F4E] hover:text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-[#688F4E] hover:text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Reviews;