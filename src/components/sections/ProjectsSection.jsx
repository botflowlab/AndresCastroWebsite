import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
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
            className="hover:bg-black hover:text-white transition-all duration-300 inline-block border-2 text-white border-white px-8 py-3 text-lg font-medium tracking-[.25em] uppercase"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;