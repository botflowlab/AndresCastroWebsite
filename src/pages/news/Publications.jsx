import React, { useState } from 'react';

export default function Publications() {
  const [selectedImage, setSelectedImage] = useState(null);

  const newsImages = [
    '/images/news/1.jpg',
    '/images/news/3.jpg',
    '/images/news/11.jpg',
    '/images/news/17.jpg'
  ];

  return (
    <section className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {newsImages.map((image, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(image)}
              className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
            >
              <img
                src={image}
                alt="News coverage"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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