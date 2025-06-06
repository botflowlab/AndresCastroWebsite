import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0c0c0c] mb-6 opacity-100">
            ANDRÉS CASTRO ARCHITECTURE
          </h1>
          <p className="text-xl md:text-2xl text-[#0c0c0c] opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards] font-light mb-8">
            Diseño y Consultoría en Arquitectura Bioclimatica Sostenible
          </p>
          <Link 
            to="/client-dashboard"
            className="inline-block bg-[#0c0c0c] text-white px-8 py-3 rounded-md hover:bg-black/80 transition-all duration-300"
          >
            Client Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;