/**
 * Intelligent Image Caching System
 * Keeps images rendered once loaded and only re-renders after timeout or page reload
 */

class ImageCacheManager {
  constructor() {
    this.cache = new Map();
    this.timeouts = new Map();
    this.CACHE_TIMEOUT = 2 * 60 * 1000; // 2 minutes in milliseconds
    
    // Clear cache on page unload to prevent memory leaks
    window.addEventListener('beforeunload', () => {
      this.clearAll();
    });
  }

  /**
   * Get cached image state
   * @param {string} imageUrl - The image URL
   * @returns {Object|null} - Cached state or null if not cached
   */
  get(imageUrl) {
    if (!imageUrl) return null;
    
    const cached = this.cache.get(imageUrl);
    if (!cached) return null;

    // Update last accessed time
    cached.lastAccessed = Date.now();
    
    // Reset timeout
    this.resetTimeout(imageUrl);
    
    return cached;
  }

  /**
   * Set image state in cache
   * @param {string} imageUrl - The image URL
   * @param {Object} state - The image state
   */
  set(imageUrl, state) {
    if (!imageUrl) return;

    const cacheEntry = {
      ...state,
      cachedAt: Date.now(),
      lastAccessed: Date.now()
    };

    this.cache.set(imageUrl, cacheEntry);
    this.resetTimeout(imageUrl);
    
    console.log('💾 Image cached:', imageUrl.substring(0, 50) + '...');
  }

  /**
   * Reset timeout for an image
   * @param {string} imageUrl - The image URL
   */
  resetTimeout(imageUrl) {
    // Clear existing timeout
    if (this.timeouts.has(imageUrl)) {
      clearTimeout(this.timeouts.get(imageUrl));
    }

    // Set new timeout
    const timeoutId = setTimeout(() => {
      this.remove(imageUrl);
    }, this.CACHE_TIMEOUT);

    this.timeouts.set(imageUrl, timeoutId);
  }

  /**
   * Remove image from cache
   * @param {string} imageUrl - The image URL
   */
  remove(imageUrl) {
    if (this.timeouts.has(imageUrl)) {
      clearTimeout(this.timeouts.get(imageUrl));
      this.timeouts.delete(imageUrl);
    }
    
    if (this.cache.has(imageUrl)) {
      this.cache.delete(imageUrl);
      console.log('🗑️ Image cache expired:', imageUrl.substring(0, 50) + '...');
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
    
    this.timeouts.clear();
    this.cache.clear();
    console.log('🧹 Image cache cleared');
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getStats() {
    return {
      totalCached: this.cache.size,
      cacheEntries: Array.from(this.cache.entries()).map(([url, state]) => ({
        url: url.substring(0, 50) + '...',
        cachedAt: new Date(state.cachedAt).toLocaleTimeString(),
        lastAccessed: new Date(state.lastAccessed).toLocaleTimeString(),
        loaded: state.loaded,
        error: state.error
      }))
    };
  }
}

// Create singleton instance
export const imageCache = new ImageCacheManager();

/**
 * Hook for using cached images
 * @param {string} imageUrl - The image URL
 * @returns {Object} - Image state and handlers
 */
export const useCachedImage = (imageUrl) => {
  const [imageState, setImageState] = React.useState(() => {
    // Try to get from cache first
    const cached = imageCache.get(imageUrl);
    if (cached) {
      console.log('✅ Cache hit:', imageUrl.substring(0, 50) + '...');
      return {
        loaded: cached.loaded,
        error: cached.error,
        fromCache: true
      };
    }
    
    // Default state for new images
    return {
      loaded: false,
      error: false,
      fromCache: false
    };
  });

  const handleImageLoad = React.useCallback(() => {
    const newState = { loaded: true, error: false };
    setImageState(prev => ({ ...prev, ...newState }));
    imageCache.set(imageUrl, newState);
  }, [imageUrl]);

  const handleImageError = React.useCallback(() => {
    const newState = { loaded: false, error: true };
    setImageState(prev => ({ ...prev, ...newState }));
    imageCache.set(imageUrl, newState);
  }, [imageUrl]);

  const retryImage = React.useCallback(() => {
    // Remove from cache and reset state
    imageCache.remove(imageUrl);
    setImageState({ loaded: false, error: false, fromCache: false });
  }, [imageUrl]);

  return {
    ...imageState,
    handleImageLoad,
    handleImageError,
    retryImage
  };
};

// React import for the hook
import React from 'react';