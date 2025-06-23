import React, { useState, useEffect, useRef } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Auto-complete after 11 seconds if user doesn't skip
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 11000);

    // Start video after 1.5 seconds (but not audio automatically)
    const startTimer = setTimeout(() => {
      startVideo();
    }, 1500);

    // Preload audio
    audioRef.current = new Audio('/sound/introaudio2.MP3');
    audioRef.current.volume = 0.3; // Set volume to 30%
    audioRef.current.preload = 'auto';

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

  const startVideo = () => {
    // The Vimeo iframe should start automatically due to autoplay=1 parameter
    setIsLoading(false);
  };

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (audioPlaying) {
        // Pause audio
        audioRef.current.pause();
        setAudioPlaying(false);
        console.log('🔇 Audio paused');
      } else {
        // Play audio
        await audioRef.current.play();
        setAudioPlaying(true);
        setAudioStarted(true);
        console.log('🔊 Audio started');
      }
    } catch (error) {
      console.warn('⚠️ Audio control error:', error);
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

  if (!showVideo) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Audio Control Button - Top Left */}
      <button
        onClick={toggleAudio}
        className="absolute top-8 left-8 z-60 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
        style={{ zIndex: 9999 }}
        title={audioPlaying ? 'Pause Audio' : 'Play Audio'}
      >
        {audioPlaying ? (
          // Pause icon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          // Play icon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Skip Button - Top Right */}
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

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-40">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-black font-light">Andrés Castro Arquitectura</p>
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