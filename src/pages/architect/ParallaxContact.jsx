import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ParallaxContact() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const parallaxElement = parallaxRef.current;
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      if (parallaxElement) {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        parallaxElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="relative py-40 overflow-hidden">
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/acContact.jpg)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-cormorant leading-tight">
            Let's Create Something Extraordinary Together
          </h2>
          <p className="text-xl md:text-2xl mb-16 font-cormorant font-light">
            Transform your vision into reality with sustainable architecture
          </p>
          <Link 
            to="/contacto" 
            className="inline-block border-2 border-white px-12 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-[.25em] uppercase"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}