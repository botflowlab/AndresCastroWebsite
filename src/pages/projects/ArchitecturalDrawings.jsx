import React, { useState, useRef } from 'react';
import { FiArrowLeft, FiArrowRight, FiMaximize } from 'react-icons/fi';

export default function ArchitecturalDrawings({ project }) {
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const scrollContainerRef = useRef(null);

  // Get blueprints from the project
  const drawings = project?.blueprints || [];

  // If no drawings, don't render the section
  if (!drawings || drawings.length === 0) {
    return null;
  }

  const scrollSlideshow = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section className="py-16 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-wider text-[#0c0c0c]">
              ARCHITECTURAL DRAWINGS
            </h2>
            <div className="w-24 h-1 bg-[#0c0c0c] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technical drawings and blueprints showcasing the detailed design process
            </p>
          </div>

          {/* Horizontal Slideshow */}
          <div className="relative">
            {/* Left Navigation Button */}
            <button
              onClick={() => scrollSlideshow('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <FiArrowLeft className="w-6 h-6 text-[#0c0c0c]" />
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={() => scrollSlideshow('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <FiArrowRight className="w-6 h-6 text-[#0c0c0c]" />
            </button>

            {/* Slideshow Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 px-12 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {drawings.map((drawing, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{ width: '320px' }}
                  onClick={() => setSelectedDrawing({ 
                    image: drawing, 
                    title: `Technical Drawing ${index + 1}`, 
                    description: 'Architectural blueprint and technical specifications' 
                  })}
                >
                  {/* Drawing Card */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={drawing}
                        alt={`Architectural drawing ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 p-3 rounded-full">
                          <FiMaximize className="w-6 h-6 text-[#0c0c0c]" />
                        </div>
                      </div>

                      {/* Drawing Number Badge */}
                      <div className="absolute top-4 left-4 bg-[#0c0c0c] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-2 text-[#0c0c0c]">
                        Drawing {index + 1}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Technical architectural drawing with detailed specifications
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drawing Count Indicator */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              {drawings.length} Technical Drawing{drawings.length !== 1 ? 's' : ''} Available
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {selectedDrawing && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDrawing(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white p-3 hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full hover:bg-black/70"
            onClick={() => setSelectedDrawing(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image Container */}
          <div className="max-h-[90vh] max-w-[90vw] flex flex-col items-center">
            <img
              src={selectedDrawing.image}
              alt={selectedDrawing.title}
              className="max-h-[80vh] max-w-full object-contain mb-6 rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="text-white text-center bg-black/50 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-2">{selectedDrawing.title}</h3>
              <p className="text-gray-300 text-sm">{selectedDrawing.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}