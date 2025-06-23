import React, { useState, useEffect, useRef } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true); // Start muted
  const audioRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Auto-complete after 11 seconds if user doesn't skip
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 11000);

    // Start video and audio after 1.5 seconds
    const startTimer = setTimeout(() => {
      startVideoAndAudio();
    }, 1500);

    // Setup audio
    audioRef.current = new Audio('/sound/introaudio2.MP3');
    audioRef.current.volume = 0.1; // Set volume to 30%
    audioRef.current.muted = true; // Start muted but playing
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

  const startVideoAndAudio = async () => {
    setIsLoading(false);
    
    // Start audio muted in background to stay synchronized
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log('🎵 Audio started (muted) in background for sync');
      } catch (error) {
        console.warn('⚠️ Audio autoplay failed:', error);
      }
    }
  };

  const toggleAudioMute = () => {
    if (!audioRef.current) return;

    const newMutedState = !audioMuted;
    audioRef.current.muted = newMutedState;
    setAudioMuted(newMutedState);
    
    console.log(newMutedState ? '🔇 Audio muted' : '🔊 Audio unmuted');
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
        onClick={toggleAudioMute}
        className="absolute top-8 left-8 z-60 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
        style={{ zIndex: 9999 }}
        title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {audioMuted ? (
          // Muted icon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          // Unmuted icon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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