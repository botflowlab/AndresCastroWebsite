import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

function ProjectsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    { id: 1, image: '/images/placeholder.jpg', title: 'Project 1' },
    { id: 2, image: '/images/placeholder.jpg', title: 'Project 2' },
    { id: 3, image: '/images/placeholder.jpg', title: 'Project 3' },
    { id: 4, image: '/images/placeholder.jpg', title: 'Project 4' },
    { id: 5, image: '/images/placeholder.jpg', title: 'Project 5' },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <section className="w-full py-32 bg-[#f5f5f0] relative overflow-hidden">
      <div className="max-w-[90vw] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('nav.projects')}</h2>
          <p className="text-xl font-light max-w-3xl mx-auto">
            Explore our diverse portfolio of sustainable and bioclimatic architectural projects
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Projects Row */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          >
            {projects.map((project) => (
              <div 
                key={project.id}
                className="min-w-[33.333%] px-4"
              >
                <div className="aspect-[7/9] overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 bottom-8 z-10 p-2 text-black hover:text-gray-600 transition-colors"
            aria-label="Previous slide"
          >
            <FiArrowLeft size={24} />
          </button>
        </div>

        {/* View All Projects Button */}
        <div className="absolute right-8 bottom-8">
          <button
            onClick={() => navigate('/proyectos')}
            className="inline-block border-2 border-black px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;