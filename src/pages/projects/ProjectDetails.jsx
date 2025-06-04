import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();

  return (
    <section className="bg-black text-white py-20 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 uppercase">
          {project.title}
        </h1>

        {/* Location */}
        <p className="text-xl md:text-2xl text-white/70 mb-4">
          {project.location}
        </p>

        {/* Price */}
        <p className="text-2xl md:text-3xl font-light mb-8">
          ${project.price?.toLocaleString()}
        </p>

        {/* Separator */}
        <div className="w-32 h-px bg-white/30 mx-auto mb-12"></div>


        {/* Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            {project.description}
          </p>
        </div>

        {/* Share Button */}
        <button className="border border-white px-12 py-3 uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
          Share Property
        </button>
      </div>
    </section>
  );
}