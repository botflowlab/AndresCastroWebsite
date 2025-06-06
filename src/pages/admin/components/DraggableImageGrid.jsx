import React, { useState, useRef } from 'react';

export default function DraggableImageGrid({ 
  images, 
  onReorder, 
  onDelete, 
  title = "Images",
  type = "image" 
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragCounter = useRef(0);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    dragCounter.current++;
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragOverIndex(null);

    if (draggedIndex === null || draggedIndex === dropIndex) {
      return;
    }

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    
    // Remove the dragged item
    newImages.splice(draggedIndex, 1);
    
    // Insert at new position
    newImages.splice(dropIndex, 0, draggedImage);
    
    onReorder(newImages);
    setDraggedIndex(null);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-gray-800">{title}</h4>
        <div className="text-sm text-gray-500">
          Drag to reorder • First image will be the cover
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <div
            key={`${imageUrl}-${index}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            className={`relative group cursor-move transition-all duration-200 ${
              draggedIndex === index ? 'scale-105 rotate-2 z-10' : ''
            } ${
              dragOverIndex === index && draggedIndex !== index 
                ? 'scale-105 ring-2 ring-blue-400 ring-opacity-50' 
                : ''
            }`}
          >
            {/* Position indicator */}
            <div className="absolute -top-2 -left-2 bg-gray-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium z-20">
              {index + 1}
            </div>

            {/* Cover badge for first image */}
            {index === 0 && (
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded font-medium z-20">
                Cover
              </div>
            )}

            {/* Image container */}
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <img
                src={imageUrl}
                alt={`${title} ${index + 1}`}
                className="w-full h-32 object-cover"
                draggable={false}
              />
              
              {/* Drag overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => onDelete(index)}
                className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700 z-20"
                title={`Delete ${type}`}
              >
                ×
              </button>
            </div>

            {/* Blueprint indicator */}
            {type === 'blueprint' && (
              <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Blueprint
              </div>
            )}

            {/* Drag indicator */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-gray-800 text-white p-1 rounded">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drop zone indicator */}
      {draggedIndex !== null && (
        <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          Drop here to add to the end
        </div>
      )}
    </div>
  );
}