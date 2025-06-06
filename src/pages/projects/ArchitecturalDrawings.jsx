import React, { useState } from 'react';

export default function ArchitecturalDrawings({ project }) {
  const [selectedDrawing, setSelectedDrawing] = useState(null);

  // Placeholder drawings - will be replaced with actual data from database
  const drawings = [
    // These will come from the database later
  ];

  // For now, show placeholder if no drawings
  if (!drawings || drawings.length === 0) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-wider text-[#0c0c0c]">
              ARCHITECTURAL DRAWINGS
            </h2>
            <div className="w-24 h-0.5 bg-[#0c0c0c] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Technical drawings and blueprints showcasing the detailed design process
            </p>
          </div>

          {/* Placeholder Content - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="aspect-[3/2] bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium">Drawing {item}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-1 text-[#0c0c0c]">Technical Drawing {item}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">Detailed architectural plans and specifications for this project component</p>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Specifications - Compact Version */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-light mb-8 text-center text-[#0c0c0c]">
              DRAWING TYPES
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Floor Plans</h4>
                <p className="text-xs md:text-sm text-gray-600">Layout & organization</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Elevations</h4>
                <p className="text-xs md:text-sm text-gray-600">Exterior views</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Sections</h4>
                <p className="text-xs md:text-sm text-gray-600">Cross-sections</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Details</h4>
                <p className="text-xs md:text-sm text-gray-600">Specifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-wider text-[#0c0c0c]">
              ARCHITECTURAL DRAWINGS
            </h2>
            <div className="w-24 h-0.5 bg-[#0c0c0c] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Technical drawings and blueprints showcasing the detailed design process
            </p>
          </div>

          {/* Drawings Grid - Responsive and Scalable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {drawings.map((drawing, index) => (
              <div 
                key={index}
                onClick={() => setSelectedDrawing(drawing)}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img
                    src={drawing.image}
                    alt={drawing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-1 text-[#0c0c0c] line-clamp-1">{drawing.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{drawing.description}</p>
                  {drawing.scale && (
                    <p className="text-xs text-gray-500 mt-2 font-medium">Scale: {drawing.scale}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Specifications - Compact */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-light mb-8 text-center text-[#0c0c0c]">
              DRAWING TYPES
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Floor Plans</h4>
                <p className="text-xs md:text-sm text-gray-600">Layout & organization</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Elevations</h4>
                <p className="text-xs md:text-sm text-gray-600">Exterior views</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Sections</h4>
                <p className="text-xs md:text-sm text-gray-600">Cross-sections</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0c0c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-sm md:text-base font-medium mb-1">Details</h4>
                <p className="text-xs md:text-sm text-gray-600">Specifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {selectedDrawing && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDrawing(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedDrawing(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-h-[90vh] max-w-[90vw] flex flex-col items-center">
            <img
              src={selectedDrawing.image}
              alt={selectedDrawing.title}
              className="max-h-[75vh] max-w-full object-contain mb-4"
            />
            <div className="text-white text-center max-w-2xl">
              <h3 className="text-xl md:text-2xl font-medium mb-2">{selectedDrawing.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{selectedDrawing.description}</p>
              {selectedDrawing.scale && (
                <p className="text-gray-400 mt-2 text-sm">Scale: {selectedDrawing.scale}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}