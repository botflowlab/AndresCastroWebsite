import React, { useState } from 'react';

export default function ProjectCard({ title, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Function to get the correct image URL with multiple fallback strategies
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/images/placeholder.jpg';
    
    // If it's already a full URL (starts with http), use it as-is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it's a relative path, use it directly
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    // If it's just a filename, try to construct R2 URL
    const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;
    if (R2_PUBLIC_URL && R2_PUBLIC_URL !== 'undefined' && R2_PUBLIC_URL.trim() !== '') {
      // Clean the URL - remove any trailing slashes
      const cleanR2Url = R2_PUBLIC_URL.replace(/\/$/, '');
      // Clean the filename - remove leading slashes
      const cleanFilename = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
      return `${cleanR2Url}/${cleanFilename}`;
    }
    
    // Fallback to local images
    return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  };

  const imageUrl = getImageUrl(image);

  const handleImageError = () => {
    setImageError(true);
    console.warn('Failed to load image:', {
      originalUrl: image,
      processedUrl: imageUrl,
      R2_PUBLIC_URL: import.meta.env.VITE_R2_PUBLIC_URL
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('Successfully loaded image:', imageUrl);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative bg-gray-100">
        {!imageError ? (
          <img 
            src={imageUrl} 
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
                Original: {image}
              </p>
              <p className="text-xs text-gray-400 break-all">
                Processed: {imageUrl}
              </p>
              <p className="text-xs text-red-500 mt-2">
                Check R2 bucket public access settings
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