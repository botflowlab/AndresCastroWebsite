import React, { useState } from 'react';

export default function ProjectCard({ title, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-125 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
      <div className="mt-2 text-center text-[0c0c0c] font-bold bg-blur py-2 text-xl text-bold uppercase">
        {title}
      </div>
    </div>
  );
}