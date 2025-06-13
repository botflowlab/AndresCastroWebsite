import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl, isVideoFile } from '../../utils/r2Storage';

export default function ImageWithLoading({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = 'aspect-square',
  showVideoControls = false,
  priority = false,
  onLoad,
  onError,
  ...props 
}) {
  const [loadingState, setLoadingState] = useState('loading'); // loading, loaded, error
  const [retryCount, setRetryCount] = useState(0);
  const [finalSrc, setFinalSrc] = useState('');
  const imgRef = useRef(null);
  const videoRef = useRef(null);
  const observerRef = useRef(null);
  const [isInView, setIsInView] = useState(priority);

  const isVideo = isVideoFile(src);
  const maxRetries = 3;

  useEffect(() => {
    if (src) {
      const processedUrl = getImageUrl(src);
      setFinalSrc(processedUrl);
    }
  }, [src]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const element = imgRef.current || videoRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setLoadingState('loaded');
    setRetryCount(0);
    onLoad?.();
  };

  const handleError = () => {
    console.warn('❌ Media failed to load:', finalSrc);
    
    if (retryCount < maxRetries) {
      // Auto-retry with exponential backoff
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      console.log(`🔄 Auto-retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setLoadingState('loading');
        
        // Add cache-busting parameter
        const cacheBustUrl = `${finalSrc}?retry=${retryCount + 1}&t=${Date.now()}`;
        setFinalSrc(cacheBustUrl);
      }, delay);
    } else {
      setLoadingState('error');
      onError?.();
    }
  };

  const manualRetry = () => {
    setRetryCount(0);
    setLoadingState('loading');
    const cacheBustUrl = `${finalSrc.split('?')[0]}?manual=${Date.now()}`;
    setFinalSrc(cacheBustUrl);
  };

  // Don't render anything until in view (for lazy loading)
  if (!isInView && !priority) {
    return (
      <div 
        ref={imgRef}
        className={`${aspectRatio} ${className} bg-gray-100 flex items-center justify-center`}
      >
        <div className="text-gray-400">
          <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectRatio} ${className} overflow-hidden`}>
      {/* Loading State */}
      {loadingState === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            {/* Beautiful loading animation */}
            <div className="relative mb-3">
              <div className="w-12 h-12 border-3 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
              <div className="absolute inset-0 w-12 h-12 border-3 border-transparent rounded-full animate-ping border-t-blue-300"></div>
            </div>
            
            <p className="text-sm text-gray-600 font-medium">
              Loading {isVideo ? 'video' : 'image'}...
            </p>
            
            {retryCount > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Retry {retryCount}/{maxRetries}
              </p>
            )}
            
            {/* Progress bar simulation */}
            <div className="w-24 h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {loadingState === 'error' && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center border-2 border-red-200 rounded-lg">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <p className="text-sm font-semibold text-red-700 mb-1">
              {isVideo ? 'Video' : 'Image'} Failed
            </p>
            <p className="text-xs text-red-600 mb-3">
              Could not load after {maxRetries} attempts
            </p>
            
            <button
              onClick={manualRetry}
              className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Actual Media */}
      {isVideo ? (
        <video
          ref={videoRef}
          src={finalSrc}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loadingState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={handleLoad}
          onError={handleError}
          muted
          loop
          playsInline
          controls={showVideoControls}
          {...props}
        />
      ) : (
        <img
          ref={imgRef}
          src={finalSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loadingState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          crossOrigin="anonymous"
          {...props}
        />
      )}

      {/* Video overlay indicator */}
      {isVideo && loadingState === 'loaded' && (
        <div className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full backdrop-blur-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      )}
    </div>
  );
}