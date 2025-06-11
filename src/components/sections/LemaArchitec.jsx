import React, { useState, useEffect, useRef } from 'react';

export default function LemaArchitec() {
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
    <section ref={sectionRef} className="w-full relative overflow-hidden">
      {/* Responsive image container */}
      <div className={`w-full transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 transform translate-y-0 scale-100' 
          : 'opacity-0 transform translate-y-8 scale-95'
      }`}>
        <img
          src="/images/lemaARQUITEC.jpg"
          alt="Lema Arquitectura"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}