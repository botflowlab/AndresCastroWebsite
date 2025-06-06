import React, { useState } from 'react';

export default function Publications() {
  const [selectedImage, setSelectedImage] = useState(null);

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
        <div className="hidden md:grid grid-cols-4 gap-6 auto-rows-[250px]">
          {newsImages.map((image, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(image)}
              className={`relative overflow-hidden cursor-pointer group ${
                index === 0 ? 'col-span-2 row-span-2' :
                index === 3 ? 'col-span-2' :
                index === 6 ? 'col-span-2' : ''
              }`}
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <img
                src={image}
                alt="News coverage"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {newsImages.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(image)}
              className={`relative cursor-pointer group ${
                index === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
              }`}
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <img
                src={image}
                alt="News coverage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Viewer */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Full size news coverage"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}