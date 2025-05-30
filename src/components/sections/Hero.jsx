import React from 'react';

function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0c0c0c] mb-6 opacity-100">
            Andres Castro Arquitectura
          </h1>
          <p className="text-xl md:text-2xl text-[#0c0c0c] opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards] font-light">
            Diseño y Consultoría en Arquitectura Bioclimatica Sostenible
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero