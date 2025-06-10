import React, { useState, useRef, useCallback, useMemo } from 'react';

export default function DraggableImageGrid({ 
  images, 
  onReorder, 
  onDelete, 
  title = "Images",
  type = "image" 
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const dragCounter = useRef(0);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const animationFrame = useRef(null);

  // Memoize optimized image URLs to prevent recalculation
  const optimizedImages = useMemo(() => {
    return images.map(originalUrl => {
      if (originalUrl.includes('supabase')) {
        try {
          const url = new URL(originalUrl);
          url.searchParams.set('width', '150');
          url.searchParams.set('height', '96');
          url.searchParams.set('quality', '50');
          url.searchParams.set('format', 'webp');
          return url.toString();
        } catch {
          return originalUrl;
        }
      }
      return originalUrl;
    });
  }, [images]);

  // Optimized image load handler
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => {
      if (prev.has(index)) return prev;
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  }, []);

  // Optimized drag start with minimal DOM manipulation
  const handleDragStart = useCallback((e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    
    // Store initial position
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = true;
    
    // Use RAF for smooth opacity change
    requestAnimationFrame(() => {
      setDraggedIndex(index);
      e.target.style.opacity = '0.6';
      e.target.style.transform = 'scale(0.95)';
      e.target.style.transition = 'none';
    });

    // Create lightweight drag image
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      width: 100px;
      height: 64px;
      background: rgba(0,0,0,0.8);
      border-radius: 8px;
      position: absolute;
      top: -1000px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    `;
    dragImage.textContent = `${index + 1}`;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 32);
    
    // Clean up drag image after a short delay
    setTimeout(() => document.body.removeChild(dragImage), 0);
  }, []);

  // Optimized drag end with cleanup
  const handleDragEnd = useCallback((e) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    // Smooth reset animation
    requestAnimationFrame(() => {
      e.target.style.opacity = '1';
      e.target.style.transform = 'scale(1)';
      e.target.style.transition = 'all 0.2s ease';
      
      setDraggedIndex(null);
      setDragOverIndex(null);
      dragCounter.current = 0;
      isDragging.current = false;
    });
  }, []);

  // Lightweight drag over handler
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Optimized drag enter with throttling
  const handleDragEnter = useCallback((e, index) => {
    e.preventDefault();
    
    if (!isDragging.current) return;
    
    // Throttle drag enter events
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    
    animationFrame.current = requestAnimationFrame(() => {
      dragCounter.current++;
      setDragOverIndex(index);
    });
  }, []);

  // Optimized drag leave
  const handleDragLeave = useCallback((e) => {
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(() => {
        setDragOverIndex(null);
      });
    }
  }, []);

  // Optimized drop handler with immediate visual feedback
  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    const draggedIndexValue = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    dragCounter.current = 0;
    setDragOverIndex(null);

    if (draggedIndexValue === dropIndex || isNaN(draggedIndexValue)) {
      setDraggedIndex(null);
      return;
    }

    // Immediate visual feedback
    requestAnimationFrame(() => {
      const newImages = [...images];
      const draggedImage = newImages[draggedIndexValue];
      
      // Remove the dragged item
      newImages.splice(draggedIndexValue, 1);
      
      // Insert at new position
      newImages.splice(dropIndex, 0, draggedImage);
      
      // Update state immediately for responsive UI
      onReorder(newImages);
      setDraggedIndex(null);
    });
  }, [images, onReorder]);

  // Optimized delete handler
  const handleDelete = useCallback((index) => {
    // Immediate visual feedback
    const element = document.querySelector(`[data-image-index="${index}"]`);
    if (element) {
      element.style.transform = 'scale(0)';
      element.style.opacity = '0';
      element.style.transition = 'all 0.2s ease';
    }
    
    // Delay actual deletion for smooth animation
    setTimeout(() => {
      onDelete(index);
    }, 200);
  }, [onDelete]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-gray-800">{title}</h4>
        <div className="text-sm text-gray-500">
          Drag to reorder • First image = cover
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {images.map((imageUrl, index) => {
          const isBeingDragged = draggedIndex === index;
          const isDropTarget = dragOverIndex === index && draggedIndex !== index;
          const isLoaded = loadedImages.has(index);
          
          return (
            <div
              key={`${imageUrl}-${index}`}
              data-image-index={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`relative group cursor-move select-none ${
                isBeingDragged ? 'z-30' : isDropTarget ? 'z-20' : 'z-10'
              }`}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: isDropTarget ? 'scale(1.05)' : 'scale(1)',
                transition: isBeingDragged ? 'none' : 'transform 0.15s ease'
              }}
            >
              {/* Optimized position indicator */}
              <div className="absolute -top-1 -left-1 bg-gray-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold z-30 pointer-events-none">
                {index + 1}
              </div>

              {/* Cover badge - only for first image */}
              {index === 0 && (
                <div className="absolute top-0 left-0 bg-green-600 text-white text-[9px] px-1 py-0.5 rounded-br font-bold z-30 pointer-events-none">
                  COVER
                </div>
              )}

              {/* Optimized image container */}
              <div className="relative overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow duration-150">
                {/* Loading state with minimal animation */}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="w-3 h-3 border border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Highly optimized image */}
                <img
                  src={optimizedImages[index]}
                  alt={`${title} ${index + 1}`}
                  className={`w-full h-16 object-cover transition-opacity duration-200 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(index)}
                  onError={(e) => {
                    // Fallback to original URL
                    if (e.target.src !== imageUrl) {
                      e.target.src = imageUrl;
                    }
                  }}
                  style={{
                    imageRendering: 'crisp-edges',
                    contentVisibility: 'auto'
                  }}
                />
                
                {/* Minimal hover overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-150 pointer-events-none" />

                {/* Optimized delete button */}
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-0.5 right-0.5 bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-red-700 z-30 text-[10px] font-bold"
                  title={`Delete ${type}`}
                  style={{ willChange: 'opacity' }}
                >
                  ×
                </button>
              </div>

              {/* Type indicator for blueprints */}
              {type === 'blueprint' && (
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white text-[8px] px-1 py-0.5 rounded-tr font-bold pointer-events-none">
                  PLAN
                </div>
              )}

              {/* Drop zone indicator */}
              {isDropTarget && (
                <div className="absolute inset-0 border-2 border-blue-400 border-dashed rounded-md bg-blue-50 bg-opacity-50 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* Minimal performance info */}
      <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Optimized • {images.length} items
      </div>
    </div>
  );
}