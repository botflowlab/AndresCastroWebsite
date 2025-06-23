import React, { useState, useEffect, useRef } from 'react';

export default function YouTubeIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

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

    return () => {
      clearTimeout(autoCompleteTimer);
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
          mute: 0, // Start unmuted for audio
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
      // Set volume to 10% for subtle background audio
      event.target.setVolume(10);
      
      // Ensure video plays
      event.target.playVideo();
      
      console.log('🔊 YouTube audio enabled at 10% volume');
    } catch (error) {
      console.warn('⚠️ Could not set YouTube volume:', error);
    }
  };

  const onPlayerStateChange = (event) => {
    // Video has started playing
    if (event.data === window.YT.PlayerState.PLAYING) {
      console.log('▶️ YouTube video playing with audio');
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

  if (!showVideo) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Skip Button */}
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

      {/* YouTube Video Container */}
      <div className="w-full h-full relative">
        <div 
          id="youtube-player"
          className="w-full h-full"
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
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-light">🔊 Audio 10%</span>
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