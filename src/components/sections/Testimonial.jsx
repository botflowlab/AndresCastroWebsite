import React from 'react';
import ImageGalleryHome from './ImageGalleryHome';

function Testimonial() {
  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat backdrop-blur-md shadow-sm"
          style={{
            backgroundImage: 'url(/images/theArchitect/acCta2.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative container mx-auto px-4 backdrop-blur-md shadow-sm">
          <div className="max-w-6xl mx-auto text-center text-white">
            <p className="text-3xl md:text-5xl font-light mb-8 font-cormorant leading-relaxed text-shadow">
              "LA FORMA Y LA FUNCIÓN SIGUEN AL CONFORT"
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonial;