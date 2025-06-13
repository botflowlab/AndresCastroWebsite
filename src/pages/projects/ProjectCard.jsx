import React from 'react';
import PersistentImage from '../../components/PersistentImage';
import { getImageUrl } from '../../utils/r2Storage';

export default function ProjectCard({ title, image }) {
  const finalUrl = getImageUrl(image);

  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative bg-gray-100">
        <PersistentImage
          src={finalUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-125"
          loading="lazy"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="mt-2 text-center text-black font-bold py-2 text-xl uppercase">
        {title}
      </div>
    </div>
  );
}