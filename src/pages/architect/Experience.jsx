import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Experience() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4 bg-[#0c0c0c] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          {/* Right side - Image */}
          <div className="relative w-full md:w-1/2 pb-[100%] md:pb-[50%]">
            <img
              src="/images/theArchitect/ac03.jpg"
              alt="Andres Castro Experience"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Left side - Content */}
          <div className="w-full md:w-1/2">
            <div className="max-w-[80%]">
              <h2 className="text-4xl md:text-5xl text-white font-light mb-8 tracking-wide">
                PERSISTENCE ALWAYS BEATS RESISTANCE
              </h2>
              <div className="space-y-6 text-lg text-white">
                <p>
                  With over $100 Million in architectural projects completed, Andrés Castro has established a remarkable track record in sustainable and bioclimatic architecture. This success within the Costa Rican architectural community is founded on several primary principles that are implemented in every project, regardless of scale.
                </p>
                <p>
                  The firm handles all types of projects: from residential to commercial, specializing in sustainable design, bioclimatic architecture, and eco-friendly solutions. However, Andrés Castro has built partnered relationships with fellow top architects and developers both Nationwide and Globally.
                </p>
                <p>
                  We welcome all prospective clients to reach out with any questions or interest in working together. It would be our pleasure to help you create your sustainable dream space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}