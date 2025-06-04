import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectDetails({ project }) {
  const { t } = useTranslation();

  return (
    <section className="bg-black text-white py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Left Column - Title and Location */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              {project.title}
            </h1>
            <div className="h-px w-32 bg-white/30 mb-6"></div>
            <p className="text-xl md:text-2xl text-white/70">
              San José, Costa Rica
            </p>
          </div>

          {/* Right Column - Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white/70">
              <span className="text-lg uppercase tracking-wider">
                {t(`projects.categories.${project.category}`)}
              </span>
              <span className="h-px w-12 bg-white/30"></span>
              <span className="text-lg">2025</span>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}