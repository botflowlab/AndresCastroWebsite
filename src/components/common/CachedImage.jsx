import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useCachedImage } from '../../utils/imageCache';

/**
 * CachedImage Component
 * Intelligently caches image loading states and only re-renders when necessary
 */
export default function CachedImage({
  src,
  alt,
  className = '',
  onLoad,
  onError,
  loading = 'lazy',
  crossOrigin = 'anonymous',
  referrerPolicy = 'no-referrer',
  fallbackSrc = '/images/placeholder.jpg',
  showRetryButton = true,
  retryButtonClassName = '',
  loadingComponent,
  errorComponent,
  ...props
}) {
  const imageRef = useRef(null);
  const mountedRef = useRef(true);
  
  // Use cached image hook
  const {
    loaded,
    error,
    fromCache,
    handleImageLoad,
    handleImageError,
    retryImage
  } = useCachedImage(src);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Enhanced load handler
  const onImageLoad = useCallback((event) => {
    if (!mountedRef.current) return;
    
    handleImageLoad();
    onLoad?.(event);
    
    if (!fromCache) {
      console.log('🖼️ Image loaded and cached:', src?.substring(0, 50) + '...');
    }
  }, [handleImageLoad, onLoad, src, fromCache]);

  // Enhanced error handler
  const onImageError = useCallback((event) => {
    if (!mountedRef.current) return;
    
    handleImageError();
    onError?.(event);
    
    console.warn('❌ Image failed to load:', src?.substring(0, 50) + '...');
  }, [handleImageError, onError, src]);

  // Retry handler
  const handleRetry = useCallback(() => {
    console.log('🔄 Retrying image load:', src?.substring(0, 50) + '...');
    retryImage();
    
    // Force reload the image element
    if (imageRef.current) {
      const cacheBuster = `?retry=${Date.now()}`;
      const baseUrl = src?.split('?')[0];
      imageRef.current.src = `${baseUrl}${cacheBuster}`;
    }
  }, [retryImage, src]);

  // Don't render anything if no src
  if (!src) {
    return errorComponent || (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <span className="text-gray-500 text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={onImageLoad}
        onError={onImageError}
        loading={loading}
        crossOrigin={crossOrigin}
        referrerPolicy={referrerPolicy}
        {...props}
      />

      {/* Loading State */}
      {!loaded && !error && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}>
          {loadingComponent || (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-2"></div>
              <span className="text-gray-500 text-sm">
                {fromCache ? 'Loading from cache...' : 'Loading...'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={`absolute inset-0 flex items-center justify-center bg-red-50 border-2 border-red-200 ${className}`}>
          {errorComponent || (
            <div className="text-center text-red-600 p-4">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm font-medium mb-2">Failed to load image</p>
              
              {showRetryButton && (
                <button
                  onClick={handleRetry}
                  className={`px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors ${retryButtonClassName}`}
                >
                  Retry
                </button>
              )}
              
              {fallbackSrc && fallbackSrc !== src && (
                <button
                  onClick={() => {
                    if (imageRef.current) {
                      imageRef.current.src = fallbackSrc;
                    }
                  }}
                  className="ml-2 px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                >
                  Use Fallback
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Cache Indicator (only in development) */}
      {process.env.NODE_ENV === 'development' && fromCache && loaded && (
        <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded opacity-75">
          💾
        </div>
      )}
    </div>
  );
}