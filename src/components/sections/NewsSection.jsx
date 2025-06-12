import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function NewsSection() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  const videos = [
    {
      id: "IJ2QtRYl0dA",
      title: "Arquitectura Sostenible",
      thumbnail: `https://img.youtube.com/vi/IJ2QtRYl0dA/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=IJ2QtRYl0dA"
    },
    {
      id: "wTrOXg-EVHE",
      title: "Diseño Bioclimático",
      thumbnail: `https://img.youtube.com/vi/wTrOXg-EVHE/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=wTrOXg-EVHE"
    }
  ];

  const newsImages = [
    '/images/home/1.jpg',
    '/images/home/3.jpg',
    '/images/home/11.jpg',
    '/images/home/17.jpg'
  ];

  return (
    <section className="py-32 bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/concrete1.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light mb-8">
            {t('home.news.title')}
          </h2>
          <div className="w-32 h-1 bg-[#0c0c0c] mx-auto mb-12"></div>
        </div>

        {/* Featured Videos */}
        <div className="mb-20">
          <h3 className="text-3xl font-light mb-12 text-center">
            {t('home.news.videos.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="aspect-video overflow-hidden rounded-lg relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-medium mt-4 text-center group-hover:text-gray-600 transition-colors">
                  {video.title}
                </h4>
              </a>
            ))}
          </div>
        </div>

        {/* News Images Grid */}
        <div>
          <h3 className="text-3xl font-light mb-12 text-center">
            {t('home.news.press.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newsImages.map((image, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
              >
                <img
                  src={image}
                  alt={`News coverage ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  crossOrigin="anonymous"
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
            ))}
          </div>
        </div>

        {/* Fullscreen Image Viewer */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Full size news coverage"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link
            to="/noticias"
            className="inline-block border-2 border-[#0c0c0c] px-12 py-4 text-lg font-medium hover:bg-[#0c0c0c] hover:text-white transition-all duration-300"
          >
            {t('home.news.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;