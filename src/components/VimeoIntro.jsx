import React, { useState, useEffect, useRef } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);
  const iframeRef = useRef(null);
  const startTimerRef = useRef(null);

  useEffect(() => {
    // Auto-complete after 11 seconds if user doesn't skip
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 11000);

    // Preload audio immediately
    preloadAudio();

    // Start video and audio after 1.5 seconds
    startTimerRef.current = setTimeout(() => {
      startVideoAndAudio();
    }, 1500);

    // Add global click listener for user interaction
    const handleGlobalClick = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        tryStartAudio();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('touchstart', handleGlobalClick);

    return () => {
      clearTimeout(autoCompleteTimer);
      if (startTimerRef.current) {
        clearTimeout(startTimerRef.current);
      }
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchstart', handleGlobalClick);
      
      // Clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const preloadAudio = () => {
    try {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';
      audioRef.current.volume = 0.15; // Set volume to 15%
      audioRef.current.src = '/sound/introaudio2.MP3';
      
      // Add event listeners
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('🔊 Audio preloaded successfully');
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('❌ Audio preload error:', e);
      });

      // Load the audio
      audioRef.current.load();
    } catch (error) {
      console.error('Error preloading audio:', error);
    }
  };

  const tryStartAudio = async () => {
    if (!audioRef.current || audioStarted) return;

    try {
      // Reset audio to beginning
      audioRef.current.currentTime = 0;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log('🔊 Audio started successfully');
        setAudioStarted(true);
        return true;
      }
    } catch (error) {
      console.warn('⚠️ Audio autoplay blocked:', error.message);
      
      // Try with even lower volume
      if (audioRef.current) {
        audioRef.current.volume = 0.05;
        try {
          await audioRef.current.play();
          console.log('🔊 Audio started with lower volume');
          setAudioStarted(true);
          return true;
        } catch (secondError) {
          console.warn('⚠️ Audio still blocked even with lower volume');
        }
      }
    }
    return false;
  };

  const startVideoAndAudio = async () => {
    try {
      console.log('🎬 Starting video and audio...');
      
      // Try to start audio
      const audioSuccess = await tryStartAudio();
      
      if (!audioSuccess) {
        console.log('🔇 Audio blocked, will try again on user interaction');
      }

      // The Vimeo iframe should start automatically due to autoplay=1 parameter
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error starting video and audio:', error);
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
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

  // Handle user interaction to start audio if it was blocked
  const handleUserInteraction = async () => {
    if (!userInteracted) {
      setUserInteracted(true);
      await tryStartAudio();
    }
  };

  if (!showVideo) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Skip Button - Always Visible */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-8 right-8 z-60 bg-black/60 hover:bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/60 font-medium shadow-lg"
        style={{ zIndex: 9999 }}
      >
        Skip Intro
      </button>

      {/* Audio Status Indicator */}
      <div className="absolute top-8 left-8 z-60 flex items-center gap-2 text-white/90 text-sm bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm">
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          audioStarted ? 'bg-green-500' : 'bg-yellow-500'
        }`}></div>
        <span className="font-light">
          {audioStarted ? '🔊 Audio' : '🔇 Tap for audio'}
        </span>
      </div>

      {/* User Interaction Prompt */}
      {!userInteracted && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20 pointer-events-none">
          <div className="text-center text-white bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-pulse">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9v6l4-3-4-3z" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-1">Tap anywhere for audio</p>
            <p className="text-sm text-white/70">Experience the full intro with sound</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-40">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-black font-light">Andrés Castro Arquitectura</p>
            <p className="text-sm text-gray-600 mt-2">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Vimeo Video */}
      <div className="w-full h-full relative">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1095705289?autoplay=1&muted=0&loop=0&background=0&controls=0&dnt=1"
          className="w-full h-full object-cover"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => {
            console.log('📹 Vimeo iframe loaded');
          }}
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
          className="h-full bg-white rounded-full transition-all duration-100 ease-linear shadow-lg"
          style={{
            width: '0%',
            animation: 'progress 11s linear forwards'
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