import React, { useState, useEffect, useRef } from 'react';

export default function VimeoIntro({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const audioRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Auto-complete after 11 seconds if user doesn't skip
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 11000);

    // Initialize audio
    initializeAudio();

    return () => {
      clearTimeout(autoCompleteTimer);
      // Clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const initializeAudio = async () => {
    try {
      // Create audio element
      audioRef.current = new Audio('/sound/introaudio2.MP3');
      audioRef.current.volume = 0.15; // 15% volume
      audioRef.current.muted = true; // Start muted
      audioRef.current.preload = 'auto';
      audioRef.current.loop = false;

      // Audio event listeners
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('🎵 Audio ready to play');
        setAudioReady(true);
        setIsLoading(false);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('❌ Audio error:', e);
        setAudioReady(false);
        setIsLoading(false);
      });

      audioRef.current.addEventListener('loadstart', () => {
        console.log('🎵 Audio loading started');
      });

      audioRef.current.addEventListener('ended', () => {
        console.log('🎵 Audio playback ended');
        setAudioPlaying(false);
      });

      audioRef.current.addEventListener('play', () => {
        setAudioPlaying(true);
      });

      audioRef.current.addEventListener('pause', () => {
        setAudioPlaying(false);
      });

      // Load the audio
      audioRef.current.load();

    } catch (error) {
      console.error('❌ Audio initialization failed:', error);
      setAudioReady(false);
      setIsLoading(false);
    }
  };

  // Handle video load (when iframe loads)
  const handleVideoLoad = () => {
    console.log('📹 Vimeo iframe loaded');
    setVideoStarted(true);
  };

  const toggleAudioMute = async () => {
    if (!audioRef.current || !audioReady) return;

    if (!audioPlaying) {
      // First click: Start playing the audio (unmuted)
      try {
        audioRef.current.currentTime = 0; // Start from beginning
        audioRef.current.muted = false; // Unmute
        await audioRef.current.play();
        setAudioMuted(false);
        console.log('🎵 MP3 audio started playing (unmuted)');
      } catch (error) {
        console.warn('⚠️ Could not start MP3 audio:', error);
        return;
      }
    } else {
      // Subsequent clicks: Toggle mute state
      const newMutedState = !audioMuted;
      audioRef.current.muted = newMutedState;
      setAudioMuted(newMutedState);
      
      console.log(newMutedState ? '🔇 MP3 audio muted' : '🔊 MP3 audio unmuted');
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
        onClick={toggleAudioMute}
        disabled={!audioReady}
        className={`absolute top-8 left-8 z-60 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40 ${
          !audioReady ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        style={{ zIndex: 9999 }}
        title={
          !audioReady 
            ? 'Audio Loading...' 
            : !audioPlaying 
              ? 'Play Background Music' 
              : audioMuted 
                ? 'Unmute Background Music' 
                : 'Mute Background Music'
        }
      >
        {!audioReady ? (
          // Loading icon
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : !audioPlaying ? (
          // Play icon (when audio hasn't started)
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        ) : audioMuted ? (
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

      {/* Audio Status Indicator */}
      <div className="absolute top-20 left-8 z-60 text-white text-xs">
        <div className={`bg-black/50 px-2 py-1 rounded ${audioReady ? 'text-green-300' : 'text-yellow-300'}`}>
          {audioReady ? '🎵 Background Music Ready' : '⏳ Loading Audio...'}
        </div>
        {audioReady && (
          <div className="bg-black/50 px-2 py-1 rounded mt-1">
            {!audioPlaying 
              ? '⏸️ Music Stopped' 
              : audioMuted 
                ? '🔇 Music Muted' 
                : '🔊 Music Playing'
            }
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-40">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-black font-light">Loading Andrés Castro Arquitectura</p>
            <p className="text-sm text-gray-600 mt-2">Preparing audio and video...</p>
          </div>
        </div>
      )}

      {/* Vimeo Video - Video audio is separate from MP3 */}
      {!isLoading && (
        <div className="w-full h-full relative">
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1095705289?autoplay=1&muted=0&loop=0&background=0&controls=0"
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      )}

      {/* Progress bar */}
      {!isLoading && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{
              width: '0%',
              animation: 'progress 11s linear forwards'
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
      `}</style>
    </div>
  );
}