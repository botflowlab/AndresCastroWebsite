import React, { useState, useEffect, useRef } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Auto-complete after 30 seconds if user doesn't skip
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 12000);

    // Start video and audio after 1.5 seconds
    const startTimer = setTimeout(() => {
      startVideoAndAudio();
    }, 1500);

    return () => {
      clearTimeout(autoCompleteTimer);
      clearTimeout(startTimer);
      // Clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startVideoAndAudio = async () => {
    try {
      // Start the audio
      if (!audioStarted) {
        audioRef.current = new Audio('/sound/introaudio2.MP3');
        audioRef.current.volume = 0.05; // Set volume to 30%
        
        // Try to play audio
        const audioPlayPromise = audioRef.current.play();
        if (audioPlayPromise !== undefined) {
          audioPlayPromise
            .then(() => {
              console.log('🔊 Audio started successfully');
              setAudioStarted(true);
            })
            .catch(error => {
              console.warn('⚠️ Audio autoplay blocked:', error);
              // Audio will start when user interacts with the page
            });
        }
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
  const handleUserInteraction = () => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          console.log('🔊 Audio started after user interaction');
          setAudioStarted(true);
        })
        .catch(error => {
          console.warn('⚠️ Audio still blocked:', error);
        });
    }
  };

  if (!showVideo) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleUserInteraction}
    >
      {/* Skip Button - Always Visible */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-8 right-8 z-60 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40 font-medium"
        style={{ zIndex: 9999 }}
      >
        Skip Intro
      </button>

      {/* Audio Status Indicator */}
      <div className="absolute top-8 left-8 z-60 flex items-center gap-2 text-white/80 text-sm">
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          audioStarted ? 'bg-green-500' : 'bg-yellow-500'
        }`}></div>
        <span className="font-light">
          {audioStarted ? '🔊 Audio Playing' : '🔇 Click to enable audio'}
        </span>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-40">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-light">Andrés Castro Arquitectura</p>
            <p className="text-sm text-white/70 mt-2"></p>
          </div>
        </div>
      )}

      {/* Vimeo Video */}
      <div className="w-full h-full relative">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1095705289?autoplay=1&muted=0&loop=0&background=0&controls=0"
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
          className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
          style={{
            width: '0%',
            animation: 'progress 12s linear forwards'
          }}
        />
      </div>

      {/* User Interaction Prompt */}
      {!audioStarted && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20 pointer-events-none">
          <div className="text-center text-white bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-pulse">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9v6l4-3-4-3z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Click anywhere to enable audio</p>
          </div>
        </div>
      )}

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