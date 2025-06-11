import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { getImageUrl } from '../../utils/r2Storage';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching projects...');
      
      // Test connection first
      const { data: testData, error: testError } = await supabase
        .from('projects')
        .select('count', { count: 'exact', head: true });
      
      if (testError) {
        console.error('❌ Connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }

      // Fetch projects
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching projects:', error);
        throw new Error(`Failed to fetch projects: ${error.message}`);
      }
      
      console.log('✅ Fetched projects:', data);
      setProjects(data || []);
    } catch (error) {
      console.error('❌ Error fetching projects:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleImageError = (projectId) => {
    setImageErrors(prev => new Set([...prev, projectId]));
    console.warn('❌ Failed to load project image for project:', projectId);
  };

  const getProjectImageUrl = (project) => {
    if (!project.images || project.images.length === 0) {
      return '/images/placeholder.jpg';
    }
    
    return getImageUrl(project.images[0]);
  };

  // Show error state
  if (error) {
    return (
      <section className="w-full py-12 bg-[#0c0c0c]">
        <div className="max-w-8xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-8 font-cormorant tracking-[.25em] uppercase">
              {t('home.projects.title')}
            </h2>
          </div>
          <div className="text-center text-red-400 mb-8">
            <p>Unable to load projects. Please check your connection.</p>
            <button 
              onClick={fetchProjects}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-[#0c0c0c]">
      <div className="max-w-8xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-8 font-cormorant tracking-[.25em] uppercase"
          >
            {t('home.projects.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            // Loading placeholders
            [...Array(4)].map((_, i) => (
              <div key={i} className="relative w-full pb-[100%] bg-gray-800 animate-pulse rounded-lg" />
            ))
          ) : (
            // Project cards
            projects.map((project, index) => (
              <div key={project.id} className="relative w-full pb-[100%] overflow-hidden">
                {!imageErrors.has(project.id) ? (
                  <img 
                    src={getProjectImageUrl(project)} 
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                    onError={() => handleImageError(project.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800">
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Image not available</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/proyectos')}
            className="inline-block border-2 text-white border-white px-8 py-3 text-lg font-medium tracking-[.25em] uppercase transition-all duration-300 hover:bg-white hover:text-[#0c0c0c]"
          >
            {t('home.projects.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;