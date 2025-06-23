import React, { useState, useEffect, useRef } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Auto-complete after 12 seconds if user doesn't skip
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 12000);

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

  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // Set up Vimeo Player API communication
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Wait a moment for the player to initialize
      setTimeout(() => {
        try {
          // Set volume to 5% using Vimeo Player API
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              method: 'setVolume',
              value: 0.05
            }),
            '*'
          );
          
          // Also try to unmute in case it's muted
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              method: 'setMuted',
              value: false
            }),
            '*'
          );
          
          console.log('🔊 Vimeo volume set to 5%');
        } catch (error) {
          console.warn('⚠️ Could not set Vimeo volume:', error);
        }
      }, 1500);
    }
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
        <div className="absolute inset-0 flex items-center justify-center bg-black z-40">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-light">Loading video...</p>
          </div>
        </div>
      )}

      {/* Vimeo Video with proper audio settings and API */}
      <div className="w-full h-full relative">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1095705289?autoplay=1&muted=0&loop=0&background=0&controls=0&api=1"
          className="w-full h-full object-cover"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={handleIframeLoad}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Audio indicator */}
      <div className={`absolute top-6 left-6 md:top-8 md:left-8 z-60 flex items-center gap-2 text-white/80 text-sm transition-all duration-500 ${
        fadeOut ? 'opacity-0 transform translate-x-[-16px]' : 'opacity-100 transform translate-x-0'
      }`}>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <span className="font-light">🔊 Audio 5%</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
          style={{
            width: '0%',
            animation: 'progress 12s linear forwards'
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