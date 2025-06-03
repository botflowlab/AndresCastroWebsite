import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { IoClose, IoExpand } from 'react-icons/io5';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (project?.images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
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
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src={project.images?.[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4">
              {project.description}
            </p>
          </div>
        </div>
      </div>

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

      {/* Image Gallery */}
      <div className="max-w-8xl mx-auto px-4 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">Gallery</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
              {project.images?.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="aspect-[16/9] relative group cursor-pointer"
                       onClick={() => setIsLightboxOpen(true)}>
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <IoExpand className="text-white text-4xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <FiArrowLeft className="text-2xl" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <FiArrowRight className="text-2xl" />
          </button>
        </div>

        {/* Image Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {project.images?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'bg-black w-6' : 'bg-gray-300'
              }`}
            />
          ))}
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
            src={project.images?.[currentImageIndex]}
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