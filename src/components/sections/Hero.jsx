import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Hero() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    '/images/home/hero1.jpg',
    '/images/home/hero2.jpg',
    '/images/home/hero3.jpg',
    '/images/home/hero4.jpg',
  ];

  // Mobile-specific image (hero4)
  const mobileImage = '/images/home/mobilehero.jpg';

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Trigger entrance animation with longer delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Only start image carousel on desktop
    let imageTimer;
    if (!isMobile) {
      imageTimer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 7000);
    }

    return () => {
      clearTimeout(timer);
      if (imageTimer) clearInterval(imageTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {isMobile ? (
        // Mobile: Single static image (hero4)
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${mobileImage})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
      ) : (
        // Desktop: Image carousel
        <>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Title with stunning typography - SLOWER */}
          <div className={`mb-8 transition-all duration-[2500ms] ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}>
            <h1 className="relative">
              {/* Main text with gradient and glow */}
              <span className="relative block text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white leading-none tracking-tight drop-shadow-2xl">
                {t('home.hero.title')}
              </span>
              
              {/* Accent line */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 md:w-32 lg:w-40 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            </h1>
          </div>
          
          {/* Subtitle with elegant styling - SLOWER with longer delay */}
          <div className={`mb-12 transition-all duration-[2500ms] ease-out delay-700 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <p className="text-1xl sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              <span className="relative">
                {t('home.hero.subtitle')}
              </span>
            </p>
            <p className="text-1xl sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              <span className="relative">
                  {t('home.hero.subsubtitle')}
              </span>
            </p>
          </div>

          {/* Dashboard Button with enhanced styling - SLOWER with longer delay */}
          <div className={`mb-12 transition-all duration-[2000ms] ease-out delay-1200 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-8 scale-95'
          }`}>
            <Link
              to="/client-dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {/* Button background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-lg shadow-xl group-hover:shadow-2xl transition-all duration-500"></div>
              
              {/* Button border glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500"></div>
              
              {/* Button content */}
              <span className="relative flex items-center space-x-2">
                <span>🚀</span>
                <span className="tracking-wider">ADMIN DASHBOARD</span>
              </span>
            </Link>
          </div>

          {/* Navigation Dots - Only show on desktop */}
          {!isMobile && (
            <div className={`flex justify-center gap-4 transition-all duration-[2000ms] ease-out delay-1700 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative transition-all duration-500 group ${
                    currentImageIndex === index 
                      ? 'w-12 h-3' 
                      : 'w-3 h-3 hover:w-6'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {/* Dot background */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    currentImageIndex === index
                      ? 'bg-white shadow-lg'
                      : 'bg-white/50 group-hover:bg-white/80'
                  }`}></div>
                  
                  {/* Dot glow effect */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    currentImageIndex === index
                      ? 'bg-white/30 blur-sm scale-150'
                      : 'bg-transparent group-hover:bg-white/20 group-hover:blur-sm group-hover:scale-125'
                  }`}></div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/10 to-transparent"></div>
      </div>

      {/* Scroll indicator - SLOWER with longest delay */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-[2000ms] ease-out delay-2200 ${
        isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-4'
      }`}>
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;