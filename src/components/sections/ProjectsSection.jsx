import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { supabase } from '../../supabaseClient';
import ImageWithLoading from '../ui/ImageWithLoading';
import SkeletonLoader from '../ui/SkeletonLoader';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 ProjectsSection: Fetching projects...');
      
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
      
      console.log('✅ ProjectsSection: Fetched projects:', data?.length || 0);
      
      // Simulate minimum loading time for smooth UX
      setTimeout(() => {
        setProjects(data || []);
        setLoading(false);
      }, 800);
      
    } catch (error) {
      console.error('❌ ProjectsSection: Error fetching projects:', error);
      setError(error.message);
      setLoading(false);
    }
  }

  const handleRetry = () => {
    fetchProjects();
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
          <div className="text-center text-red-400 mb-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-white mb-4">Unable to load projects</p>
            <p className="text-red-400 text-sm mb-6">Please check your connection and try again</p>
            <button 
              onClick={handleRetry}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </section>
    );
  }

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
        {/* Section Header with dramatic entrance */}
        <div className="text-center mb-8">
          {/* Main Title with staggered letter animation effect */}
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
        
        {/* Projects Grid with enhanced loading states */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            // Beautiful loading placeholders with staggered animation
            [...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`relative w-full pb-[100%] transition-all duration-[1500ms] ease-out ${
                  animationStarted 
                    ? 'opacity-100 transform translate-y-0 scale-100' 
                    : 'opacity-0 transform translate-y-8 scale-95'
                }`}
                style={{ animationDelay: `${800 + i * 200}ms` }}
              >
                <SkeletonLoader 
                  type="image" 
                  aspectRatio="aspect-square" 
                  className="absolute inset-0 rounded-lg"
                />
              </div>
            ))
          ) : (
            // Project cards with sophisticated entrance animations
            projects.map((project, index) => (
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
                {/* Enhanced Image Container */}
                <div className="absolute inset-0 bg-gray-800 overflow-hidden rounded-lg">
                  <ImageWithLoading
                    src={project.images?.[0] || '/images/placeholder.jpg'}
                    alt={project.title}
                    aspectRatio="w-full h-full"
                    className="transition-all duration-700 group-hover:scale-110"
                    priority={index < 2} // Prioritize first 2 images
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
            ))
          )}
        </div>

        {/* CTA Button with elegant entrance */}
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