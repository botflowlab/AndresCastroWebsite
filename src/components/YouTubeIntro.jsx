import React, { useState, useEffect, useRef } from 'react';

export default function YouTubeIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // YouTube API ready callback
    window.onYouTubeIframeAPIReady = () => {
      console.log('🎬 YouTube API ready');
      initializePlayer();
    };

    // If API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    // Auto-complete after 15 seconds
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 15000);

    // Add click listener for user interaction
    const handleUserClick = () => {
      setUserInteracted(true);
      if (playerRef.current && playerRef.current.playVideo) {
        playerRef.current.unMute();
        playerRef.current.setVolume(15);
        playerRef.current.playVideo();
        console.log('🔊 Audio enabled after user interaction');
      }
    };

    document.addEventListener('click', handleUserClick, { once: true });

    return () => {
      clearTimeout(autoCompleteTimer);
      document.removeEventListener('click', handleUserClick);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initializePlayer = () => {
    if (!window.YT || !window.YT.Player) return;

    try {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: 'QLJ258GjV1g', // Replace with your actual YouTube video ID
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          start: 0,
          mute: 1, // Start muted to allow autoplay
          loop: 0,
          cc_load_policy: 0,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
    } catch (error) {
      console.error('❌ YouTube player initialization failed:', error);
      setIsLoading(false);
    }
  };

  const onPlayerReady = (event) => {
    console.log('🎬 YouTube player ready');
    setPlayerReady(true);
    setIsLoading(false);
    
    try {
      // Start playing immediately (muted for autoplay compliance)
      event.target.playVideo();
      
      // Try to unmute and set volume after a short delay
      setTimeout(() => {
        if (!userInteracted) {
          // Try to unmute automatically (may not work in all browsers)
          event.target.unMute();
          event.target.setVolume(15);
          console.log('🔊 Attempting auto-unmute');
        }
      }, 1000);
      
    } catch (error) {
      console.warn('⚠️ Could not control YouTube player:', error);
    }
  };

  const onPlayerStateChange = (event) => {
    // Video has started playing
    if (event.data === window.YT.PlayerState.PLAYING) {
      console.log('▶️ YouTube video playing');
      
      // If user hasn't interacted yet, show interaction prompt
      if (!userInteracted) {
        setTimeout(() => {
          if (!userInteracted && playerRef.current) {
            // Try to unmute again
            playerRef.current.unMute();
            playerRef.current.setVolume(15);
          }
        }, 2000);
      }
    }
    
    // Video has ended
    if (event.data === window.YT.PlayerState.ENDED) {
      console.log('🏁 YouTube video ended');
      handleComplete();
    }
  };

  const onPlayerError = (event) => {
    console.error('❌ YouTube player error:', event.data);
    setIsLoading(false);
    // Continue anyway after error
    setTimeout(handleComplete, 2000);
  };

  const handleComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowVideo(false);
      onComplete();
    }, 1000);
  };

  const handleSkip = () => {
    if (playerRef.current && playerRef.current.stopVideo) {
      playerRef.current.stopVideo();
    }
    handleComplete();
  };

  const handleContainerClick = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      if (playerRef.current) {
        playerRef.current.unMute();
        playerRef.current.setVolume(15);
        console.log('🔊 Audio enabled via container click');
      }
    }
  };

  if (!showVideo) return null;

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 cursor-pointer ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
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

      {/* Audio interaction prompt */}
      {!userInteracted && playerReady && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20">
          <div className="text-center text-white bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9v6l4-3-4-3z" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">Click anywhere to enable audio</p>
            <p className="text-sm text-white/70">Experience the full intro with sound</p>
          </div>
        </div>
      )}

      {/* YouTube Video Container - Completely Hidden Interface */}
      <div className="w-full h-full relative overflow-hidden">
        {/* Extra large container to hide YouTube interface */}
        <div 
          className="absolute"
          style={{
            top: '-100px',
            left: '-100px',
            width: 'calc(100% + 200px)',
            height: 'calc(100% + 200px)',
          }}
        >
          <div 
            id="youtube-player"
            className="w-full h-full"
          />
        </div>
        
        {/* Overlay to ensure no YouTube interface is visible */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top overlay */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-black"></div>
          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black"></div>
          {/* Left overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-black"></div>
          {/* Right overlay */}
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-black"></div>
        </div>
      </div>

      {/* Audio indicator */}
      <div className={`absolute top-6 left-6 md:top-8 md:left-8 z-60 flex items-center gap-2 text-white/80 text-sm transition-all duration-500 ${
        fadeOut ? 'opacity-0 transform translate-x-[-16px]' : 'opacity-100 transform translate-x-0'
      }`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          userInteracted ? 'bg-green-500' : 'bg-yellow-500'
        }`}></div>
        <span className="font-light">
          {userInteracted ? '🔊 Audio 15%' : '🔇 Click for audio'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
          style={{
            width: '0%',
            animation: 'progress 15s linear forwards'
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