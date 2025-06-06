import React from 'react';

export default function ImageGallery() {
  const images = [
    '/images/theArchitect/gallery1.jpg',
    '/images/theArchitect/gallery2.jpg',
    '/images/theArchitect/gallery3.jpg'
  ];

  return (
    <section className="w-full h-screen flex flex-col md:flex-row">
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
        </div>
      ))}
    </section>
  );
}