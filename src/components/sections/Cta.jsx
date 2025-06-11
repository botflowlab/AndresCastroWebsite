import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Cta() {
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
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/home/hero4.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white py-8">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 font-cormorant leading-tight text-shadow transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}>
            {t('home.contact.title')}
          </h2>
          <p className={`text-xl md:text-2xl mb-16 font-cormorant font-light text-shadow transition-all duration-1000 ease-out delay-300 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            {t('home.contact.subtitle')}
          </p>
          <Link 
            to="/contacto" 
            className={`inline-block border-2 border-white px-12 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-[.25em] uppercase transform hover:scale-105 ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ 
              transitionDuration: '1000ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: isVisible ? '600ms' : '0ms'
            }}
          >
            {t('home.contact.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cta;