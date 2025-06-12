import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function LemaArchitec() {
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
    <section ref={ref} className="w-full relative overflow-hidden">
      {/* Responsive image container with blur animation */}
      <div className="w-full relative">
        <div className={`transition-all duration-[2500ms] ease-out ${
          animationStarted 
            ? 'opacity-100 blur-0 transform scale-100' 
            : 'opacity-0 blur-md transform scale-105'
        }`}>
          <img
            src="/images/lemaARQUITEC.jpg"
            alt="Lema Arquitectura"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Overlay gradient that fades out */}
        <div className={`absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 transition-all duration-[2000ms] ease-out delay-500 ${
          animationStarted 
            ? 'opacity-0' 
            : 'opacity-100'
        }`}></div>

        {/* Subtle glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-[2000ms] ease-out delay-800 ${
          animationStarted 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}></div>
      </div>

        {/* Corner accent lines that slide in */}
        <div className={`absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-gray-300/30 transition-all duration-[1500ms] ease-out delay-1000 ${
          animationStarted 
            ? 'opacity-100 transform translate-x-0 translate-y-0' 
            : 'opacity-0 transform -translate-x-4 -translate-y-4'
        }`}></div>

        <div className={`absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-gray-300/30 transition-all duration-[1500ms] ease-out delay-1200 ${
          animationStarted 
            ? 'opacity-100 transform translate-x-0 translate-y-0' 
            : 'opacity-0 transform translate-x-4 translate-y-4'
        }`}></div>
      </div>

      {/* Shimmer effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-[1500ms] ease-out delay-1500 ${
        animationStarted 
          ? 'translate-x-full opacity-0' 
          : '-translate-x-full opacity-100'
      }`}></div>
    </section>
  );
}