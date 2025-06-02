import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative w-full md:w-1/2 pb-[100%] md:pb-[50%] mr-200">
            <img
              src="/images/theArchitect/ac02.jpg"
              alt="Andres Castro"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 tracking-wide whitespace-nowrap">
              MEET THE ARCHITECT
            </h2>
            <div className="space-y-6 text-lg text-black-600">
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
          </div>
        </div>
      </div>
    </section>
  );
}