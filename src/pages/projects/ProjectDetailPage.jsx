import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import ProjectHero from './ProjectHero';
import ProjectDetails from './ProjectDetails';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // If we already have a project and the slug changed, start transition
    if (project && project.slug !== slug) {
      setTransitioning(true);
      setFadeOut(true);
      
      // Wait for fade out animation before loading new project
      setTimeout(() => {
        getProject();
      }, 300);
    } else {
      // First load or same project
      getProject();
    }
  }, [slug, location.pathname]);

  async function getProject() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      
      // Simulate minimum loading time for smooth transition
      const minLoadTime = transitioning ? 500 : 0;
      
      setTimeout(() => {
        setProject(data);
        setLoading(false);
        setTransitioning(false);
        setFadeOut(false);
        
        // Scroll to top smoothly when new project loads
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, minLoadTime);
      
    } catch (error) {
      console.error('Error fetching project:', error);
      setLoading(false);
      setTransitioning(false);
      setFadeOut(false);
    }
  }

  // Loading state with beautiful spinner
  if (loading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          {/* Beautiful loading spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin border-t-black mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-gray-400 mx-auto"></div>
          </div>
          <h2 className="text-2xl font-light text-gray-700 mb-2">Loading Project</h2>
          <p className="text-gray-500">Please wait while we prepare the content...</p>
        </div>
      </div>
    );
  }

  // Project not found state
  if (!loading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V3a1 1 0 00-1-1h-4a1 1 0 00-1 1v3.306" />
            </svg>
          </div>
          <h2 className="text-3xl font-light text-gray-800 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Transition loading state (when switching between projects)
  if (transitioning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          {/* Elegant transition spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full animate-spin border-t-black mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-transparent rounded-full animate-pulse border-t-gray-400 mx-auto"></div>
          </div>
          <h3 className="text-xl font-light text-gray-700 mb-2">Switching Projects</h3>
          <p className="text-gray-500 text-sm">Loading new content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${
      fadeOut ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
    }`}>
      <ProjectHero project={project} key={project.id} />
      <ProjectDetails project={project} key={`details-${project.id}`} />
    </div>
  );
}