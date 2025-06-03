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
    <div className="min-h-screen flex flex-col">
      {/* Main Image Section */}
      <div className="relative h-[100svh]">
        <img
          src={project.images[currentImageIndex]}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Overlay with Project Title */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-4 tracking-wide">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto">
              {project.description}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 left-4 right-4 md:inset-y-0 md:left-8 md:right-8 flex md:items-center justify-between pointer-events-none">
          <button
            onClick={prevImage}
            className="bg-white/80 hover:bg-white p-2 md:p-4 rounded-full shadow-lg transition-all duration-300 pointer-events-auto"
            aria-label="Previous image"
          >
            <FiArrowLeft className="text-xl md:text-2xl" />
          </button>
          <button
            onClick={nextImage}
            className="bg-white/80 hover:bg-white p-2 md:p-4 rounded-full shadow-lg transition-all duration-300 pointer-events-auto"
            aria-label="Next image"
          >
            <FiArrowRight className="text-xl md:text-2xl" />
          </button>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => onOpenLightbox?.(currentImageIndex)}
          className="absolute top-4 right-4 md:bottom-8 md:top-auto md:right-8 bg-white/80 hover:bg-white p-2 md:p-4 rounded-full shadow-lg transition-all duration-300"
          aria-label="View fullscreen"
        >
          <IoExpand className="text-xl md:text-2xl" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="bg-white py-4 md:py-8">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 w-20 h-16 md:w-32 md:h-24 transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'opacity-100 ring-2 ring-black' 
                    : 'opacity-50 hover:opacity-75'
                }`}
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