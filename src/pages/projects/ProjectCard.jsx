import React, { useState } from 'react';
import { getImageUrl } from '../../utils/r2Storage';

export default function ProjectCard({ title, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get the final image URL using our simple function
  const finalImageUrl = getImageUrl(image);

  const handleImageError = () => {
    console.error('❌ Image failed to load:', {
      originalUrl: image,
      finalUrl: finalImageUrl,
      title: title
    });
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('✅ Image loaded successfully:', finalImageUrl);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative bg-gray-100">
        {!imageError ? (
          <img 
            src={finalImageUrl} 
            alt={title} 
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-125 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-500 p-4">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">Image not available</p>
              <p className="text-xs text-gray-400 mt-1 break-all">
                URL: {finalImageUrl}
              </p>
            </div>
          </div>
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-[0c0c0c] font-bold bg-blur py-2 text-xl text-bold uppercase">
        {title}
      </div>
    </div>
  );
}