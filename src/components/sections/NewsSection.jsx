import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function NewsSection() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Use intersection observer to trigger animations when section comes into view
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
    }
  }, [inView, animationStarted]);

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
    <section ref={ref} className="py-32 bg-white relative overflow-hidden">
      {/* Background Pattern with animated entrance */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 opacity-5 transition-all duration-[2000ms] ease-out ${
            animationStarted 
              ? 'opacity-5 scale-100' 
              : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: 'url(/images/concrete1.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px'
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Magazine-style corner elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 border-2 border-gray-300/30 transition-all duration-[2000ms] ease-out ${
              animationStarted 
                ? 'opacity-100 rotate-45' 
                : 'opacity-0 rotate-0'
            }`}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              transitionDelay: `${1000 + i * 300}ms`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header with dramatic entrance */}
        <div className="text-center mb-20">
          {/* Main Title */}
          <div className={`transition-all duration-[2500ms] ease-out ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-16'
          }`}>
            <h2 className="text-4xl md:text-6xl font-light mb-8">
              {t('home.news.title')}
            </h2>
          </div>

          {/* Decorative underline */}
          <div className={`transition-all duration-[1500ms] ease-out delay-300 ${
            animationStarted 
              ? 'opacity-100 transform scale-x-100' 
              : 'opacity-0 transform scale-x-0'
          }`}>
            <div className="w-32 h-1 bg-[#0c0c0c] mx-auto mb-12"></div>
          </div>
        </div>

        {/* Featured Videos Section */}
        <div className="mb-20">
          {/* Videos Title */}
          <div className={`transition-all duration-[1800ms] ease-out delay-600 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <h3 className="text-3xl font-light mb-12 text-center">
              {t('home.news.videos.title')}
            </h3>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`group transition-all duration-[1800ms] ease-out ${
                  animationStarted 
                    ? 'opacity-100 transform translate-y-0 scale-100' 
                    : 'opacity-0 transform translate-y-12 scale-95'
                }`}
                style={{ transitionDelay: `${900 + index * 300}ms` }}
              >
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-video overflow-hidden rounded-lg relative shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      crossOrigin="anonymous"
                    />
                    
                    {/* Video overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-500"></div>
                    
                    {/* Play button with enhanced styling */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500 shadow-xl">
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-black border-b-[12px] border-b-transparent ml-2" />
                      </div>
                    </div>

                    {/* Video title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <h4 className="text-2xl font-medium text-white drop-shadow-lg">
                        {video.title}
                      </h4>
                    </div>

                    {/* Corner accent lines */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500"></div>
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500"></div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* News Images Grid Section */}
        <div>
          {/* Press Title */}
          <div className={`transition-all duration-[1800ms] ease-out delay-1200 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <h3 className="text-3xl font-light mb-12 text-center">
              {t('home.news.press.title')}
            </h3>
          </div>

          {/* Images Grid with magazine-style layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newsImages.map((image, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`group relative aspect-[3/4] overflow-hidden cursor-pointer transition-all duration-[1500ms] ease-out ${
                  animationStarted 
                    ? 'opacity-100 transform translate-y-0 scale-100' 
                    : 'opacity-0 transform translate-y-8 scale-95'
                }`}
                style={{ 
                  transitionDelay: `${1500 + index * 200}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Image container */}
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
                  <img
                    src={image}
                    alt={`News coverage ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-lg">
                      <svg 
                        className="w-6 h-6 text-gray-800" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Border glow effect */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/40 transition-all duration-500 rounded-lg"></div>
                </div>

                {/* Magazine-style corner tabs */}
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-white/20 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Image Viewer */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white p-3 hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Full size news coverage"
              className="max-h-[90vh] max-w-[90vw] object-contain animate-scale-in shadow-2xl"
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* CTA Button with elegant entrance */}
        <div className="text-center mt-16">
          <div className={`transition-all duration-[2000ms] ease-out delay-2000 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-8 scale-95'
          }`}>
            <Link
              to="/noticias"
              className="group relative inline-block border-2 border-[#0c0c0c] px-12 py-4 text-lg font-medium transition-all duration-500 overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-[#0c0c0c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              
              {/* Button text */}
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {t('home.news.cta')}
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 border-2 border-[#0c0c0c] opacity-0 group-hover:opacity-100 group-hover:shadow-lg transition-all duration-500"></div>
              
              {/* Arrow indicator */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Section border effects */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent transition-all duration-[2000ms] ease-out delay-2200 ${
        animationStarted 
          ? 'opacity-100 scale-x-100' 
          : 'opacity-0 scale-x-0'
      }`}></div>
      
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent transition-all duration-[2000ms] ease-out delay-2400 ${
        animationStarted 
          ? 'opacity-100 scale-x-100' 
          : 'opacity-0 scale-x-0'
      }`}></div>
    </section>
  );
}

export default NewsSection;