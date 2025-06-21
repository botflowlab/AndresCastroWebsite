import React, { useState, useEffect } from 'react';

export default function LogoIntro({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animation sequence timing
    const timers = [
      setTimeout(() => setCurrentStep(1), 500),   // Logo appears
      setTimeout(() => setCurrentStep(2), 1000),  // Text appears
      setTimeout(() => setCurrentStep(3), 1200),  // Full reveal
      setTimeout(() => handleComplete(), 4000)    // Auto complete
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 1200); // Increased duration for smoother exit
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-all duration-1000 ease-in-out ${
      fadeOut 
        ? 'opacity-0 scale-95 transform translate-y-8' 
        : 'opacity-100 scale-100 transform translate-y-0'
    }`}>
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className={`absolute top-6 right-6 md:top-8 md:right-8 z-60 bg-black/10 hover:bg-black/20 text-black px-4 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm transition-all duration-500 border border-black/20 hover:border-black/40 text-sm md:text-base font-light tracking-wider ${
          fadeOut ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}
      >
        SKIP
      </button>

      {/* Audio Indicator */}
      <div className={`absolute top-6 left-6 md:top-8 md:left-8 z-60 flex items-center gap-2 text-black/60 text-sm transition-all duration-500 ${
        fadeOut ? 'opacity-0 transform translate-x-[-16px]' : 'opacity-100 transform translate-x-0'
      }`}>
        <div className="w-2 h-2 bg-black/40 rounded-full animate-pulse"></div>
        <span className="font-light">♪ Audio</span>
      </div>

      {/* Main Content Container */}
      <div className={`flex flex-col items-center justify-center text-center px-4 md:px-8 transition-all duration-1000 ease-in-out ${
        fadeOut ? 'transform translate-y-12 scale-90' : 'transform translate-y-0 scale-100'
      }`}>
        
        {/* Logo Container */}
        <div className={`relative mb-8 md:mb-12 transition-all duration-1000 ease-out ${
          currentStep >= 1 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-8 scale-95'
        } ${
          fadeOut ? 'opacity-0 transform translate-y-[-20px] scale-110' : ''
        }`}>
          {/* Logo Background Glow */}
          <div className={`absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 rounded-full blur-3xl scale-150 transition-all duration-1000 ${
            fadeOut ? 'animate-pulse scale-200 opacity-0' : 'animate-pulse scale-150'
          }`} />
          
          {/* Logo Image */}
          <div className="relative">
            <img 
              src="/images/andrescastrologosolo.png" 
              alt="Andrés Castro Logo" 
              className={`w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain filter drop-shadow-2xl transition-all duration-1000 ${
                fadeOut ? 'transform rotate-180 scale-75' : 'transform rotate-0 scale-100'
              }`}
            />
            
            {/* Rotating Ring */}
            <div className={`absolute inset-0 border-2 border-amber-400/40 rounded-full transition-all duration-1000 ${
              fadeOut ? 'animate-spin scale-150 opacity-0' : 'animate-spin scale-100'
            }`} style={{ animationDuration: fadeOut ? '0.5s' : '8s' }} />
            <div className={`absolute inset-2 border border-gray-400/30 rounded-full transition-all duration-1000 ${
              fadeOut ? 'animate-spin scale-150 opacity-0' : 'animate-spin scale-100'
            }`} style={{ 
              animationDuration: fadeOut ? '0.3s' : '12s', 
              animationDirection: 'reverse' 
            }} />
          </div>
        </div>

        {/* Main Title */}
        <div className={`transition-all duration-1000 delay-300 ease-out ${
          currentStep >= 2 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        } ${
          fadeOut ? 'opacity-0 transform translate-y-[-16px] scale-95' : ''
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-2 md:mb-4 tracking-wider">
            ANDRÉS CASTRO
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-500 ease-out ${
          currentStep >= 2 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        } ${
          fadeOut ? 'opacity-0 transform translate-y-[-12px] scale-95' : ''
        }`}>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-amber-600 mb-8 md:mb-12 tracking-[0.3em] uppercase">
            ARQUITECTURA
          </h2>
        </div>

        {/* Decorative Elements */}
        <div className={`flex items-center gap-4 md:gap-8 transition-all duration-1000 delay-700 ease-out ${
          currentStep >= 3 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        } ${
          fadeOut ? 'opacity-0 transform scale-75' : ''
        }`}>
          <div className={`w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-1000 ${
            fadeOut ? 'scale-x-0' : 'scale-x-100'
          }`} />
          <div className={`w-2 h-2 bg-amber-500 rounded-full transition-all duration-1000 ${
            fadeOut ? 'animate-ping scale-150' : 'animate-pulse scale-100'
          }`} />
          <div className={`w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-1000 ${
            fadeOut ? 'scale-x-0' : 'scale-x-100'
          }`} />
        </div>

        {/* Tagline */}
        <div className={`mt-6 md:mt-8 transition-all duration-1000 delay-1000 ease-out ${
          currentStep >= 3 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        } ${
          fadeOut ? 'opacity-0 transform translate-y-[-8px] scale-90' : ''
        }`}>
          <p className="text-sm md:text-base text-gray-600 font-light tracking-wide max-w-md mx-auto leading-relaxed">
            Diseño arquitectónico excepcional con más de 25 años de experiencia
          </p>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-1000 ${
        fadeOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}>
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gray-400/30 rounded-full transition-all duration-1000 ${
              fadeOut ? 'animate-ping scale-150' : 'animate-pulse scale-100'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: fadeOut ? '0.5s' : `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-amber-400/10 rounded-full blur-3xl transition-all duration-1000 ${
          fadeOut ? 'animate-ping scale-150 opacity-0' : 'animate-pulse scale-100'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-24 md:w-36 h-24 md:h-36 bg-gray-400/10 rounded-full blur-3xl transition-all duration-1000 ${
          fadeOut ? 'animate-ping scale-150 opacity-0' : 'animate-pulse scale-100'
        }`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Progress Bar */}
      <div className={`absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-48 md:w-64 h-0.5 bg-gray-200 rounded-full overflow-hidden transition-all duration-1000 ${
        fadeOut ? 'opacity-0 transform translate-y-4 scale-75' : 'opacity-100 transform translate-y-0 scale-100'
      }`}>
        <div 
          className={`h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-100 ease-linear shadow-lg shadow-amber-400/50 ${
            fadeOut ? 'animate-pulse' : ''
          }`}
          style={{
            width: fadeOut ? '100%' : '0%',
            animation: fadeOut ? 'none' : 'progress 4.5s linear forwards'
          }}
        />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}