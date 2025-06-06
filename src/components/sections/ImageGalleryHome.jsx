import React from 'react';

export default function ImageGalleryHome() {
  const images = [
    '/images/home/acHero1.jpg',
    '/images/home/acHero3.jpg',
    '/images/home/gallery3.jpg'
  ];

  return (
    <section className="w-full h-screen flex flex-col md:flex-row relative">
      {images.map((image, index) => (
        <div 
          key={index}
          className="w-full md:w-1/3 h-1/3 md:h-full relative overflow-hidden"
        >
          <img
            src={image}
            alt={`Architectural design ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-all duration-300"></div>
          {/* Vertical line for desktop */}
          {index < images.length - 1 && (
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[1px] bg-white/80 z-10"></div>
          )}
          {/* Horizontal line for mobile */}
          {index < images.length - 1 && (
            <div className="md:hidden absolute left-0 right-0 bottom-0 h-[1px] bg-white/80 z-10"></div>
          )}
        </div>
      ))}
    </section>
  );
}