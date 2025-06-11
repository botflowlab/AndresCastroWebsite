import React, { useState } from 'react';
import { normalizeImageUrl, testImageUrl } from '../../utils/r2Storage';

export default function ProjectCard({ title, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState('');

  // Function to get the correct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/images/placeholder.jpg';
    
    // Use the normalizeImageUrl function from r2Storage
    return normalizeImageUrl(imageUrl);
  };

  React.useEffect(() => {
    const setupImage = async () => {
      if (!image) {
        setFinalImageUrl('/images/placeholder.jpg');
        return;
      }

      const normalizedUrl = getImageUrl(image);
      console.log('ProjectCard - Original URL:', image);
      console.log('ProjectCard - Normalized URL:', normalizedUrl);
      
      // Test if the image is accessible
      const isAccessible = await testImageUrl(normalizedUrl);
      
      if (isAccessible) {
        setFinalImageUrl(normalizedUrl);
      } else {
        console.warn('Image not accessible, using placeholder:', normalizedUrl);
        setFinalImageUrl('/images/placeholder.jpg');
        setImageError(true);
      }
    };

    setupImage();
  }, [image]);

  const handleImageError = () => {
    console.error('Failed to load image:', {
      originalUrl: image,
      finalUrl: finalImageUrl,
      title: title
    });
    setImageError(true);
    setFinalImageUrl('/images/placeholder.jpg');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('Successfully loaded image:', finalImageUrl);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative bg-gray-100">
        {!imageError && finalImageUrl ? (
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
              <p className="text-xs text-gray-400 mt-1">
                Check R2 configuration
              </p>
            </div>
          </div>
        )}
        {!imageLoaded && !imageError && finalImageUrl && (
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