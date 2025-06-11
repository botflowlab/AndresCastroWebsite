import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../utils/r2Storage';

export default function ArchitecturalDrawings({ project }) {
  const { t } = useTranslation();
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  // Get blueprints from the project
  const drawings = project?.blueprints || [];

  // If no drawings, don't render the section
  if (!drawings || drawings.length === 0) {
    return null;
  }

  const handleImageError = (index) => {
    setImageErrors(prev => new Set([...prev, index]));
    console.warn('❌ Failed to load blueprint at index:', index);
  };

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Bilingual Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-slate-900">
              {t('projects.details.blueprints')}
            </h2>
            <div className="w-24 h-1 bg-slate-900 mx-auto"></div>
          </div>

          {/* Clean Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drawings.map((drawing, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedDrawing(drawing)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    {!imageErrors.has(index) ? (
                      <img
                        src={getImageUrl(drawing)}
                        alt={`${t('projects.details.blueprints')} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        crossOrigin="anonymous"
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <div className="text-center text-gray-500">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">Blueprint not available</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Simple hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white rounded-full p-3">
                          <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Fullscreen Modal */}
      {selectedDrawing && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDrawing(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white p-2 hover:text-gray-300 transition-colors"
            onClick={() => setSelectedDrawing(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img
            src={getImageUrl(selectedDrawing)}
            alt={t('projects.details.blueprints')}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.src = selectedDrawing; // Fallback to original URL
            }}
          />
        </div>
      )}
    </>
  );
}