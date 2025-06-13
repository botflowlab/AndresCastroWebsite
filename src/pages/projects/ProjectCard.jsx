import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl, isVideoFile } from '../../utils/r2Storage';
import ImageWithLoading from '../../components/ui/ImageWithLoading';

export default function ProjectCard({ title, image }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Determine if this is a video file
  const isVideo = isVideoFile(image);

  return (
    <div 
      ref={cardRef}
      className="w-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Image/Video Container */}
      <div className="relative">
        <ImageWithLoading
          src={image}
          alt={title}
          aspectRatio="aspect-[7/9]"
          className="transition-all duration-700 group-hover:scale-125 rounded-lg shadow-lg group-hover:shadow-2xl"
          priority={false} // Let intersection observer handle loading
          showVideoControls={false}
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center rounded-lg ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>

        {/* Video Indicator */}
        {isVideo && (
          <div className="absolute top-3 right-3 bg-black/80 text-white p-2 rounded-full backdrop-blur-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
      </div>
      
      {/* Enhanced Title */}
      <div className="mt-4 text-center">
        <h3 className="text-black font-bold py-2 text-xl uppercase tracking-wide group-hover:text-gray-600 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  );
}