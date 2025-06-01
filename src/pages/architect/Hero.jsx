import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/5417293/pexels-photo-5417293.jpeg)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight">
            Meet Andrés Castro - The Architect
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl">
            With over two decades of experience in sustainable architecture, Andrés Castro has established himself as a leading figure in eco-friendly and bioclimatic design throughout Costa Rica.
          </p>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
      />
    </section>
  );
}