import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/theArchitect/acArchitect.jpg)'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div className="max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8 leading-tight">
            MEET ANDRÉS CASTRO
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 font-light max-w-2xl mx-auto">
            The architect with over 25 years of experience.
          </p>
        </div>
      </div>
    </section>
  );
}