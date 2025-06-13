import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { getImageUrl, isVideoFile } from '../../utils/r2Storage';
import ArchitecturalDrawings from './ArchitecturalDrawings';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [imageLoaded, setImageLoaded] = useState(new Set());
  const [videoStates, setVideoStates] = useState(new Map());
  const mountedRef = useRef(true);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    mountedRef.current = true;
    fetchRelatedProjects();
    
    // Reset states for new project
    setImageErrors(new Set());
    setImageLoaded(new Set());
    setVideoStates(new Map());

    return () => {
      mountedRef.current = false;
    };
  }, [project.id, project.category]);

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

  const handleMediaError = (index) => {
    if (!mountedRef.current) return;
    
    console.error('❌ ProjectDetails media failed at index:', index);
    setImageErrors(prev => new Set([...prev, index]));
  };

  const handleMediaLoad = (index) => {
    if (!mountedRef.current) return;
    
    console.log('✅ ProjectDetails media loaded at index:', index);
    setImageLoaded(prev => new Set([...prev, index]));
    
    // Clear any previous error for this media
    setImageErrors(prev => {
      const newErrors = new Set(prev);
      newErrors.delete(index);
      return newErrors;
    });
  };

  const retryMediaLoad = (index) => {
    console.log('🔄 Manual retry for media:', index);
    
    // Clear error and loaded states
    setImageErrors(prev => {
      const newErrors = new Set(prev);
      newErrors.delete(index);
      return newErrors;
    });
    
    setImageLoaded(prev => {
      const newLoaded = new Set(prev);
      newLoaded.delete(index);
      return newLoaded;
    });
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
                const mediaUrl = getImageUrl(media);
                const hasError = imageErrors.has(index);
                const isLoaded = imageLoaded.has(index);
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
                              preload="metadata"
                              onError={() => handleMediaError(index)}
                              onLoadedData={() => handleMediaLoad(index)}
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
                            decode="async"
                            onError={() => handleMediaError(index)}
                            onLoad={() => handleMediaLoad(index)}
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
                          <p className="text-lg font-semibold mb-2">MEDIA FAILED</p>
                          <p className="text-sm text-gray-300 mb-4">
                            {`${isVideo ? 'Video' : 'Image'} could not be loaded`}
                          </p>
                          <button
                            onClick={() => retryMediaLoad(index)}
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
                      loading="lazy"
                      decode="async"
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