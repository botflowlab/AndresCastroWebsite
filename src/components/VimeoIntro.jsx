import React, { useState, useEffect, useRef } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Vimeo Player API
    if (!window.Vimeo) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = initializePlayer;
      document.head.appendChild(script);
    } else {
      initializePlayer();
    }

    // Auto-complete after 11 seconds
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 12000);

    return () => {
      clearTimeout(autoCompleteTimer);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initializePlayer = () => {
    if (!window.Vimeo) return;

    try {
      // Get the container element
      const container = document.getElementById('vimeo-player');
      if (!container) {
        console.error('❌ Vimeo container not found');
        return;
      }

      // Calculate video dimensions for mobile centering
      const isMobile = window.innerWidth < 768;
      const videoWidth = isMobile ? Math.min(window.innerWidth * 0.9, 400) : window.innerWidth;
      const videoHeight = isMobile ? (videoWidth * 9) / 16 : window.innerHeight; // 16:9 aspect ratio for mobile

      playerRef.current = new window.Vimeo.Player(container, {
        id: 1095705289,
        width: videoWidth,
        height: videoHeight,
        autoplay: true,
        muted: true, // Start muted
        loop: false,
        controls: false,
        background: false,
        responsive: true
      });

      playerRef.current.ready().then(() => {
        console.log('🎬 Vimeo player ready');
        setPlayerReady(true);
        setIsLoading(false);
        
        // Start playing
        playerRef.current.play();
      });

      playerRef.current.on('ended', () => {
        console.log('🏁 Vimeo video ended');
        handleComplete();
      });

      playerRef.current.on('error', (error) => {
        console.error('❌ Vimeo player error:', error);
        setIsLoading(false);
      });

    } catch (error) {
      console.error('❌ Vimeo player initialization failed:', error);
      setIsLoading(false);
    }
  };

  const toggleVideoAudio = async () => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (videoMuted) {
        // Unmute the video
        await playerRef.current.setMuted(false);
        await playerRef.current.setVolume(0.1); // Set to 10% volume
        setVideoMuted(false);
        setUserInteracted(true);
        console.log('🔊 Vimeo video unmuted');
      } else {
        // Mute the video
        await playerRef.current.setMuted(true);
        setVideoMuted(true);
        console.log('🔇 Vimeo video muted');
      }
    } catch (error) {
      console.warn('⚠️ Could not control Vimeo audio:', error);
    }
  };

  const handleComplete = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    
    setFadeOut(true);
    setTimeout(() => {
      setShowVideo(false);
      onComplete();
    }, 1000);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleContainerClick = () => {
    if (!userInteracted && playerReady) {
      toggleVideoAudio();
    }
  };

  if (!showVideo) return null;

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className={`fixed inset-0 z-50 transition-opacity duration-1000 cursor-pointer ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      } 
      /* Mobile: white background, desktop: black background */
      md:bg-black bg-white
      /* Mobile: flex center, desktop: full coverage */
      md:block flex items-center justify-center`}
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Audio Control Button - Top Left */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleVideoAudio();
        }}
        disabled={!playerReady}
        className={`absolute top-4 left-4 md:top-8 md:left-8 z-[60] bg-black/60 hover:bg-black/80 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40 ${
          !playerReady ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        style={{ zIndex: 9999 }}
        title={
          !playerReady 
            ? 'Video Loading...' 
            : videoMuted 
              ? 'Unmute Video Audio' 
              : 'Mute Video Audio'
        }
      >
        {!playerReady ? (
          // Loading icon
          <div className="w-4 h-4 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : videoMuted ? (
          // Muted icon
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          // Unmuted icon
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>

      {/* Skip Button - Top Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-[60] bg-white/10 hover:bg-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40 font-medium text-sm md:text-base"
        style={{ zIndex: 9999 }}
      >
        Skip Intro
      </button>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white md:bg-black z-40">
          <div className="text-center text-black md:text-white">
            <div className="w-12 h-12 border-2 border-black md:border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-light">Andrés Castro Arquitectura</p>
          </div>
        </div>
      )}

      {/* Vimeo Video Container - Responsive sizing */}
      <div 
        className={`
          /* Mobile: centered container with max width */
          md:absolute md:inset-0 
          w-full max-w-sm md:max-w-none
          /* Mobile: auto height to maintain aspect ratio */
          h-auto md:h-full
          /* Mobile: add some padding */
          px-4 md:px-0
        `}
        style={{ 
          /* Desktop: full coverage */
          width: window.innerWidth >= 768 ? '100%' : 'auto', 
          height: window.innerWidth >= 768 ? '100%' : 'auto',
          position: window.innerWidth >= 768 ? 'absolute' : 'relative',
          top: window.innerWidth >= 768 ? 0 : 'auto',
          left: window.innerWidth >= 768 ? 0 : 'auto'
        }}
      >
        <div 
          id="vimeo-player"
          className="w-full h-full rounded-lg md:rounded-none overflow-hidden shadow-lg md:shadow-none"
          style={{ 
            /* Mobile: responsive with aspect ratio */
            width: '100%', 
            height: window.innerWidth < 768 ? 'auto' : '100%',
            aspectRatio: window.innerWidth < 768 ? '16/9' : 'auto',
            position: window.innerWidth >= 768 ? 'absolute' : 'relative',
            top: window.innerWidth >= 768 ? 0 : 'auto',
            left: window.innerWidth >= 768 ? 0 : 'auto'
          }}
        />
      </div>

      {/* Progress bar */}
      {!isLoading && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 w-48 md:w-64 h-1 bg-black/20 md:bg-white/20 rounded-full overflow-hidden z-[60]">
          <div 
            className="h-full bg-black md:bg-white rounded-full transition-all duration-100 ease-linear"
            style={{
              width: '0%',
              animation: 'progress 12s linear forwards'
            }}
          />
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        /* Ensure Vimeo iframe fills container properly */
        #vimeo-player iframe {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: inherit;
        }
        
        /* Mobile specific styles */
        @media (max-width: 767px) {
          #vimeo-player iframe {
            position: relative !important;
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}