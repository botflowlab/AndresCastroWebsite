import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();

  // Get the first two images from the project
  const sideBySideImages = project.images?.slice(0, 2) || [];

  return (
    <section className="bg-[#0c0c0c] text-white py-20 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 uppercase">
          {project.title}
        </h1>

        {/* Location */}
        <p className="text-xl md:text-2xl text-white/70 mb-4">
          {project.location}
        </p>

        {/* Separator */}
        <div className="w-32 h-px bg-white/30 mx-auto mb-12"></div>

        {/* Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg md:text-3xl leading-relaxed text-white/90">
            {project.description}
          </p>
        </div>

        {/* Side by Side Images */}
        {sideBySideImages.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-16">
            {sideBySideImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={`${project.title} detail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}