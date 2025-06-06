import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const images = [
    '/images/home/acHero1.jpg',
    '/images/home/acHero3.jpg',
    '/images/home/acHero4.jpg'
  ];

  return (
    <section className="relative w-full h-screen">
      {/* Desktop Layout - 3 columns */}
      <div className="hidden md:flex h-full">
        {images.map((image, index) => (
          <div 
            key={index}
            className="w-1/3 h-full relative overflow-hidden"
          >
            <img
              src={image}
              alt={`Architectural design ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-all duration-300"></div>
            {/* Vertical separating line */}
            {index < images.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/80 z-10"></div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout - Single image */}
      <div className="md:hidden h-full">
        <div className="relative h-full overflow-hidden">
          <img
            src={images[0]}
            alt="Architectural design"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            ANDRÉS CASTRO ARCHITECTURE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-8">
            Diseño y Consultoría en Arquitectura Bioclimatica Sostenible
          </p>
          <Link 
            to="/client-dashboard"
            className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-white/90 transition-all duration-300"
          >
            Client Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;