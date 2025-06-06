import React from 'react';

function Testimonial() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-3xl md:text-5xl font-light mb-8 font-cormorant leading-relaxed text-shadow">
            "LA FORMA Y LA FUNCIÓN SIGUEN AL CONFORT"
          </p>
          {/* <p className="text-xl md:text-2xl font-cormorant italic">  Content
            — Andrea M., Creative Director
          </p>  */}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;