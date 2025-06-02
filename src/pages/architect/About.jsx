import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4 bg-[#0c0c0c] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wider text-white">
            MEET THE ARCHITECT
          </h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src="/images/theArchitect/ac02.jpg"
              alt="Andres Castro"
              className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="w-full md:w-1/2">
            <div className="space-y-8 text-lg text-white/80">
              <p className="leading-relaxed">
                With over two decades of experience in sustainable architecture, Andrés Castro has established himself as a leading figure in eco-friendly and bioclimatic design throughout Costa Rica.
              </p>
              <p className="leading-relaxed">
                As a pioneer in sustainable architecture, Andrés has led numerous groundbreaking projects that seamlessly blend environmental consciousness with stunning design. His work has earned international recognition and has set new standards for sustainable architecture in Central America.
              </p>
              <p className="leading-relaxed">
                Andrés, equipped with a deep understanding of sustainable practices and innovative design solutions, leads a team dedicated to creating spaces that harmonize with their environment while meeting the highest standards of architectural excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}