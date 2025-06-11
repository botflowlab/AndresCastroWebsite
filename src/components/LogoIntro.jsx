import React, { useState, useEffect } from 'react';

export default function LogoIntro({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animation sequence timing
    const timers = [
      setTimeout(() => setCurrentStep(1), 500),   // Logo appears
      setTimeout(() => setCurrentStep(2), 1500),  // Text appears
      setTimeout(() => setCurrentStep(3), 3000),  // Full reveal
      setTimeout(() => handleComplete(), 4500)    // Auto complete
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center transition-all duration-800 ${
      fadeOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
    }`}>
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-60 bg-white/10 hover:bg-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40 text-sm md:text-base font-light tracking-wider"
      >
        SKIP
      </button>

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center text-center px-4 md:px-8">
        
        {/* Logo Container */}
        <div className={`relative mb-8 md:mb-12 transition-all duration-1000 ease-out ${
          currentStep >= 1 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-8 scale-95'
        }`}>
          {/* Logo Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 rounded-full blur-3xl scale-150 animate-pulse" />
          
          {/* Logo Image */}
          <div className="relative">
            <img 
              src="/images/andrescastrologosolo.png" 
              alt="Andrés Castro Logo" 
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain filter drop-shadow-2xl"
            />
            
            {/* Rotating Ring */}
            <div className="absolute inset-0 border-2 border-amber-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-2 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
          </div>
        </div>

        {/* Main Title */}
        <div className={`transition-all duration-1000 delay-300 ease-out ${
          currentStep >= 2 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-2 md:mb-4 tracking-wider">
            ANDRÉS CASTRO
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-500 ease-out ${
          currentStep >= 2 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-amber-400 mb-8 md:mb-12 tracking-[0.3em] uppercase">
            ARQUITECTURA
          </h2>
        </div>

        {/* Decorative Elements */}
        <div className={`flex items-center gap-4 md:gap-8 transition-all duration-1000 delay-700 ease-out ${
          currentStep >= 3 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* Tagline */}
        <div className={`mt-6 md:mt-8 transition-all duration-1000 delay-1000 ease-out ${
          currentStep >= 3 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          <p className="text-sm md:text-base text-white/70 font-light tracking-wide max-w-md mx-auto leading-relaxed">
            Diseño arquitectónico excepcional con más de 25 años de experiencia
          </p>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 md:w-36 h-24 md:h-36 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-48 md:w-64 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-100 ease-linear shadow-lg shadow-amber-400/50"
          style={{
            width: '0%',
            animation: 'progress 4.5s linear forwards'
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