import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);
      
      // Test connection first
      const { data: testData, error: testError } = await supabase
        .from('projects')
        .select('count', { count: 'exact', head: true });
      
      if (testError) {
        console.error('Connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }

      // Fetch projects
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        throw new Error(`Failed to fetch projects: ${error.message}`);
      }
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Show error state
  if (error) {
    return (
      <section className="w-full py-12 bg-[#0c0c0c]">
        <div className="max-w-8xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-8 font-cormorant tracking-[.25em] uppercase">
              {t('nav.projects')}
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
            {t('nav.projects')}
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
                <img 
                  src={project.images?.[0] || '/images/placeholder.jpg'} 
                  alt={project.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                />
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/proyectos')}
            className="inline-block border-2 text-white border-white px-8 py-3 text-lg font-medium tracking-[.25em] uppercase transition-all duration-300 hover:bg-white hover:text-[#0c0c0c]"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;