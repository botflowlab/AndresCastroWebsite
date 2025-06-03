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
      {/* Main Hero Image */}
      <div className="relative h-screen w-full">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl md:text-2xl font-light">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="bg-white py-8">
        <div className="max-w-8xl mx-auto px-4">
          <div className="relative">
            {/* Main Carousel Image */}
            <div className="aspect-[16/9] relative group cursor-pointer mb-4"
                 onClick={() => onOpenLightbox(currentImageIndex)}>
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <IoExpand className="text-white text-4xl" />
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-24 transition-opacity duration-300 ${
                    currentImageIndex === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'
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

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <FiArrowLeft className="text-2xl" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <FiArrowRight className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}