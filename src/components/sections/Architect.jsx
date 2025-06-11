import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Architect() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#f8f8f8]">
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
        {/* Top Content */}
        <div className="text-center mb-20">
          <h2 className={`text-6xl md:text-7xl lg:text-8xl font-light mb-8 text-[#0c0c0c] transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}>
            {t('home.architect.title')}
          </h2>
          <div className={`w-32 h-1 bg-[#0c0c0c] mx-auto mb-12 transition-all duration-1000 ease-out delay-200 ${
            isVisible 
              ? 'opacity-100 transform scale-x-100' 
              : 'opacity-0 transform scale-x-0'
          }`}></div>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light transition-all duration-1000 ease-out delay-300 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            {t('home.architect.intro')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Stats */}
          <div className="lg:col-span-3 space-y-12">
            <div className={`text-center p-8 bg-white shadow-lg transition-all duration-1000 ease-out delay-400 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0 scale-100' 
                : 'opacity-0 transform translate-x-[-50px] scale-95'
            }`}>
              <div className="text-5xl font-light text-[#0c0c0c] mb-4">25+</div>
              <div className="text-gray-600 uppercase tracking-wider text-sm">
                {t('home.architect.stats.experience')}
              </div>
            </div>
            <div className={`text-center p-8 bg-white shadow-lg transition-all duration-1000 ease-out delay-500 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0 scale-100' 
                : 'opacity-0 transform translate-x-[-50px] scale-95'
            }`}>
              <div className="text-5xl font-light text-[#0c0c0c] mb-4">150+</div>
              <div className="text-gray-600 uppercase tracking-wider text-sm">
                {t('home.architect.stats.projects')}
              </div>
            </div>
          </div>

          {/* Center - Image */}
          <div className="lg:col-span-6 relative">
            <div className={`aspect-square overflow-hidden transition-all duration-1000 ease-out delay-600 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-8 scale-95'
            }`}>
              <img
                src="/images/home/about.jpg"
                alt="Andres Castro"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className={`absolute -top-6 -right-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10 transition-all duration-1000 ease-out delay-700 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0 translate-y-0' 
                : 'opacity-0 transform translate-x-4 translate-y-[-4px]'
            }`}></div>
            <div className={`absolute -bottom-6 -left-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10 transition-all duration-1000 ease-out delay-800 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0 translate-y-0' 
                : 'opacity-0 transform translate-x-[-4px] translate-y-4'
            }`}></div>
          </div>

          {/* Right Side - Text & CTA */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`text-xl text-gray-600 leading-relaxed transition-all duration-1000 ease-out delay-700 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`}>
              {t('home.architect.description')}
            </div>
            <Link 
              to="/arquitecto" 
              className={`inline-block w-full text-center border-2 border-[#0c0c0c] px-8 py-4 text-lg font-medium hover:bg-[#0c0c0c] hover:text-white transition-all duration-300 ${
                isVisible 
                  ? 'opacity-100 transform translate-x-0 scale-100' 
                  : 'opacity-0 transform translate-x-8 scale-95'
              }`}
              style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
            >
              {t('home.architect.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Architect;