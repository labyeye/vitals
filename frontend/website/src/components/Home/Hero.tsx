import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroService, { Hero } from "../../services/heroService";

const HeroComponent: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        setLoading(true);
        const heroData = await heroService.getActiveHeroes();
        setHeroes(heroData);
        setError('');
      } catch (err: any) {
        console.error('Failed to fetch heroes:', err);
        setError('Failed to load hero slides');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  useEffect(() => {
    if (heroes.length > 0) {
      setIsVisible(true);
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroes.length);
      }, heroes[currentSlide]?.animationDuration || 4000);
      return () => clearInterval(interval);
    }
  }, [heroes, currentSlide]);

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </section>
    );
  }

  if (error || heroes.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error || 'No Hero Slides Available'}
          </h2>
          <p className="text-gray-600">
            {error ? 'Please try again later.' : 'Please check back soon for updates.'}
          </p>
        </div>
      </section>
    );
  }

  const currentHero = heroes[currentSlide];

  return (
    <section
      id="home"
      className="relative h-[95vh] sm:h-[95vh] md:h-[100vh] lg:h-[100vh] xl:h-[100vh] 2xl:h-[100vh] min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden mt-35"
    >
      <div className="absolute inset-0 w-full h-full">
        {heroes.map((hero, index) => (
          <div
            key={hero._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={hero.image.url}
              alt={hero.image.alt}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
              }}
            />
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              style={{ color: currentHero?.textColor || '#ffffff' }}
            >
              {currentHero?.title}
            </h1>
            
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 leading-relaxed"
              style={{ color: currentHero?.textColor || '#ffffff' }}
            >
              {currentHero?.subtitle}
            </p>

            {currentHero?.description && (
              <p 
                className="text-xs sm:text-sm md:text-base opacity-80 leading-relaxed"
                style={{ color: currentHero?.textColor || '#ffffff' }}
              >
                {currentHero.description}
              </p>
            )}

            {currentHero?.ctaButton.enabled && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href={currentHero.ctaButton.link}
                  className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {currentHero.ctaButton.text}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {heroes.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroComponent;
