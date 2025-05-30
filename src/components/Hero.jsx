import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
              Andres Castro Arquitectura
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards]">
              Diseño y Consultoría en Arquitectura Bioclimatica Sostenible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;