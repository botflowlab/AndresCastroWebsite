import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="w-full py-32 bg-[#BBB0A0]">
      <div className="max-w-8xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl sm:text-5xl md:text-6xl font-bold mb-8 font-cormorant text-white">{t('nav.projects')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Sample Project Cards */}
          <div className="aspect-[7/9] relative overflow-hidden">
            <img 
              src="/images/placeholder.jpg" 
              alt="Project 1"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
          <div className="aspect-[7/9] relative overflow-hidden">
            <img 
              src="/images/placeholder.jpg" 
              alt="Project 2"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
          <div className="aspect-[7/9] relative overflow-hidden">
            <img 
              src="/images/placeholder.jpg" 
              alt="Project 3"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/proyectos')}
            className="inline-block border-2 text-white border-white px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;