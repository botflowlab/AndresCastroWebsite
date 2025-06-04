import React from 'react';
import { Link } from 'react-router-dom';

function ParallaxContact() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat backdrop-blur-sm"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-cormorant leading-tight text-shadow">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl md:text-2xl mb-16 font-cormorant font-light text-shadow">
            Contáctanos.
          </p>
          <Link 
            to="/contacto" 
            className="inline-block bg-white text-black px-12 py-4 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 tracking-[.25em] uppercase"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ParallaxContact;