import React from 'react';

export default function ProjectCard({ title, image }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        {/* Window frame */}
        <div className="aspect-[7/9] overflow-hidden rounded-t-[40px] border-4 border-[#0c0c0c]">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-125" 
          />
        </div>
        {/* Window sill */}
        <div className="h-4 bg-[#0c0c0c] -mt-1"></div>
      </div>
      <div className="mt-4 text-center text-[#0c0c0c] font-bold py-2 text-xl uppercase">
        {title}
      </div>
    </div>
  );
}