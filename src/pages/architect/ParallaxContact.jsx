import React from 'react';
import { Link } from 'react-router-dom';

export default function ParallaxContact() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat filter blur-sm"
        style={{
          backgroundImage: 'url(/images/acContact.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-cormorant leading-tight">
            Let's Create Something Extraordinary Together
          </h2>
          <p className="text-xl md:text-2xl mb-16 font-cormorant font-light">
            Transform your vision into reality with sustainable architecture
          </p>
          <Link 
            to="/contacto" 
            className="inline-block border-2 border-white px-12 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-[.25em] uppercase"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}