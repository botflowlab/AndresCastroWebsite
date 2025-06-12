import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function Architect() {
  const { t } = useTranslation();
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

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
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
        {/* Top Content with staggered animations */}
        <div className="text-center mb-20">
          {/* Main Title - First to animate */}
          <div className={`transition-all duration-[2000ms] ease-out ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 text-[#0c0c0c]">
              {t('home.architect.title')}
            </h2>
          </div>

          {/* Decorative Line - Second to animate */}
          <div className={`transition-all duration-[1500ms] ease-out delay-300 ${
            animationStarted 
              ? 'opacity-100 transform scale-x-100' 
              : 'opacity-0 transform scale-x-0'
          }`}>
            <div className="w-32 h-1 bg-[#0c0c0c] mx-auto mb-12"></div>
          </div>

          {/* Intro Text - Third to animate */}
          <div className={`transition-all duration-[1800ms] ease-out delay-600 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              {t('home.architect.intro')}
            </p>
          </div>
        </div>

        {/* Main Content Grid with coordinated animations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Stats with staggered entrance */}
          <div className="lg:col-span-3 space-y-12">
            {/* First Stat */}
            <div className={`transition-all duration-[1500ms] ease-out delay-900 ${
              animationStarted 
                ? 'opacity-100 transform translate-x-0 scale-100' 
                : 'opacity-0 transform -translate-x-8 scale-95'
            }`}>
              <div className="text-center p-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-500 transform hover:-translate-y-1">
                <div className="text-5xl font-light text-[#0c0c0c] mb-4">25+</div>
                <div className="text-gray-600 uppercase tracking-wider text-sm">
                  {t('home.architect.stats.experience')}
                </div>
              </div>
            </div>

            {/* Second Stat */}
            <div className={`transition-all duration-[1500ms] ease-out delay-1200 ${
              animationStarted 
                ? 'opacity-100 transform translate-x-0 scale-100' 
                : 'opacity-0 transform -translate-x-8 scale-95'
            }`}>
              <div className="text-center p-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-500 transform hover:-translate-y-1">
                <div className="text-5xl font-light text-[#0c0c0c] mb-4">150+</div>
                <div className="text-gray-600 uppercase tracking-wider text-sm">
                  {t('home.architect.stats.projects')}
                </div>
              </div>
            </div>
          </div>

          {/* Center - Image with dramatic entrance */}
          <div className="lg:col-span-6 relative">
            <div className={`transition-all duration-[2000ms] ease-out delay-700 ${
              animationStarted 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-12 scale-95'
            }`}>
              <div className="aspect-square overflow-hidden relative">
                <img
                  src="/images/home/about.jpg"
                  alt="Andres Castro"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Image overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Decorative Elements with delayed entrance */}
            <div className={`absolute -top-6 -right-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10 transition-all duration-[1500ms] ease-out delay-1400 ${
              animationStarted 
                ? 'opacity-100 transform translate-x-0 translate-y-0' 
                : 'opacity-0 transform translate-x-4 -translate-y-4'
            }`}></div>
            
            <div className={`absolute -bottom-6 -left-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10 transition-all duration-[1500ms] ease-out delay-1600 ${
              animationStarted 
                ? 'opacity-100 transform translate-x-0 translate-y-0' 
                : 'opacity-0 transform -translate-x-4 translate-y-4'
            }`}></div>
          </div>

          {/* Right Side - Text & CTA with elegant entrance */}
          <div className="lg:col-span-3 space-y-8">
            {/* Description Text */}
            <div className={`transition-all duration-[1800ms] ease-out delay-1000 ${
              animationStarted 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`}>
              <div className="text-xl text-gray-600 leading-relaxed">
                {t('home.architect.description')}
              </div>
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-[1500ms] ease-out delay-1500 ${
              animationStarted 
                ? 'opacity-100 transform translate-x-0 scale-100' 
                : 'opacity-0 transform translate-x-8 scale-95'
            }`}>
              <Link 
                to="/arquitecto" 
                className="group relative inline-block w-full text-center border-2 border-[#0c0c0c] px-8 py-4 text-lg font-medium transition-all duration-500 overflow-hidden"
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-[#0c0c0c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                
                {/* Button text */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  {t('home.architect.cta')}
                </span>
                
                {/* Button border glow */}
                <div className="absolute inset-0 border-2 border-[#0c0c0c] opacity-0 group-hover:opacity-100 group-hover:shadow-lg transition-all duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Architect;