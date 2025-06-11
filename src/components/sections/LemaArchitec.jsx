import React from 'react';

export default function LemaArchitec() {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      {/* Full screen image */}
      <div className="absolute inset-0">
        <img
          src="/images/lemaARQUITEC.jpg"
          alt="Lema Arquitectura"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Optional content overlay - can be removed if you want just the image */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white">
          {/* You can add text here if needed, or remove this div entirely for just the image */}
        </div>
      </div>
    </section>
  );
}