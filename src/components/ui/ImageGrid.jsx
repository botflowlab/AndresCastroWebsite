import React, { useState, useEffect } from 'react';
import ImageWithLoading from './ImageWithLoading';

export default function ImageGrid({ 
  images = [], 
  columns = 4, 
  gap = 4, 
  aspectRatio = 'aspect-square',
  onImageClick,
  className = '',
  priority = false,
  showVideoControls = false 
}) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  const handleImageError = () => {
    setErrorCount(prev => prev + 1);
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  const gapClass = `gap-${gap}`;

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Progress indicator */}
      {loadedCount < images.length && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Loading media files...</span>
            <span>{loadedCount}/{images.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(loadedCount / images.length) * 100}%` }}
            />
          </div>
          {errorCount > 0 && (
            <p className="text-xs text-red-600 mt-1">
              {errorCount} file{errorCount > 1 ? 's' : ''} failed to load
            </p>
          )}
        </div>
      )}

      {/* Image Grid */}
      <div className={`grid ${gridCols[columns]} ${gapClass}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
            onClick={() => onImageClick?.(image, index)}
          >
            <ImageWithLoading
              src={image}
              alt={`Gallery image ${index + 1}`}
              aspectRatio={aspectRatio}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              priority={priority && index < 4} // Prioritize first 4 images
              showVideoControls={showVideoControls}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        ))}
      </div>
    </div>
  );
}