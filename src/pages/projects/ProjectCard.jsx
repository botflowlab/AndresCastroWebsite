import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl } from '../../utils/r2Storage';

export default function ProjectCard({ title, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [finalUrl, setFinalUrl] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const mountedRef = useRef(true);
  const imageRef = useRef(null);

  // Detect Safari
  const isSafari = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('firefox');
  };

  // Process URL once when component mounts or image prop changes
  useEffect(() => {
    mountedRef.current = true;
    setImageLoaded(false);
    setImageError(false);
    setRetryCount(0);
    
    const processedUrl = getImageUrl(image);
    setFinalUrl(processedUrl);
    
    console.log('🎯 ProjectCard URL processed:', {
      title,
      original: image,
      processed: processedUrl,
      isSafari: isSafari()
    });

    return () => {
      mountedRef.current = false;
    };
  }, [image, title]);

  // Safari-specific retry mechanism
  const handleImageError = async (event) => {
    if (!mountedRef.current) return;
    
    console.error('❌ ProjectCard image failed:', {
      title,
      original: image,
      processed: finalUrl,
      retryCount,
      userAgent: navigator.userAgent.substring(0, 50),
      errorType: event?.target?.error || 'Unknown'
    });
    
    // For Safari, try multiple retry strategies
    if (isSafari() && retryCount < 3) {
      console.log(`🔄 Safari retry ${retryCount + 1}/3 for:`, title);
      
      setTimeout(() => {
        if (mountedRef.current) {
          setRetryCount(prev => prev + 1);
          setImageError(false);
          setImageLoaded(false);
          
          // Generate new URL with different cache-busting
          const baseUrl = image;
          const newUrl = getImageUrl(baseUrl);
          setFinalUrl(newUrl);
        }
      }, 1000 * (retryCount + 1)); // Increasing delay: 1s, 2s, 3s
      
      return;
    }
    
    setImageError(true);
  };

  const handleImageLoad = () => {
    if (!mountedRef.current) return;
    
    setImageLoaded(true);
    setImageError(false);
    console.log('✅ ProjectCard image loaded:', {
      title,
      url: finalUrl,
      retryCount,
      isSafari: isSafari()
    });
  };

  // Manual retry function
  const retryImageLoad = () => {
    console.log('🔄 Manual retry for:', title);
    setImageError(false);
    setImageLoaded(false);
    setRetryCount(0);
    
    // Force new URL generation
    const newUrl = getImageUrl(image);
    setFinalUrl(newUrl);
  };

  // Don't render anything until we have a processed URL
  if (!finalUrl) {
    return (
      <div className="w-full overflow-hidden">
        <div className="aspect-[7/9] overflow-hidden relative bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">Processing...</div>
        </div>
        <div className="mt-2 text-center text-black font-bold py-2 text-xl uppercase">
          {title}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative bg-gray-100">
        {!imageError ? (
          <img 
            ref={imageRef}
            src={finalUrl} 
            alt={title} 
            className={`w-full h-full object-cover transition-all duration-500 hover:scale-125 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            crossOrigin="anonymous"
            // Safari-specific attributes
            referrerPolicy="no-referrer"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-red-50 border-2 border-red-200">
            <div className="text-center text-red-600 p-4">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-xs font-bold">
                {isSafari() ? 'SAFARI CACHE ISSUE' : 'IMAGE FAILED'}
              </p>
              <p className="text-xs mt-1 opacity-75">
                {isSafari() 
                  ? `Retry ${retryCount}/3 - Safari cache` 
                  : 'Network or CORS issue'
                }
              </p>
              
              {/* Retry button */}
              <button
                onClick={retryImageLoad}
                className="mt-2 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
              
              {/* Safari-specific help */}
              {isSafari() && (
                <div className="mt-2 text-xs bg-yellow-100 p-2 rounded">
                  <p className="font-semibold">Safari Issue:</p>
                  <p>Try refreshing the page</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-blue-600 text-sm font-medium">
                {retryCount > 0 ? `Retry ${retryCount}...` : 'Loading...'}
              </div>
              {isSafari() && (
                <div className="text-xs text-blue-500 mt-1">Safari detected</div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-center text-black font-bold py-2 text-xl uppercase">
        {title}
      </div>
    </div>
  );
}