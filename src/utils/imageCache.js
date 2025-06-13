/**
 * Persistent Image Cache System
 * Keeps images rendered once loaded and only re-renders after timeout or page reload
 */

class ImageCache {
  constructor() {
    this.cache = new Map();
    this.timeouts = new Map();
    this.CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds
    
    // Clear cache on page unload to prevent memory leaks
    window.addEventListener('beforeunload', () => {
      this.clearAll();
    });
  }

  /**
   * Get cached image data
   */
  get(url) {
    return this.cache.get(url);
  }

  /**
   * Set image data in cache with automatic cleanup
   */
  set(url, imageData) {
    // Clear existing timeout if any
    if (this.timeouts.has(url)) {
      clearTimeout(this.timeouts.get(url));
    }

    // Store the image data
    this.cache.set(url, {
      ...imageData,
      cachedAt: Date.now()
    });

    // Set timeout to remove from cache after CACHE_DURATION
    const timeoutId = setTimeout(() => {
      this.remove(url);
    }, this.CACHE_DURATION);

    this.timeouts.set(url, timeoutId);
  }

  /**
   * Remove image from cache
   */
  remove(url) {
    this.cache.delete(url);
    
    if (this.timeouts.has(url)) {
      clearTimeout(this.timeouts.get(url));
      this.timeouts.delete(url);
    }
  }

  /**
   * Check if image is cached and still valid
   */
  has(url) {
    const cached = this.cache.get(url);
    if (!cached) return false;

    // Check if cache is still valid (within time limit)
    const isValid = (Date.now() - cached.cachedAt) < this.CACHE_DURATION;
    
    if (!isValid) {
      this.remove(url);
      return false;
    }

    return true;
  }

  /**
   * Refresh cache timeout for an image (reset the 2-minute timer)
   */
  touch(url) {
    if (this.has(url)) {
      const imageData = this.cache.get(url);
      this.set(url, imageData);
    }
  }

  /**
   * Clear all cached images
   */
  clearAll() {
    // Clear all timeouts
    for (const timeoutId of this.timeouts.values()) {
      clearTimeout(timeoutId);
    }
    
    this.cache.clear();
    this.timeouts.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      urls: Array.from(this.cache.keys()),
      totalMemory: this.cache.size * 100 // Rough estimate
    };
  }
}

// Create singleton instance
export const imageCache = new ImageCache();

/**
 * Hook for using persistent image cache
 */
export const usePersistentImage = (url, alt = '') => {
  const [imageState, setImageState] = React.useState(() => {
    // Check if image is already cached
    if (imageCache.has(url)) {
      const cached = imageCache.get(url);
      return {
        loaded: true,
        error: false,
        src: cached.src,
        fromCache: true
      };
    }
    
    return {
      loaded: false,
      error: false,
      src: url,
      fromCache: false
    };
  });

  React.useEffect(() => {
    // If already cached and valid, don't reload
    if (imageCache.has(url)) {
      const cached = imageCache.get(url);
      setImageState({
        loaded: true,
        error: false,
        src: cached.src,
        fromCache: true
      });
      
      // Touch the cache to reset the timeout
      imageCache.touch(url);
      return;
    }

    // Load the image
    const img = new Image();
    
    img.onload = () => {
      const imageData = {
        src: url,
        loaded: true,
        error: false,
        alt
      };
      
      // Cache the successful load
      imageCache.set(url, imageData);
      
      setImageState({
        loaded: true,
        error: false,
        src: url,
        fromCache: false
      });
    };

    img.onerror = () => {
      setImageState({
        loaded: false,
        error: true,
        src: url,
        fromCache: false
      });
    };

    img.src = url;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url, alt]);

  return imageState;
};

// React import for the hook
import React from 'react';