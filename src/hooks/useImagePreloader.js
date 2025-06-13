import { useState, useEffect } from 'react';
import { getImageUrl, isVideoFile } from '../utils/r2Storage';

export function useImagePreloader(images = [], priority = false) {
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    if (!images.length) return;

    setIsPreloading(true);
    setLoadingProgress(0);

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const processedUrl = getImageUrl(src);
        
        if (isVideoFile(src)) {
          // For videos, just mark as preloaded (we don't actually preload video content)
          resolve(src);
          return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, src]));
          resolve(src);
        };
        
        img.onerror = () => {
          console.warn('Failed to preload image:', processedUrl);
          resolve(src); // Still resolve to continue with other images
        };
        
        img.src = processedUrl;
      });
    };

    const preloadImages = async () => {
      const imagesToPreload = priority ? images.slice(0, 4) : images;
      let loadedCount = 0;

      for (const image of imagesToPreload) {
        await preloadImage(image);
        loadedCount++;
        setLoadingProgress((loadedCount / imagesToPreload.length) * 100);
      }

      setIsPreloading(false);
    };

    preloadImages();
  }, [images, priority]);

  return {
    preloadedImages,
    loadingProgress,
    isPreloading,
    isImagePreloaded: (src) => preloadedImages.has(src)
  };
}