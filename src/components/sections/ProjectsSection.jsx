import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 bg-[#BBB0A0]">
      <div className="max-w-8xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 font-cormorant tracking-[.25em] uppercase"
            style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
          >
            {t('nav.projects')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Project Cards with Window Style */}
          <div className="relative">
            <div className="aspect-[7/9] overflow-hidden rounded-t-[60px] border-4 border-white">
              <img 
                src="/images/placeholder.jpg" 
                alt="Project 1"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
              />
            </div>
            <div className="h-4 bg-white -mt-1"></div>
          </div>
          
          <div className="relative">
            <div className="aspect-[7/9] overflow-hidden rounded-t-[60px] border-4 border-white">
              <img 
                src="/images/placeholder.jpg" 
                alt="Project 2"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
              />
            </div>
            <div className="h-4 bg-white -mt-1"></div>
          </div>
          
          <div className="relative">
            <div className="aspect-[7/9] overflow-hidden rounded-t-[60px] border-4 border-white">
              <img 
                src="/images/placeholder.jpg" 
                alt="Project 3"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
              />
            </div>
            <div className="h-4 bg-white -mt-1"></div>
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