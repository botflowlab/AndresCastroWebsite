import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-white">
      {/* Background Image
      <div 
        className="absolute inset-0 bg-center bg-cover bg-white"
        style={{
          backgroundImage: '',
        }}
      > 

        <div className="absolute inset-0 bg-black/40"></div>
      </div> */}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-black font-bold mb-6 leading-tight">
            MEET ANDRÉS CASTRO
          </h1>
          <p className="text-xl md:text-2xl text-blakc/90 font-light max-w-2xl mx-auto">
            The architect with 25 years of experience.
          </p>
        </div>
      </div>
    </section>
  );
}