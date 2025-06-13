import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import SkeletonLoader from '../../components/ui/SkeletonLoader';
import { useImagePreloader } from '../../hooks/useImagePreloader';

export default function ProjectGrid({ projects, loading = false }) {
  // Extract all project images for preloading
  const allImages = projects.map(project => project.images?.[0]).filter(Boolean);
  
  // Preload priority images (first 4 projects)
  const { loadingProgress, isPreloading } = useImagePreloader(allImages, true);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading progress bar */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span>Loading projects...</span>
            <span className="font-medium">Please wait</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Skeleton grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-4">
              <SkeletonLoader 
                type="image" 
                aspectRatio="aspect-[7/9]" 
                className="rounded-lg"
              />
              <SkeletonLoader 
                type="text" 
                className="h-6"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-2xl font-light text-gray-800 mb-2">No Projects Found</h3>
        <p className="text-gray-600">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Preloading progress (only show if actively preloading) */}
      {isPreloading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm text-blue-800 mb-2">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Optimizing images for better experience...
            </span>
            <span className="font-medium">{Math.round(loadingProgress)}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <Link 
            key={project.id} 
            to={`/proyectos/${project.slug}`}
            className="block transform transition-all duration-300 hover:-translate-y-2"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <ProjectCard 
              title={project.title} 
              image={project.images?.[0] || '/images/placeholder.jpg'} 
            />
          </Link>
        ))}
      </div>

      {/* Load more indicator (if needed) */}
      {projects.length > 0 && projects.length % 10 === 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="ml-2">More projects available</span>
          </div>
        </div>
      )}
    </div>
  );
}