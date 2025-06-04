import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();

  return (
    <section className="bg-black text-white py-20 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">
          {project.title}
        </h1>

        {/* Location */}
        <p className="text-xl md:text-2xl text-white/70 mb-4">
          San José, Costa Rica
        </p>

        {/* Price */}
        <p className="text-2xl md:text-3xl font-light mb-8">
          $8,395,000
        </p>

        {/* Separator */}
        <div className="h-px w-32 bg-white/30 mx-auto mb-12"></div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-2xl mx-auto">
          <div>
            <p className="text-3xl font-light mb-2">4</p>
            <p className="text-sm uppercase tracking-wider text-white/70">Beds</p>
          </div>
          <div>
            <p className="text-3xl font-light mb-2">4</p>
            <p className="text-sm uppercase tracking-wider text-white/70">Full Baths</p>
          </div>
          <div>
            <p className="text-3xl font-light mb-2">1</p>
            <p className="text-sm uppercase tracking-wider text-white/70">Half Bath</p>
          </div>
          <div>
            <p className="text-3xl font-light mb-2">4,527</p>
            <p className="text-sm uppercase tracking-wider text-white/70">SQFT.</p>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-12">
            {project.description}
          </p>
        </div>

        {/* Share Button */}
        <button className="border border-white/30 text-white/90 px-8 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
          Share Property
        </button>
      </div>
    </section>
  );
}