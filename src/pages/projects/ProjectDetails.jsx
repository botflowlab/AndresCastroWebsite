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
  const [relatedProjectsLoading, setRelatedProjectsLoading] = useState(true);
  const mountedRef = useRef(true);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    mountedRef.current = true;
    
    // Reset all states when project changes
    setImageErrors(new Map());
    setImageLoaded(new Set());
    setRetryAttempts(new Map());
    setVideoStates(new Map());
    setRelatedProjectsLoading(true);
    
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
    
    // Fetch related projects with a slight delay for smooth UX
    setTimeout(() => {
      fetchRelatedProjects();
    }, 100);

    return () => {
      mountedRef.current = false;
    };
  }, [project.id, project.category]);

  const fetchRelatedProjects = async () => {
    try {
      setRelatedProjectsLoading(true);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', project.category)
        .neq('id', project.id)
        .limit(3);

      if (error) throw error;
      
      // Simulate minimum loading time for smooth UX
      setTimeout(() => {
        if (mountedRef.current) {
          setRelatedProjects(data || []);
          setRelatedProjectsLoading(false);
        }
      }, 300);
      
    } catch (error) {
      console.error('Error fetching related projects:', error);
      setRelatedProjectsLoading(false);
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

  // Helper function to get the best preview image from a project
  const getProjectPreviewImage = (projectImages) => {
    if (!projectImages || projectImages.length === 0) {
      return '/images/placeholder.jpg';
    }

    // Find the first non-video file for preview
    const firstImage = projectImages.find(media => !isVideoFile(media));
    
    // If we found an image, use it
    if (firstImage) {
      return getImageUrl(firstImage);
    }

    // If all files are videos, we'll use a placeholder
    return '/images/placeholder.jpg';
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

      {/* Related Projects Section - ENHANCED WITH BEAUTIFUL LOADING */}
      <section className="bg-white py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
            {t('projects.details.relatedProjects')}
          </h2>
          
          {relatedProjectsLoading ? (
            /* Beautiful loading state for related projects */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[7/9] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => {
                // Get the best preview image (first non-video file)
                const previewImageUrl = getProjectPreviewImage(relatedProject.images);
                
                return (
                  <Link 
                    key={relatedProject.id} 
                    to={`/proyectos/${relatedProject.slug}`}
                    className={`group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative aspect-[7/9] overflow-hidden bg-gray-100 rounded-lg shadow-lg">
                      <img
                        src={previewImageUrl}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          // Fallback to placeholder if the preview image fails
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      
                      {/* Video indicator if the project has videos */}
                      {relatedProject.images?.some(media => isVideoFile(media)) && (
                        <div className="absolute top-3 right-3 bg-black/80 text-white p-2 rounded-full backdrop-blur-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 px-2">
                      <h3 className="text-xl font-medium text-center whitespace-normal line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
                        {truncateText(relatedProject.title, 50)}
                      </h3>
                      <p className="text-gray-600 text-center mt-1">
                        {relatedProject.location}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* No related projects state */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-500">No related projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}