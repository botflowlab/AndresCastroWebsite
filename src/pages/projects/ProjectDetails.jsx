import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { getImageUrl, isVideoFile } from '../../utils/r2Storage';
import ArchitecturalDrawings from './ArchitecturalDrawings';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [imageErrors, setImageErrors] = useState(new Map());
  const [imageLoaded, setImageLoaded] = useState(new Set());
  const [imageSrcs, setImageSrcs] = useState(new Map());
  const [retryAttempts, setRetryAttempts] = useState(new Map());
  const [videoStates, setVideoStates] = useState(new Map());
  const mountedRef = useRef(true);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    mountedRef.current = true;
    fetchRelatedProjects();
    
    // Initialize media sources with cache-busting for fresh navigation
    const sideBySideMedia = project.images?.slice(0, 2) || [];
    const initialSrcs = new Map();
    const navigationCacheBuster = `?nav=${Date.now()}`;
    
    sideBySideMedia.forEach((media, index) => {
      const baseUrl = getImageUrl(media);
      const urlWithCacheBuster = `${baseUrl}${navigationCacheBuster}`;
      initialSrcs.set(index, urlWithCacheBuster);
    });
    
    setImageSrcs(initialSrcs);
    
    // Reset all states for fresh page load
    setImageErrors(new Map());
    setImageLoaded(new Set());
    setRetryAttempts(new Map());
    setVideoStates(new Map());

    return () => {
      mountedRef.current = false;
    };
  }, [project.id, project.category, project.images]);

  const fetchRelatedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', project.category)
        .neq('id', project.id)
        .limit(3);

      if (error) throw error;
      setRelatedProjects(data || []);
    } catch (error) {
      console.error('Error fetching related projects:', error);
    }
  };

  // Helper function to test CORS access
  const testCorsAccess = async (mediaUrl) => {
    try {
      const response = await fetch(mediaUrl, { 
        method: 'HEAD',
        mode: 'cors',
        cache: 'no-cache'
      });
      return response.ok;
    } catch (error) {
      return error.name === 'TypeError' && error.message.includes('CORS');
    }
  };

  // Get the first two media items from the project
  const sideBySideMedia = project.images?.slice(0, 2) || [];

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Video control functions
  const getVideoState = (index) => {
    return videoStates.get(index) || { isPlaying: false, isMuted: true };
  };

  const updateVideoState = (index, updates) => {
    setVideoStates(prev => new Map([...prev, [index, { ...getVideoState(index), ...updates }]]));
  };

  const handleVideoHover = (index, isHovering) => {
    const video = videoRefs.current.get(index);
    if (!video) return;

    if (isHovering) {
      video.play();
      updateVideoState(index, { isPlaying: true });
    } else {
      video.pause();
      updateVideoState(index, { isPlaying: false });
    }
  };

  const handleImageError = async (index) => {
    if (!mountedRef.current) return;
    
    const originalUrl = sideBySideMedia[index];
    const processedUrl = getImageUrl(originalUrl);
    const currentAttempts = retryAttempts.get(index) || 0;
    
    console.error('❌ ProjectDetails media failed at index:', index, {
      originalUrl,
      processedUrl,
      attempt: currentAttempts + 1
    });

    // Test if it's a CORS issue
    const isCorsError = await testCorsAccess(processedUrl);
    
    setImageErrors(prev => new Map([...prev, [index, {
      isCorsError,
      originalUrl,
      processedUrl,
      timestamp: Date.now(),
      attempt: currentAttempts + 1
    }]]));

    // Auto-retry up to 2 times with increasing delays
    if (currentAttempts < 2) {
      const delay = (currentAttempts + 1) * 1000; // 1s, 2s delays
      console.log(`🔄 Auto-retrying media ${index} in ${delay}ms (attempt ${currentAttempts + 2}/3)`);
      
      setTimeout(() => {
        if (mountedRef.current) {
          autoRetryMediaLoad(index);
        }
      }, delay);
    }
  };

  const handleImageLoad = (index) => {
    if (!mountedRef.current) return;
    
    console.log('✅ ProjectDetails media loaded at index:', index);
    setImageLoaded(prev => new Set([...prev, index]));
    
    // Clear any previous error for this media
    setImageErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(index);
      return newErrors;
    });
    
    // Reset retry attempts
    setRetryAttempts(prev => {
      const newAttempts = new Map(prev);
      newAttempts.delete(index);
      return newAttempts;
    });
  };

  const autoRetryMediaLoad = (index) => {
    if (!mountedRef.current) return;
    
    const currentAttempts = retryAttempts.get(index) || 0;
    const newAttempts = currentAttempts + 1;
    
    console.log(`🔄 Auto-retry ${newAttempts} for media ${index}`);
    
    // Update retry attempts
    setRetryAttempts(prev => new Map([...prev, [index, newAttempts]]));
    
    // Clear error and loaded states
    setImageErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(index);
      return newErrors;
    });
    
    setImageLoaded(prev => {
      const newLoaded = new Set(prev);
      newLoaded.delete(index);
      return newLoaded;
    });

    // Update media source with new cache-busting parameter
    const originalUrl = sideBySideMedia[index];
    const baseUrl = getImageUrl(originalUrl);
    const cacheBustUrl = `${baseUrl}?retry=${newAttempts}&t=${Date.now()}`;
    
    setImageSrcs(prev => new Map([...prev, [index, cacheBustUrl]]));
  };

  const manualRetryMediaLoad = (index) => {
    console.log('🔄 Manual retry for media:', index);
    
    // Reset retry attempts for manual retry
    setRetryAttempts(prev => new Map([...prev, [index, 0]]));
    
    // Clear error and loaded states
    setImageErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(index);
      return newErrors;
    });
    
    setImageLoaded(prev => {
      const newLoaded = new Set(prev);
      newLoaded.delete(index);
      return newLoaded;
    });

    // Update media source with manual retry cache-busting
    const originalUrl = sideBySideMedia[index];
    const baseUrl = getImageUrl(originalUrl);
    const cacheBustUrl = `${baseUrl}?manual=${Date.now()}`;
    
    setImageSrcs(prev => new Map([...prev, [index, cacheBustUrl]]));
  };

  return (
    <>
      <section className="bg-[#0c0c0c] text-white py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 uppercase">
            {project.title}
          </h1>

          {/* Location */}
          <p className="text-xl md:text-2xl text-white/70 mb-4">
            {project.location}
          </p>

          {/* Separator */}
          <div className="w-32 h-px bg-white/30 mx-auto mb-12"></div>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg md:text-3xl leading-relaxed text-white/90">
              {project.description}
            </p>
          </div>

          {/* Side by Side Media */}
          {sideBySideMedia.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-16">
              {sideBySideMedia.map((media, index) => {
                const mediaUrl = imageSrcs.get(index) || getImageUrl(media);
                const errorInfo = imageErrors.get(index);
                const hasError = Boolean(errorInfo);
                const isLoaded = imageLoaded.has(index);
                const attempts = retryAttempts.get(index) || 0;
                const isVideo = isVideoFile(media);
                
                return (
                  <div key={index} className="relative aspect-[12/16] overflow-hidden">
                    {!hasError ? (
                      <>
                        {isVideo ? (
                          <div 
                            className="relative w-full h-full"
                            onMouseEnter={() => handleVideoHover(index, true)}
                            onMouseLeave={() => handleVideoHover(index, false)}
                          >
                            <video
                              ref={(el) => {
                                if (el) videoRefs.current.set(index, el);
                              }}
                              src={mediaUrl}
                              className={`w-full h-full object-cover hover:scale-105 transition-all duration-700 ${
                                isLoaded ? 'opacity-100' : 'opacity-0'
                              }`}
                              muted
                              loop
                              playsInline
                              onError={() => handleImageError(index)}
                              onLoadedData={() => handleImageLoad(index)}
                              crossOrigin="anonymous"
                            />
                            {/* Video overlay indicator */}
                            <div className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                            {/* Hover play indicator */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                              <div className="bg-white/90 rounded-full p-4">
                                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={mediaUrl}
                            alt={`${project.title} detail ${index + 1}`}
                            className={`w-full h-full object-cover hover:scale-105 transition-all duration-700 ${
                              isLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            loading="lazy"
                            onError={() => handleImageError(index)}
                            onLoad={() => handleImageLoad(index)}
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        
                        {/* Loading state */}
                        {!isLoaded && (
                          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-sm">Loading {isVideo ? 'video' : 'image'}...</p>
                              {attempts > 0 && (
                                <p className="text-xs text-gray-300 mt-1">
                                  Retry attempt {attempts}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <div className="text-center text-white p-4">
                          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-lg font-semibold mb-2">
                            {errorInfo?.isCorsError ? 'CORS ERROR' : 'MEDIA FAILED'}
                          </p>
                          <p className="text-sm text-gray-300 mb-2">
                            {errorInfo?.isCorsError 
                              ? 'Cross-origin request blocked'
                              : `${isVideo ? 'Video' : 'Image'} could not be loaded`
                            }
                          </p>
                          <p className="text-xs text-gray-400 mb-4">
                            Failed after {errorInfo?.attempt || 1} attempt{(errorInfo?.attempt || 1) > 1 ? 's' : ''}
                          </p>
                          <button
                            onClick={() => manualRetryMediaLoad(index)}
                            className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                          >
                            Retry Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Architectural Drawings Section */}
      <ArchitecturalDrawings project={project} />

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="bg-white py-20 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
              {t('projects.details.relatedProjects')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link 
                  key={relatedProject.id} 
                  to={`/proyectos/${relatedProject.slug}`}
                  className="group"
                >
                  <div className="aspect-[7/9] overflow-hidden bg-gray-100 rounded-lg">
                    <img
                      src={getImageUrl(relatedProject.images?.[0]) || '/images/placeholder.jpg'}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-center px-4 whitespace-normal line-clamp-2">
                    {truncateText(relatedProject.title, 50)}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {relatedProject.location}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}