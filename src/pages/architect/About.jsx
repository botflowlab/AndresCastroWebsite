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
            <div className="aspect-[9/16] overflow-hidden">
              <img
                src="/images/home/personal.jpg"
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
              THE ARCHITECT
            </h3>

            {/* Main Title */}
            <h2 className="text-5xl font-light mb-8 text-[#0c0c0c]">
              ANDRÉS CASTRO
            </h2>

            {/* Separator Line */}
            <div className="w-24 h-1 bg-[#0c0c0c] mb-8"></div>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <p>
                With over two decades of experience in sustainable architecture, Andrés Castro has established himself as a leading figure in eco-friendly and bioclimatic design throughout Costa Rica.
              </p>
              <p>
                As a pioneer in sustainable architecture, Andrés has led numerous groundbreaking projects that seamlessly blend environmental consciousness with stunning design. His work has earned international recognition and has set new standards for sustainable architecture in Central America.
              </p>
              <p>
                Andrés, equipped with a deep understanding of sustainable practices and innovative design solutions, leads a team dedicated to creating spaces that harmonize with their environment while meeting the highest standards of architectural excellence.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">25+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">150+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">15+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#0c0c0c] mb-2">+50</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Publications</div>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              to="/contacto"
              className="inline-block border-2 border-[#0c0c0c] px-12 py-4 text-lg font-medium hover:bg-[#0c0c0c] hover:text-white transition-all duration-300"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}