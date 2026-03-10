import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useTranslation();
  
  return (
    <section className="py-32 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Enhanced Image Layout */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative mb-8">
              <div className="aspect-[9/14] overflow-hidden rounded-lg shadow-2xl">
                <img
                  src="/images/theArchitect/about2.jpg"
                  alt="Andres Castro"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Main image decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10 rounded-lg"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10 rounded-lg"></div>
            </div>

            {/* Secondary Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Arc2 Image */}
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/theArchitect/arc2.JPG"
                    alt="Andres Castro - Professional"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Arc3 Image */}
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/theArchitect/arc3.JPG"
                    alt="Andres Castro - Architect"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Floating accent elements */}
            <div className="absolute top-1/2 -left-4 w-2 h-16 bg-[#D19345] transform -translate-y-1/2 rounded-full"></div>
            <div className="absolute bottom-1/4 -right-4 w-2 h-12 bg-[#D19345] rounded-full"></div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:pl-12">
            {/* Small Title */}
            <h3 className="text-lg font-light tracking-[0.2em] text-gray-600 mb-4">
              {t('architect.about.subtitle')}
            </h3>

            {/* Main Title */}
            <h2 className="text-5xl font-light mb-8 text-[#0c0c0c]">
              {t('architect.about.name')}
            </h2>

            {/* Separator Line */}
            <div className="w-24 h-1 bg-[#0c0c0c] mb-8"></div>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <p>
                {t('architect.about.intro')}
              </p>
              <p>
                {t('architect.about.description1')}
              </p>
              <p>
                {t('architect.about.description2')}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center group">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2 group-hover:text-[#D19345] transition-colors duration-300">25+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.experience')}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2 group-hover:text-[#D19345] transition-colors duration-300">150+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.projects')}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2 group-hover:text-[#D19345] transition-colors duration-300">15+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.awards')}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2 group-hover:text-[#D19345] transition-colors duration-300">+50</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.publications')}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              to="/contacto"
              className="group relative inline-block border-2 border-[#0c0c0c] px-12 py-4 text-lg font-medium transition-all duration-500 overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-[#0c0c0c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              
              {/* Button text */}
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {t('architect.about.cta')}
              </span>
              
              {/* Button accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D19345] group-hover:w-full transition-all duration-500 delay-200"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-gray-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-gray-200 rounded-full opacity-20"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D19345] rounded-full"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#0c0c0c] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-[#D19345] rounded-full"></div>
      </div>
    </section>
  );
}