import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl } from '../../utils/r2Storage';

export default function ProjectCard({ title, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [finalUrl, setFinalUrl] = useState('');
  const [corsError, setCorsError] = useState(false);
  const mountedRef = useRef(true);

  // Process URL once when component mounts or image prop changes
  useEffect(() => {
    mountedRef.current = true;
    setImageLoaded(false);
    setImageError(false);
    setCorsError(false);
    
    const processedUrl = getImageUrl(image);
    setFinalUrl(processedUrl);
    
    console.log('🎯 ProjectCard URL processed:', {
      title,
      original: image,
      processed: processedUrl
    });

    return () => {
      mountedRef.current = false;
    };
  }, [image, title]);

  // Test CORS by attempting a fetch request
  const testCorsAccess = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'cors'
      });
      return response.ok;
    } catch (error) {
      console.error('CORS test failed:', error);
      return false;
    }
  };

  const handleImageError = async (event) => {
    if (!mountedRef.current) return;
    
    // Test if this is a CORS issue
    const isCorsIssue = await testCorsAccess(finalUrl);
    
    console.error('❌ ProjectCard image failed:', {
      title,
      original: image,
      processed: finalUrl,
      timestamp: new Date().toISOString(),
      corsTest: isCorsIssue ? 'PASSED' : 'FAILED',
      errorType: event?.target?.error || 'Unknown'
    });
    
    setImageError(true);
    if (!isCorsIssue) {
      setCorsError(true);
    }
  };

  const handleImageLoad = () => {
    if (!mountedRef.current) return;
    
    setImageLoaded(true);
    console.log('✅ ProjectCard image loaded:', {
      title,
      url: finalUrl,
      timestamp: new Date().toISOString()
    });
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
            src={finalUrl} 
            alt={title} 
            className={`w-full h-full object-cover transition-all duration-500 hover:scale-125 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-red-50 border-2 border-red-200">
            <div className="text-center text-red-600 p-4">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-xs font-bold">
                {corsError ? 'CORS ERROR' : 'IMAGE FAILED'}
              </p>
              <p className="text-xs mt-1 opacity-75">
                {corsError 
                  ? 'Configure R2 bucket CORS policy' 
                  : 'Check console for details'
                }
              </p>
              {corsError && (
                <div className="mt-2 text-xs bg-red-100 p-2 rounded">
                  <p className="font-semibold">Fix Required:</p>
                  <p>Add CORS policy to R2 bucket</p>
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
              <div className="text-blue-600 text-sm font-medium">Loading...</div>
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