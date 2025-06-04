import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { IoExpand } from 'react-icons/io5';

export default function ProjectHero({ project, onOpenLightbox }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (project?.images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (project?.images?.length || 0) - 1 : prev - 1
    );
  };

  if (!project?.images?.length) return null;

  return (
    <div className="w-full flex flex-col mt-20 p-6">
      {/* Main Image Container */}
      <div className="relative w-full">
        {/* Mobile Square Container */}
        <div className="md:hidden relative w-full pb-[100%]">
          <div className="absolute inset-0 bg-black">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Desktop Full Height Container */}
        <div className="hidden md:block relative h-[calc(100vh-8rem)]">
          <div className="absolute inset-0 bg-black">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 bottom-1/2 flex items-center justify-between px-4 md:px-8 pointer-events-none transform translate-y-1/2">
          <button
            onClick={prevImage}
            className="pointer-events-auto bg-white/90 hover:bg-white text-black p-3 md:p-5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Previous image"
          >
            <FiArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={nextImage}
            className="pointer-events-auto bg-white/90 hover:bg-white text-black p-3 md:p-5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Next image"
          >
            <FiArrowRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      {/* Thumbnail Navigation - Hidden on mobile */}
      <div className="hidden md:block bg-white py-8">
        <div className="max-w-8xl mx-auto px-8">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'opacity-100 ring-2 ring-white' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                style={{ width: '160px', height: '90px' }}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${project.title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}