import React, { useState } from 'react';
import { getImageUrl } from '../../utils/r2Storage';

export default function ProjectCard({ title, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get the final image URL
  const finalImageUrl = getImageUrl(image);

  const handleImageError = () => {
    console.error('❌ Image failed:', {
      original: image,
      final: finalImageUrl,
      title: title
    });
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('✅ Image loaded:', finalImageUrl);
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
            onLoad={handleImageLoad}
            onError={handleImageError}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-red-100 border-2 border-red-300">
            <div className="text-center text-red-600 p-4">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm font-bold">IMAGE FAILED</p>
              <p className="text-xs mt-1 break-all">
                Original: {image}
              </p>
              <p className="text-xs mt-1 break-all">
                Final: {finalImageUrl}
              </p>
              <p className="text-xs mt-2 font-bold">
                Check console for details
              </p>
            </div>
          </div>
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-blue-100 animate-pulse flex items-center justify-center">
            <div className="text-blue-600 font-bold">LOADING IMAGE...</div>
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-black font-bold py-2 text-xl uppercase">
        {title}
      </div>
    </div>
  );
}