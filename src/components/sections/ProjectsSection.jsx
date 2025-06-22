import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [animationStarted, setAnimationStarted] = useState(false);

  // Use intersection observer to trigger animations when section comes into view
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
    }
  }, [inView, animationStarted]);

  // Static project data using the 4 uploaded images
  const projects = [
    {
      id: 'project1',
      title: '',
      location: '',
      image: '/images/home/project1.jpg'
    },
    {
      id: 'project2', 
      title: 'Residencia Contemporánea',
      location: 'Escazú, Costa Rica',
      image: '/images/home/project2.jpg'
    },
    {
      id: 'project3',
      title: 'Villa Arquitectónica',
      location: 'Santa Ana, Costa Rica', 
      image: '/images/home/project3.jpg'
    },
    {
      id: 'project4',
      title: 'Casa de Diseño',
      location: 'Heredia, Costa Rica',
      image: '/images/home/project4.jpg'
    }
  ];

  return (
    <section ref={ref} className="w-full py-12 bg-[#0c0c0c] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/20 rounded-full transition-all duration-[3000ms] ease-out ${
              animationStarted 
                ? 'opacity-100 animate-pulse' 
                : 'opacity-0'
            }`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${1500 + Math.random() * 2000}ms`,
              animationDuration: `${4000 + Math.random() * 2000}ms`
            }}
          />
        ))}
      </div>

      <div className="max-w-8xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className={`transition-all duration-[2500ms] ease-out ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-16'
          }`}>
            <h2 className="relative text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-8 font-cormorant tracking-[.25em] uppercase">
              <span className="relative inline-block">
                {t('home.projects.title')}
              </span>
            </h2>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative w-full pb-[100%] overflow-hidden rounded-lg transition-all duration-[1800ms] ease-out cursor-pointer ${
                animationStarted 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-12 scale-90'
              }`}
              style={{ 
                transitionDelay: `${1000 + index * 250}ms`,
                willChange: 'transform, opacity'
              }}
              onClick={() => navigate('/proyectos')}
            >
              {/* Image container */}
              <div className="absolute inset-0 bg-gray-800 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Project title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-white font-medium text-lg leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {project.location}
                  </p>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500 rounded-lg"></div>
              </div>

              {/* Corner accent lines */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/0 group-hover:border-white/60 transition-all duration-500"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/0 group-hover:border-white/60 transition-all duration-500"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/0 group-hover:border-white/60 transition-all duration-500"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/0 group-hover:border-white/60 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <div className={`transition-all duration-[2000ms] ease-out delay-1800 ${
            animationStarted 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-8 scale-95'
          }`}>
            <button
              onClick={() => navigate('/proyectos')}
              className="group relative inline-block border-2 text-white border-white px-12 py-4 text-lg font-medium tracking-[.25em] uppercase transition-all duration-500 overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              
              {/* Button text */}
              <span className="relative z-10 group-hover:text-[#0c0c0c] transition-colors duration-500">
                {t('home.projects.cta')}
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-white/20 transition-all duration-500"></div>
              
              {/* Arrow indicator */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Section border glow */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[2000ms] ease-out delay-2000 ${
        animationStarted 
          ? 'opacity-100 scale-x-100' 
          : 'opacity-0 scale-x-0'
      }`}></div>
    </section>
  );
}

export default ProjectsSection;