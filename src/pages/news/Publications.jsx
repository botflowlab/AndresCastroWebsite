import React from 'react';

export default function Publications() {
  const newsImages = [
    '/images/news/1.jpg',
    '/images/news/3.jpg',
    '/images/news/11.jpg',
    '/images/news/17.jpg',
    '/images/news/25.jpg',
    '/images/news/44.jpg',
    '/images/news/45.jpg',
    '/images/news/57.jpg'
  ];

  return (
    <section className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-wider">
          PUBLICATIONS & PRESS
        </h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-[300px]">
          {newsImages.map((image, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] ${
                index === 0 ? 'col-span-2 row-span-2' :
                index === 3 ? 'col-span-2' :
                index === 6 ? 'col-span-2' : ''
              }`}
            >
              <img
                src={image}
                alt="News coverage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Mobile Grid - Show only first 4 images */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {newsImages.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`relative aspect-square overflow-hidden ${
                index === 0 ? 'col-span-2' : ''
              }`}
            >
              <img
                src={image}
                alt="News coverage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}