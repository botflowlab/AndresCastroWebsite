import React from 'react';

export default function ProjectPhotos({ images }) {
  if (!images?.length) return null;

  return (
    <section className="bg-white py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className={`${
                index === 0 ? 'aspect-square lg:aspect-[4/3]' : 'aspect-[3/4]'
              }`}>
                <img
                  src={image}
                  alt={`Project photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden">
              <img
                src={image}
                alt={`Project photo ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}