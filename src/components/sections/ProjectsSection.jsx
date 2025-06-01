import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 bg-[#0c0c0c]">
      <div className="max-w-8xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 font-cormorant tracking-[.25em] uppercase"
          >
            {t('nav.projects')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Project Cards */}
          <div className="relative w-full pb-[100%] overflow-hidden">
            <img 
              src="/images/placeholder.jpg" 
              alt="Project 1"
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
          <div className="relative w-full pb-[100%] overflow-hidden">
            <img 
              src="/images/placeholder.jpg" 
              alt="Project 1"
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
          <div className="relative w-full pb-[100%] overflow-hidden">
            <img 
              src="/images/placeholder.jpg" 
              alt="Project 1"
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
          <div className="relative w-full pb-[100%] overflow-hidden">
            <img 
              src="/images/placeholder.jpg" 
              alt="Project 1"
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/proyectos')}
            className="inline-block border-2 text-white border-white px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 tracking-[.25em] uppercase"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;