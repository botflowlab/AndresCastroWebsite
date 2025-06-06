import React, { useState } from 'react';

function NewsSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    '/images/news/1.jpg',
    '/images/news/3.jpg',
    '/images/news/11.jpg',
    '/images/news/17.jpg'
  ];

  return (
    <section className="py-32 bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/concrete1.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-light mb-8">
            LATEST NEWS
          </h2>
          <div className="w-32 h-1 bg-[#0c0c0c] mx-auto"></div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(image)}
              className="aspect-[4/3] overflow-hidden cursor-pointer group"
            >
              <img
                src={image}
                alt={`News ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              alt="Full size news"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;