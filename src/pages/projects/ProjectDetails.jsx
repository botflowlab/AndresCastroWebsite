import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { getImageUrl } from '../../utils/r2Storage';
import ArchitecturalDrawings from './ArchitecturalDrawings';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [imageLoaded, setImageLoaded] = useState(new Set());

  useEffect(() => {
    fetchRelatedProjects();
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

  // Get the first two images from the project
  const sideBySideImages = project.images?.slice(0, 2) || [];

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleImageError = (index) => {
    setImageErrors(prev => new Set([...prev, index]));
    console.error('❌ ProjectDetails: Failed to load side-by-side image at index:', index, {
      originalUrl: sideBySideImages[index],
      processedUrl: getImageUrl(sideBySideImages[index]),
      projectTitle: project.title
    });
  };

  const handleImageLoad = (index) => {
    setImageLoaded(prev => new Set([...prev, index]));
    console.log('✅ ProjectDetails: Image loaded at index:', index, {
      url: getImageUrl(sideBySideImages[index]),
      projectTitle: project.title
    });
  };

  const retryImageLoad = (index) => {
    console.log('🔄 ProjectDetails: Retrying image at index:', index);
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    setImageLoaded(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
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

          {/* Side by Side Images */}
          {sideBySideImages.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-16">
              {sideBySideImages.map((image, index) => {
                const imageUrl = getImageUrl(image);
                const hasError = imageErrors.has(index);
                const isLoaded = imageLoaded.has(index);
                
                console.log(`🖼️ ProjectDetails: Rendering image ${index + 1}:`, {
                  original: image,
                  processed: imageUrl,
                  hasError,
                  isLoaded
                });

                return (
                  <div key={index} className="relative aspect-[12/16] overflow-hidden">
                    {!hasError ? (
                      <>
                        {/* Loading state */}
                        {!isLoaded && (
                          <div className="absolute inset-0 bg-blue-900 flex items-center justify-center z-10">
                            <div className="text-center text-blue-200">
                              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-sm font-medium">Loading Image...</p>
                              <p className="text-xs opacity-75 mt-1">R2 Storage</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Actual image */}
                        <img
                          src={imageUrl}
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
                      </>
                    ) : (
                      /* Error state */
                      <div className="w-full h-full flex items-center justify-center bg-red-900 border-2 border-red-700">
                        <div className="text-center text-red-200 p-4">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <p className="text-xs font-bold mb-2">IMAGE FAILED</p>
                          <p className="text-xs opacity-75 mb-3">R2 Storage Issue</p>
                          
                          {/* Retry button */}
                          <button
                            onClick={() => retryImageLoad(index)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-500 transition-colors mb-3"
                          >
                            Retry Load
                          </button>
                          
                          {/* Debug info */}
                          <div className="text-xs bg-red-800 p-2 rounded opacity-75">
                            <p className="font-semibold">Debug:</p>
                            <p className="break-all">Original: {image?.substring(0, 30)}...</p>
                            <p className="break-all">Final: {imageUrl?.substring(0, 30)}...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Debug info for images */}
          {sideBySideImages.length > 0 && (
            <div className="mt-8 text-xs text-white/50">
              <p>Images: {sideBySideImages.length} | Loaded: {imageLoaded.size} | Errors: {imageErrors.size}</p>
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