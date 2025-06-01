import React from 'react';
import { Link } from 'react-router-dom';

function Cta() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-cormorant leading-tight text-shadow">
            Ready to elevate your brand?
          </h2>
          <p className="text-xl md:text-2xl mb-16 font-cormorant font-light text-shadow">
            Let's create something extraordinary together.
          </p>
          <Link 
            to="/contacto" 
            className="inline-block border-2 border-white px-12 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-[.25em] uppercase"
          >
            Let's Build Together
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cta;