import React, { useState } from 'react';

export default function ArchitecturalDrawings({ project }) {
  const [selectedDrawing, setSelectedDrawing] = useState(null);

  // Get blueprints from the project
  const drawings = project?.blueprints || [];

  // If no drawings, don't render the section
  if (!drawings || drawings.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Simple Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-slate-900">
              BLUEPRINTS
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
                    <img
                      src={drawing}
                      alt={`Architectural Drawing ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
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
            src={selectedDrawing}
            alt="Architectural Drawing"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}