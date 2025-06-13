import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import CachedImage from '../../components/common/CachedImage';
import { getImageUrl } from '../../utils/r2Storage';
import ArchitecturalDrawings from './ArchitecturalDrawings';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();
  const [relatedProjects, setRelatedProjects] = useState([]);

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
              {sideBySideImages.map((image, index) => (
                <div key={index} className="relative aspect-[12/16] overflow-hidden">
                  <CachedImage
                    src={getImageUrl(image)}
                    alt={`${project.title} detail ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                    loading="lazy"
                    showRetryButton={true}
                    loadingComponent={
                      <div className="text-center text-white">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm">Loading image...</p>
                      </div>
                    }
                    errorComponent={
                      <div className="text-center text-white p-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg font-semibold mb-2">IMAGE FAILED</p>
                        <p className="text-sm text-gray-300 mb-2">Image could not be loaded</p>
                      </div>
                    }
                  />
                </div>
              ))}
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
                    <CachedImage
                      src={getImageUrl(relatedProject.images?.[0]) || '/images/placeholder.jpg'}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      showRetryButton={false}
                      fallbackSrc="/images/placeholder.jpg"
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