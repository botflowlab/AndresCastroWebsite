import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/home/acHero2.jpg',
    '/images/home/acHero5.jpg',
    '/images/home/ac1.jpg',
    '/images/home/acHero6.jpg',
  ];

  const startSlideshow = useCallback(() => {
    return setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);
  }, [images.length]);

  useEffect(() => {
    const timer = startSlideshow();
    return () => clearInterval(timer);
  }, [startSlideshow]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
    // Clear existing interval and start a new one
    clearInterval(startSlideshow());
    startSlideshow();
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-100">
            ANDRÉS CASTRO ARCHITECTURE
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards] font-light mb-12">
            Diseño y Consultoría en Arquitectura Bioclimatica Sostenible
          </p>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;