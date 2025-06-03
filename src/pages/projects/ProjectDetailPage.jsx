import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { IoClose } from 'react-icons/io5';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ProjectHero from './ProjectHero';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  useEffect(() => {
    async function getProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    getProject();
  }, [slug]);

  const handleOpenLightbox = (index) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxImageIndex((prev) => 
      prev === (project?.images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setLightboxImageIndex((prev) => 
      prev === 0 ? (project?.images?.length || 0) - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProjectHero project={project} onOpenLightbox={handleOpenLightbox} />

      {/* Project Details */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">About the Project</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {project.description}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Project Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Category</h3>
                <p className="text-lg text-gray-700 capitalize">{project.category}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Location</h3>
                <p className="text-lg text-gray-700">Costa Rica</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <IoClose className="text-4xl" />
          </button>
          <img
            src={project.images?.[lightboxImageIndex]}
            alt={project.title}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <FiArrowLeft className="text-4xl" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <FiArrowRight className="text-4xl" />
          </button>
        </div>
      )}
    </div>
  );
}