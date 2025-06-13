import React, { useState, useRef } from 'react';
import { FiArrowLeft, FiArrowRight, FiMaximize } from 'react-icons/fi';
import CachedImage from '../../components/common/CachedImage';
import { getImageUrl } from '../../utils/r2Storage';

export default function ProjectHero({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollContainerRef = useRef(null);

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

  const scrollThumbnails = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (!project?.images?.length) return null;

  return (
    <>
      <div className="w-full flex flex-col p-6">
        {/* Main Image Container */}
        <div className="relative w-full">
          {/* Mobile Square Container */}
          <div className="md:hidden relative w-full pb-[100%]">
            <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
              <CachedImage
                src={getImageUrl(project.images[currentImageIndex])}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
                loading="eager"
                showRetryButton={true}
                loadingComponent={
                  <div className="text-center text-white">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm">Loading image...</p>
                  </div>
                }
                errorComponent={
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Image not available</p>
                  </div>
                }
              />
            </div>
          </div>

          {/* Desktop Full Height Container */}
          <div className="hidden md:block relative h-[calc(100vh-8rem)]">
            <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
              <CachedImage
                src={getImageUrl(project.images[currentImageIndex])}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
                loading="eager"
                showRetryButton={true}
                loadingComponent={
                  <div className="text-center text-white">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm">Loading image...</p>
                  </div>
                }
                errorComponent={
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Image not available</p>
                  </div>
                }
              />
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 z-20"
            aria-label="View fullscreen"
          >
            <FiMaximize className="w-5 h-5" />
          </button>

          {/* Navigation Buttons */}
          {project.images.length > 1 && (
            <div className="absolute inset-x-0 bottom-1/2 flex items-center justify-between px-4 md:px-8 pointer-events-none transform translate-y-1/2">
              <button
                onClick={prevImage}
                className="pointer-events-auto border border-white bg-white/0 hover:bg-black hover:text-[#D19345] text-white p-3 md:p-5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Previous image"
              >
                <FiArrowLeft className="w-4 h-4 md:w-8 md:h-8" />
              </button>
              <button
                onClick={nextImage}
                className="pointer-events-auto border border-white bg-white/0 hover:bg-black hover:text-[#D19345] text-white p-3 md:p-5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Next image"
              >
                <FiArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation - Hidden on mobile */}
        {project.images.length > 1 && (
          <div className="hidden md:block bg-white py-8">
            <div className="max-w-8xl mx-auto px-8 relative">
              {/* Left scroll button */}
              <button
                onClick={() => scrollThumbnails('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Scroll thumbnails left"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>

              {/* Thumbnails container */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth mx-12"
                style={{ scrollBehavior: 'smooth' }}
              >
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden ${
                      currentImageIndex === index 
                        ? 'opacity-100 ring-2 ring-black' 
                        : 'opacity-50 hover:opacity-75'
                    }`}
                    style={{ width: '160px', height: '90px' }}
                    aria-label={`View image ${index + 1}`}
                  >
                    <CachedImage
                      src={getImageUrl(image)}
                      alt={`${project.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      showRetryButton={false}
                      errorComponent={
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      }
                    />
                  </button>
                ))}
              </div>

              {/* Right scroll button */}
              <button
                onClick={() => scrollThumbnails('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Scroll thumbnails right"
              >
                <FiArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white p-3 hover:text-gray-300 transition-colors z-30"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <CachedImage
              src={getImageUrl(project.images[currentImageIndex])}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
              showRetryButton={true}
              errorComponent={
                <div className="text-center text-white">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Image not available</p>
                </div>
              }
            />

            {/* Navigation in Fullscreen */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
                  aria-label="Previous image"
                >
                  <FiArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
                  aria-label="Next image"
                >
                  <FiArrowRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {project.images.length}
          </div>
        </div>
      )}
    </>
  );
}