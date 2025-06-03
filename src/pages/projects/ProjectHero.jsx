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
    <div className="w-full">
      {/* Main Image Container */}
      <div className="relative w-full">
        {/* 16:9 Aspect Ratio Container */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <div className="absolute inset-0 bg-black">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            
            {/* Overlay with Project Title */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="text-center text-white max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 tracking-wide">
                  {project.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                onClick={prevImage}
                className="pointer-events-auto bg-white/80 hover:bg-white text-black p-2 md:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                aria-label="Previous image"
              >
                <FiArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="pointer-events-auto bg-white/80 hover:bg-white text-black p-2 md:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                aria-label="Next image"
              >
                <FiArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Expand Button */}
            <button
              onClick={() => onOpenLightbox?.(currentImageIndex)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black p-2 md:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              aria-label="View fullscreen"
            >
              <IoExpand className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="bg-white py-4 md:py-6">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'opacity-100 ring-2 ring-black' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                style={{ width: '112px', height: '63px' }} // 16:9 ratio for thumbnails
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