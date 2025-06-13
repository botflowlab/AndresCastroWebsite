import React, { useState, useRef } from 'react';
import { FiArrowLeft, FiArrowRight, FiMaximize, FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { getImageUrl, isVideoFile } from '../../utils/r2Storage';

export default function ProjectHero({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [videoStates, setVideoStates] = useState(new Map());
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef(new Map());

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (project?.images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (project?.images?.length || 0) - 1 : prev - 1
    );
  };

  const scrollThumbnails = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleImageError = (index) => {
    setImageErrors(prev => new Set([...prev, index]));
    console.warn('❌ Failed to load media at index:', index, project?.images?.[index]);
  };

  // Video control functions
  const getVideoState = (index) => {
    return videoStates.get(index) || { isPlaying: false, isMuted: true, volume: 0.5 };
  };

  const updateVideoState = (index, updates) => {
    setVideoStates(prev => new Map([...prev, [index, { ...getVideoState(index), ...updates }]]));
  };

  const togglePlayPause = (index) => {
    const video = videoRefs.current.get(index);
    if (!video) return;

    const currentState = getVideoState(index);
    if (currentState.isPlaying) {
      video.pause();
      updateVideoState(index, { isPlaying: false });
    } else {
      video.play();
      updateVideoState(index, { isPlaying: true });
    }
  };

  const toggleMute = (index) => {
    const video = videoRefs.current.get(index);
    if (!video) return;

    const currentState = getVideoState(index);
    video.muted = !currentState.isMuted;
    updateVideoState(index, { isMuted: !currentState.isMuted });
  };

  const handleVolumeChange = (index, volume) => {
    const video = videoRefs.current.get(index);
    if (!video) return;

    video.volume = volume;
    updateVideoState(index, { volume, isMuted: volume === 0 });
  };

  if (!project?.images?.length) return null;

  const currentMedia = project.images[currentImageIndex];
  const isCurrentVideo = isVideoFile(currentMedia);

  return (
    <>
      <div className="w-full flex flex-col p-6">
        {/* Main Media Container */}
        <div className="relative w-full">
          {/* Mobile Square Container */}
          <div className="md:hidden relative w-full pb-[100%]">
            <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
              {!imageErrors.has(currentImageIndex) ? (
                isCurrentVideo ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(currentImageIndex, el);
                      }}
                      src={getImageUrl(currentMedia)}
                      className="w-full h-full object-cover rounded-lg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={() => handleImageError(currentImageIndex)}
                      onLoadedData={() => updateVideoState(currentImageIndex, { isPlaying: true })}
                    />
                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-black/50 rounded-lg p-2">
                      <button
                        onClick={() => togglePlayPause(currentImageIndex)}
                        className="text-white p-1 hover:bg-white/20 rounded"
                      >
                        {getVideoState(currentImageIndex).isPlaying ? <FiPause /> : <FiPlay />}
                      </button>
                      <button
                        onClick={() => toggleMute(currentImageIndex)}
                        className="text-white p-1 hover:bg-white/20 rounded"
                      >
                        {getVideoState(currentImageIndex).isMuted ? <FiVolumeX /> : <FiVolume2 />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={getImageUrl(currentMedia)}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="eager"
                    onError={() => handleImageError(currentImageIndex)}
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white rounded-lg">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Media not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Full Height Container */}
          <div className="hidden md:block relative h-[calc(100vh-8rem)]">
            <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
              {!imageErrors.has(currentImageIndex) ? (
                isCurrentVideo ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(currentImageIndex, el);
                      }}
                      src={getImageUrl(currentMedia)}
                      className="w-full h-full object-cover rounded-lg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={() => handleImageError(currentImageIndex)}
                      onLoadedData={() => updateVideoState(currentImageIndex, { isPlaying: true })}
                    />
                    {/* Enhanced Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-black/0 backdrop-blur-sm rounded-lg p-3">
                      <button
                        onClick={() => togglePlayPause(currentImageIndex)}
                        className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        {getVideoState(currentImageIndex).isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={getImageUrl(currentMedia)}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="eager"
                    onError={() => handleImageError(currentImageIndex)}
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white rounded-lg">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Media not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 z-20"
            aria-label="View fullscreen"
          >
            <FiMaximize className="w-5 h-5" />
          </button>

          {/* Navigation Buttons */}
          {project.images.length > 1 && (
            <div className="absolute inset-x-0 bottom-1/2 flex items-center justify-between px-4 md:px-8 pointer-events-none transform translate-y-1/2">
              <button
                onClick={prevImage}
                className="pointer-events-auto border border-white bg-white/0 hover:bg-black hover:text-[#D19345] text-white p-3 md:p-5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Previous media"
              >
                <FiArrowLeft className="w-4 h-4 md:w-8 md:h-8" />
              </button>
              <button
                onClick={nextImage}
                className="pointer-events-auto border border-white bg-white/0 hover:bg-black hover:text-[#D19345] text-white p-3 md:p-5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Next media"
              >
                <FiArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation - Hidden on mobile */}
        {project.images.length > 1 && (
          <div className="hidden md:block bg-white py-8">
            <div className="max-w-8xl mx-auto px-8 relative">
              {/* Left scroll button */}
              <button
                onClick={() => scrollThumbnails('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Scroll thumbnails left"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>

              {/* Thumbnails container */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth mx-12"
                style={{ scrollBehavior: 'smooth' }}
              >
                {project.images.map((media, index) => {
                  const isThumbVideo = isVideoFile(media);
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden ${
                        currentImageIndex === index 
                          ? 'opacity-100 ring-2 ring-black' 
                          : 'opacity-50 hover:opacity-75'
                      }`}
                      style={{ width: '160px', height: '90px' }}
                      aria-label={`View ${isThumbVideo ? 'video' : 'image'} ${index + 1}`}
                    >
                      {!imageErrors.has(index) ? (
                        isThumbVideo ? (
                          <div className="relative w-full h-full">
                            <video
                              src={getImageUrl(media)}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              onError={() => handleImageError(index)}
                            />
                            {/* Video indicator */}
                            <div className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded">
                              <FiPlay size={12} />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={getImageUrl(media)}
                            alt={`${project.title} - Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={() => handleImageError(index)}
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right scroll button */}
              <button
                onClick={() => scrollThumbnails('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Scroll thumbnails right"
              >
                <FiArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white p-3 hover:text-gray-300 transition-colors z-30"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Media Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {!imageErrors.has(currentImageIndex) ? (
              isCurrentVideo ? (
                <div className="relative max-h-full max-w-full">
                  <video
                    src={getImageUrl(currentMedia)}
                    className="max-h-full max-w-full object-contain"
                    controls
                    autoPlay
                    onError={() => handleImageError(currentImageIndex)}
                  />
                </div>
              ) : (
                <img
                  src={getImageUrl(currentMedia)}
                  alt={`${project.title} - Media ${currentImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                  onError={() => handleImageError(currentImageIndex)}
                />
              )
            ) : (
              <div className="text-center text-white">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Media not available</p>
              </div>
            )}

            {/* Navigation in Fullscreen */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
                  aria-label="Previous media"
                >
                  <FiArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
                  aria-label="Next media"
                >
                  <FiArrowRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Media Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {project.images.length}
            {isCurrentVideo && <span className="ml-2">🎥</span>}
          </div>
        </div>
      )}
    </>
  );
}