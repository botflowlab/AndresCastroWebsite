import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Hero() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/home/acHero2.jpg',
    '/images/home/acHero5.jpg',
    '/images/home/acHero6.jpg',
    '/images/home/acHero4.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 tracking-wider leading-tight">
            ANDRÉS CASTRO<br />ARCHITECTURE
          </h1>
          <p className="text-xl md:text-3xl text-white opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards] font-light mb-12 tracking-widest">
            Diseño y Consultoría en Arquitectura Bioclimatica Sostenible
          </p>

          {/* CTA Button */}
          <Link 
            to="/proyectos"
            className="inline-block border-2 border-white px-12 py-4 text-lg font-medium text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest"
          >
            VIEW PROJECTS
          </Link>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
        <span className="text-sm tracking-widest mb-2">SCROLL</span>
        <div className="w-px h-16 bg-white/50 relative">
          <div className="absolute top-0 w-full h-1/3 bg-white animate-[fadeIn_1s_ease-in_infinite]"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;