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
      <div className="relative h-screen">
        <img
          src={project.images[currentImageIndex]}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with Project Title */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-light mb-4">{project.title}</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto px-4">
              {project.description}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <FiArrowLeft className="text-2xl" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <FiArrowRight className="text-2xl" />
        </button>

        {/* Expand Button */}
        <button
          onClick={() => onOpenLightbox(currentImageIndex)}
          className="absolute bottom-8 right-8 bg-white/80 hover:bg-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <IoExpand className="text-2xl" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="bg-white py-8">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 w-32 h-24 transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'opacity-100 ring-2 ring-black' 
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}