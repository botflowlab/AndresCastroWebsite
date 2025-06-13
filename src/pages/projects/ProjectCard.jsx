import React from 'react';
import CachedImage from '../../components/common/CachedImage';
import { getImageUrl } from '../../utils/r2Storage';

export default function ProjectCard({ title, image }) {
  const finalUrl = getImageUrl(image);

  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative">
        <CachedImage
          src={finalUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-125"
          loading="lazy"
          showRetryButton={true}
          retryButtonClassName="text-xs"
          loadingComponent={
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-blue-600 text-sm font-medium">Loading...</div>
            </div>
          }
          errorComponent={
            <div className="text-center text-red-600 p-4">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-xs font-bold mb-2">IMAGE FAILED</p>
              <p className="text-xs opacity-75 mb-2">Check R2 configuration</p>
            </div>
          }
        />
      </div>
      
      <div className="mt-2 text-center text-black font-bold py-2 text-xl uppercase">
        {title}
      </div>
    </div>
  );
}