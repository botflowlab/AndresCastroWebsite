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
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-[9/14] overflow-hidden">
              <img
                src="/images/home/about2.jpg"
                alt="Andres Castro"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 border-2 border-[#0c0c0c] -z-10"></div>
            <div className="absolute -top-8 -right-8 w-64 h-64 border-2 border-[#0c0c0c] -z-10"></div>
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
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">25+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.experience')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">150+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.projects')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">15+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.awards')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">+50</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {t('architect.about.stats.publications')}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              to="/contacto"
              className="inline-block border-2 border-[#0c0c0c] px-12 py-4 text-lg font-medium hover:bg-[#0c0c0c] hover:text-white transition-all duration-300"
            >
              {t('architect.about.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}