import React from 'react';

export default function SkeletonLoader({ 
  type = 'image', 
  count = 1, 
  className = '',
  aspectRatio = 'aspect-square' 
}) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={`${aspectRatio} ${className} animate-pulse`}>
      {type === 'image' && (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg">
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}
      
      {type === 'card' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      )}
      
      {type === 'text' && (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      )}
    </div>
  ));

  return count === 1 ? skeletons[0] : <>{skeletons}</>;
}