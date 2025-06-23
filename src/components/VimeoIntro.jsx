import React, { useState, useEffect } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Auto-complete after 30 seconds if user doesn't skip
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 10000);

    return () => clearTimeout(autoCompleteTimer);
  }, []);

  const handleComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowVideo(false);
      onComplete();
    }, 1000); // 1 second fade out
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!showVideo) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Skip Button - Always visible with enhanced styling */}
      <button
        onClick={handleSkip}
        className={`absolute top-6 right-6 md:top-8 md:right-8 z-60 bg-black/60 hover:bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/60 text-sm md:text-base font-medium tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 ${
          fadeOut ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}
        style={{ zIndex: 9999 }}
      >
        SKIP INTRO
      </button>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-light">Loading...</p>
          </div>
        </div>
      )}

      {/* Vimeo Video with 5% audio volume */}
      <div className="w-full h-full relative">
        <iframe
          src="https://player.vimeo.com/video/1095705289?autoplay=1&muted=0&loop=0&background=0&controls=0&volume=0.05"
          className="w-full h-full object-cover"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
          style={{
            width: '0%',
            animation: 'progress 30s linear forwards'
          }}
        />
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}