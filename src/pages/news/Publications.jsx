import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Publications() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(12);
  const [filter, setFilter] = useState('all');

  // Complete list of all news images
  const allNewsImages = [
    // Original images
    '/images/news/1.jpg',
    '/images/news/2.jpg',
    '/images/news/3.jpg',
    '/images/news/4.jpg',
    '/images/news/5.jpg',
    '/images/news/6.jpg',
    '/images/news/7.jpg',
    '/images/news/8.jpg',
    '/images/news/9.jpg',
    '/images/news/10.jpg',
    '/images/news/11.jpg',
    '/images/news/12.jpg',
    '/images/news/13.jpg',
    '/images/news/14.jpg',
    '/images/news/15.jpg',
    '/images/news/16.jpg',
    '/images/news/17.jpg',
    '/images/news/17.png',
    '/images/news/18.jpg',
    '/images/news/19.jpg',
    '/images/news/20.jpg',
    '/images/news/21.jpg',
    '/images/news/22.jpg',
    '/images/news/23.jpg',
    '/images/news/24.jpg',
    '/images/news/25.jpg',
    '/images/news/26.jpg',
    '/images/news/27.jpg',
    '/images/news/28.jpg',
    '/images/news/29.jpg',
    '/images/news/30.jpg',
    '/images/news/31.jpg',
    '/images/news/32.jpg',
    '/images/news/33.jpg',
    '/images/news/34.jpg',
    '/images/news/35.jpg',
    '/images/news/36.jpg',
    '/images/news/37.jpg',
    '/images/news/38.jpg',
    '/images/news/39.jpg',
    '/images/news/40.jpg',
    '/images/news/41.jpg',
    '/images/news/42.jpg',
    '/images/news/43.jpg',
    '/images/news/44.jpg',
    '/images/news/45.jpg',
    '/images/news/46.jpg',
    '/images/news/47.jpg',
    '/images/news/48.jpg',
    '/images/news/49.jpg',
    '/images/news/50.jpg',
    '/images/news/51.jpg',
    '/images/news/52.jpg',
    '/images/news/53.jpg',
    '/images/news/54.jpg',
    '/images/news/55.jpg',
    '/images/news/56.jpg',
    '/images/news/57.jpg',
    // Boomerang series
    '/images/news/BOOMERANG_1.JPG',
    '/images/news/BOOMERANG_2.JPG',
    '/images/news/BOOMERANG_3.JPG',
    '/images/news/BOOMERANG_5.JPG',
    '/images/news/BOOMERANG_6.JPG',
    '/images/news/BOOMERANG_7.JPG',
    '/images/news/BOOMERANG_8.JPG',
    '/images/news/BOOMERANG_9.JPG',
    '/images/news/BOOMERANG_10.JPG',
    // Special photos
    '/images/news/FOTO SUB 1.jpg',
    '/images/news/FOTO SUB 2.jpg',
    '/images/news/FOTO SUB 3.jpg',
    '/images/news/VED_COSI_1.JPG',
    '/images/news/VED_COSI_2.JPG'
  ];

  // Categorize images for filtering
  const getImageCategory = (imagePath) => {
    if (imagePath.includes('BOOMERANG')) return 'boomerang';
    return 'general';
  };

  const filteredImages = filter === 'all' 
    ? allNewsImages 
    : allNewsImages.filter(img => getImageCategory(img) === filter);

  const displayedImages = filteredImages.slice(0, visibleImages);

  // Set initial visible images based on screen size
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setVisibleImages(isMobile ? 4 : 12);
  }, []);

  const loadMore = () => {
    const isMobile = window.innerWidth < 768;
    const increment = isMobile ? 4 : 12;
    setVisibleImages(prev => Math.min(prev + increment, filteredImages.length));
  };

  const showLess = () => {
    const isMobile = window.innerWidth < 768;
    const initial = isMobile ? 4 : 12;
    setVisibleImages(initial);
    // Smooth scroll to top of gallery
    document.querySelector('.gallery-container')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  // Reset visible images when filter changes
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setVisibleImages(isMobile ? 4 : 12);
  }, [filter]);

  return (
    <section className="py-32 px-4 bg-white gallery-container">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-center tracking-wider">
            {t('publications.press.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Una colección completa de publicaciones, artículos y reconocimientos en medios especializados de arquitectura y diseño.
          </p>
        </div>

        {/* Filter Buttons - Only 3 filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
              filter === 'all'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({allNewsImages.length})
          </button>
          <button
            onClick={() => setFilter('general')}
            className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
              filter === 'general'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Publicaciones Generales
          </button>
          <button
            onClick={() => setFilter('boomerang')}
            className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
              filter === 'boomerang'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Serie Boomerang
          </button>
        </div>

        {/* Responsive Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {displayedImages.map((image, index) => {
            // Create varied heights for masonry effect
            const heights = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[2/3]', 'aspect-square'];
            const randomHeight = heights[index % heights.length];
            
            return (
              <div 
                key={`${image}-${index}`}
                onClick={() => setSelectedImage(image)}
                className={`break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${randomHeight}`}
                style={{
                  animationDelay: `${(index % 12) * 100}ms`
                }}
              >
                <img
                  src={image}
                  alt={`${t('publications.press.title')} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  crossOrigin="anonymous"
                />
                
                {/* Elegant hover overlay - NO CATEGORY LETTERS */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="text-white">
                        <p className="text-sm font-medium">
                          {getImageCategory(image) === 'boomerang' ? 'Serie Boomerang' : 'Publicación'}
                        </p>
                        <p className="text-xs opacity-75">#{index + 1}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More / Show Less Controls */}
        {filteredImages.length > (window.innerWidth < 768 ? 4 : 12) && (
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {visibleImages < filteredImages.length && (
                <button
                  onClick={loadMore}
                  className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Cargar más publicaciones</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              
              {visibleImages > (window.innerWidth < 768 ? 4 : 12) && (
                <button
                  onClick={showLess}
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-full hover:bg-gray-200 transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  <span>Mostrar menos</span>
                </button>
              )}
            </div>
            
            <p className="text-gray-500 mt-4">
              Mostrando {displayedImages.length} de {filteredImages.length} publicaciones
              {filter !== 'all' && ` (${filter})`}
            </p>
          </div>
        )}

        {/* Statistics - Only 2 items */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-light text-black mb-2">{allNewsImages.length}</div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">Total Publicaciones</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-light text-black mb-2">25+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">Años de Trayectoria</div>
          </div>
        </div>
      </div>

      {/* Enhanced Fullscreen Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white p-3 hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = displayedImages.indexOf(selectedImage);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : displayedImages.length - 1;
              setSelectedImage(displayedImages[prevIndex]);
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white p-3 hover:text-gray-300 transition-colors bg-black/50 rounded-full backdrop-blur-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = displayedImages.indexOf(selectedImage);
              const nextIndex = currentIndex < displayedImages.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(displayedImages[nextIndex]);
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white p-3 hover:text-gray-300 transition-colors bg-black/50 rounded-full backdrop-blur-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Main Image */}
          <img
            src={selectedImage}
            alt={t('publications.press.title')}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            crossOrigin="anonymous"
          />

          {/* Image Info */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full">
            <span className="text-sm">
              {displayedImages.indexOf(selectedImage) + 1} / {displayedImages.length}
              {filter !== 'all' && ` (${filter})`}
            </span>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .columns-1 > div,
        .columns-2 > div,
        .columns-3 > div,
        .columns-4 > div,
        .columns-5 > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .columns-1 > div:nth-child(1),
        .columns-2 > div:nth-child(1),
        .columns-3 > div:nth-child(1),
        .columns-4 > div:nth-child(1),
        .columns-5 > div:nth-child(1) { animation-delay: 0ms; }
        
        .columns-1 > div:nth-child(2),
        .columns-2 > div:nth-child(2),
        .columns-3 > div:nth-child(2),
        .columns-4 > div:nth-child(2),
        .columns-5 > div:nth-child(2) { animation-delay: 100ms; }
        
        .columns-1 > div:nth-child(3),
        .columns-2 > div:nth-child(3),
        .columns-3 > div:nth-child(3),
        .columns-4 > div:nth-child(3),
        .columns-5 > div:nth-child(3) { animation-delay: 200ms; }
        
        .columns-1 > div:nth-child(4),
        .columns-2 > div:nth-child(4),
        .columns-3 > div:nth-child(4),
        .columns-4 > div:nth-child(4),
        .columns-5 > div:nth-child(4) { animation-delay: 300ms; }
      `}</style>
    </section>
  );
}