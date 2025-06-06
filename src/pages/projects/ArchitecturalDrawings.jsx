import React, { useState } from 'react';

export default function ArchitecturalDrawings({ project }) {
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Get blueprints from the project
  const drawings = project?.blueprints || [];

  // If no drawings, don't render the section
  if (!drawings || drawings.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-32 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <span className="text-sm font-medium text-blue-600 tracking-[0.3em] uppercase mb-4 block">
                Technical Excellence
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-slate-900 leading-tight">
                BLUEPRINT
                <span className="block text-blue-600 font-medium">GALLERY</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-900 mx-auto mb-8"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Explore the intricate technical drawings and architectural blueprints that bring vision to reality
              </p>
            </div>
          </div>

          {/* Drawings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {drawings.map((drawing, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedDrawing({ 
                  image: drawing, 
                  title: `Technical Drawing ${index + 1}`, 
                  description: 'Detailed architectural blueprint with precise specifications and measurements' 
                })}
              >
                {/* Main Drawing Card */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1">
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={drawing}
                      alt={`Technical Drawing ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                        </svg>
                      </div>
                    </div>

                    {/* Drawing Number Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-bold tracking-wider">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Blueprint Label */}
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-medium tracking-wide shadow-lg">
                        BLUEPRINT
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-slate-900">
                        Drawing {String(index + 1).padStart(2, '0')}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Technical architectural drawing with detailed specifications, measurements, and construction details.
                    </p>

                    {/* Technical Specs */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Type</div>
                        <div className="font-medium text-slate-900">Blueprint</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Format</div>
                        <div className="font-medium text-slate-900">Technical</div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-blue-400 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">{drawings.length}</div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Technical Drawings</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">HD</div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Quality</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">CAD</div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Precision</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Fullscreen Modal */}
      {selectedDrawing && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedDrawing(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 text-white p-4 hover:text-blue-400 transition-colors z-10 bg-black/50 rounded-full hover:bg-black/70 hover:scale-110 transition-all duration-300"
            onClick={() => setSelectedDrawing(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image Container */}
          <div className="max-h-[90vh] max-w-[90vw] flex flex-col items-center">
            <div className="relative">
              <img
                src={selectedDrawing.image}
                alt={selectedDrawing.title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
              
              {/* Image Border Glow */}
              <div className="absolute inset-0 rounded-xl border border-blue-400/50 shadow-[0_0_50px_rgba(59,130,246,0.3)]" />
            </div>
            
            {/* Enhanced Image Info */}
            <div className="mt-8 text-white text-center bg-gradient-to-r from-black/80 to-slate-900/80 rounded-2xl p-8 backdrop-blur-sm border border-white/10 max-w-2xl">
              <h3 className="text-2xl font-bold mb-3 text-blue-400">{selectedDrawing.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">{selectedDrawing.description}</p>
              
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-400">High Resolution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-400">CAD Precision</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-400">Technical Specs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}