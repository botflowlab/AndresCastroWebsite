import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function Cta() {
  const { t } = useTranslation();
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // Use intersection observer to trigger animations when section comes into view
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
    }
  }, [inView, animationStarted]);

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      {/* Parallax Background with enhanced effects */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/home/hero4.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dynamic overlay with animation */}
        <div className={`absolute inset-0 bg-black/50 transition-all duration-[3000ms] ease-out ${
          animationStarted 
            ? 'bg-black/50' 
            : 'bg-black/80'
        }`}></div>

        {/* Animated gradient overlays for depth */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-all duration-[2500ms] ease-out delay-300 ${
          animationStarted 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}></div>
        
        <div className={`absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 transition-all duration-[2000ms] ease-out delay-600 ${
          animationStarted 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Geometric shapes with staggered animations */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-[3000ms] ease-out ${
              animationStarted 
                ? 'opacity-30 rotate-45' 
                : 'opacity-0 rotate-0'
            }`}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
              transitionDelay: `${1200 + i * 200}ms`
            }}
          >
            <div className="w-2 h-2 border border-white/40 transform rotate-45"></div>
          </div>
        ))}

        {/* Animated light rays */}
        <div className={`absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-[2500ms] ease-out delay-800 ${
          animationStarted 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-8'
        }`}></div>
        
        <div className={`absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent transform skew-x-12 transition-all duration-[2500ms] ease-out delay-1000 ${
          animationStarted 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        }`}></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white py-8">
          
          {/* Main Title with dramatic entrance */}
          <div className={`mb-8 transition-all duration-[2500ms] ease-out ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-16 scale-95'
          }`}>
            <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-shadow-lg">
              {/* Text with enhanced styling */}
              <span className="relative inline-block">
                {t('home.contact.title')}
                
                {/* Decorative underline that animates in */}
                <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-[2000ms] ease-out delay-1000 ${
                  animationStarted 
                    ? 'w-32 opacity-100' 
                    : 'w-0 opacity-0'
                }`}></div>
              </span>
            </h2>
          </div>

          {/* Subtitle with elegant entrance */}
          <div className={`mb-16 transition-all duration-[2200ms] ease-out delay-500 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-shadow leading-relaxed max-w-3xl mx-auto">
              {t('home.contact.subtitle')}
            </p>
          </div>

          {/* CTA Button with sophisticated animation */}
          <div className={`transition-all duration-[2000ms] ease-out delay-1200 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-8 scale-90'
          }`}>
            <Link 
              to="/contacto" 
              className="group relative inline-block border-2 border-white px-12 py-4 text-lg font-medium tracking-[.25em] uppercase transition-all duration-700 overflow-hidden"
            >
              {/* Button background with slide animation */}
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
              
              {/* Button text */}
              <span className="relative z-10 group-hover:text-black transition-colors duration-700">
                {t('home.contact.cta')}
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 group-hover:shadow-xl group-hover:shadow-white/30 transition-all duration-700"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Corner accents */}
              <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-white/0 group-hover:border-white transition-all duration-500"></div>
              <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-white/0 group-hover:border-white transition-all duration-500 delay-100"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-white/0 group-hover:border-white transition-all duration-500 delay-200"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-white/0 group-hover:border-white transition-all duration-500 delay-300"></div>
            </Link>
          </div>

          {/* Additional decorative elements */}
          <div className="mt-16 flex justify-center items-center space-x-8">
            {/* Left decorative line */}
            <div className={`h-px bg-gradient-to-r from-transparent to-white/50 transition-all duration-[2000ms] ease-out delay-1800 ${
              animationStarted 
                ? 'w-24 opacity-100' 
                : 'w-0 opacity-0'
            }`}></div>
            
            {/* Center diamond */}
            <div className={`w-3 h-3 border border-white/60 transform rotate-45 transition-all duration-[1500ms] ease-out delay-2000 ${
              animationStarted 
                ? 'opacity-100 scale-100 rotate-45' 
                : 'opacity-0 scale-0 rotate-0'
            }`}></div>
            
            {/* Right decorative line */}
            <div className={`h-px bg-gradient-to-l from-transparent to-white/50 transition-all duration-[2000ms] ease-out delay-1800 ${
              animationStarted 
                ? 'w-24 opacity-100' 
                : 'w-0 opacity-0'
            }`}></div>
          </div>

          {/* Scroll indicator for end of page */}
          <div className={`mt-12 transition-all duration-[2000ms] ease-out delay-2200 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}>
            <div className="flex flex-col items-center space-y-2 text-white/60">
              <div className="w-px h-6 bg-gradient-to-t from-white/60 to-transparent animate-pulse"></div>
              <span className="text-xs tracking-widest uppercase">End</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section border effects */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-[2500ms] ease-out delay-2400 ${
        animationStarted 
          ? 'opacity-100 scale-x-100' 
          : 'opacity-0 scale-x-0'
      }`}></div>

      {/* Animated vignette effect */}
      <div className={`absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20 transition-all duration-[3000ms] ease-out delay-1500 ${
        animationStarted 
          ? 'opacity-100' 
          : 'opacity-0'
      }`}></div>
    </section>
  );
}

export default Cta;