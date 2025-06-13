import React, { useState, useEffect, useRef } from 'react';
import { imageCache } from '../utils/imageCache';

/**
 * PersistentImage Component
 * Renders images with persistent caching - once loaded, stays loaded until timeout or page reload
 */
export default function PersistentImage({ 
  src, 
  alt = '', 
  className = '', 
  onLoad = () => {}, 
  onError = () => {},
  fallbackSrc = '/images/placeholder.jpg',
  ...props 
}) {
  const [imageState, setImageState] = useState(() => {
    // Check if image is already cached
    if (imageCache.has(src)) {
      const cached = imageCache.get(src);
      return {
        loaded: true,
        error: false,
        currentSrc: cached.src,
        fromCache: true
      };
    }
    
    return {
      loaded: false,
      error: false,
      currentSrc: src,
      fromCache: false
    };
  });

  const imgRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    
    // If already cached and valid, don't reload
    if (imageCache.has(src)) {
      const cached = imageCache.get(src);
      
      if (mountedRef.current) {
        setImageState({
          loaded: true,
          error: false,
          currentSrc: cached.src,
          fromCache: true
        });
        
        // Touch the cache to reset the 2-minute timeout
        imageCache.touch(src);
        onLoad();
      }
      return;
    }

    // Reset state for new image
    setImageState({
      loaded: false,
      error: false,
      currentSrc: src,
      fromCache: false
    });

    // Load the image
    const img = new Image();
    
    img.onload = () => {
      if (!mountedRef.current) return;
      
      const imageData = {
        src: src,
        loaded: true,
        error: false,
        alt,
        loadedAt: Date.now()
      };
      
      // Cache the successful load
      imageCache.set(src, imageData);
      
      setImageState({
        loaded: true,
        error: false,
        currentSrc: src,
        fromCache: false
      });
      
      onLoad();
    };

    img.onerror = () => {
      if (!mountedRef.current) return;
      
      setImageState({
        loaded: false,
        error: true,
        currentSrc: fallbackSrc,
        fromCache: false
      });
      
      onError();
    };

    img.src = src;

    // Cleanup function
    return () => {
      mountedRef.current = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [src, alt, onLoad, onError, fallbackSrc]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Handle visibility change to touch cache when image becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && imageState.loaded && imageCache.has(src)) {
        imageCache.touch(src);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [src, imageState.loaded]);

  return (
    <>
      {/* Main Image */}
      <img
        ref={imgRef}
        src={imageState.currentSrc}
        alt={alt}
        className={`${className} ${imageState.loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => {
          // This handles the actual DOM image load event
          if (imageState.currentSrc === fallbackSrc) {
            onError();
          }
        }}
        {...props}
      />
      
      {/* Loading State */}
      {!imageState.loaded && !imageState.error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {imageState.error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
      
      {/* Cache Debug Info (only in development) */}
      {import.meta.env.DEV && imageState.fromCache && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-75">
          Cached
        </div>
      )}
    </>
  );
}