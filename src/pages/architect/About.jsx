import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="relative flex flex-col md:flex-row items-start gap-12 md:gap-24">
        
        {/* Left side - Image */}
        <div className="relative w-full md:w-1/2 lg:w-[50%] pb-[100%] md:pb-[60%] -ml-10 md:-ml-20 lg:-ml-32">
          <div className="absolute top-0 left-0 w-full h-full">
            <img
              src="/images/theArchitect/ac02.jpg"
              alt="Andres Castro"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
    
        {/* Right side - Content */}
        <div className="max-w-screen-md mx-auto w-full md:pl-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8 leading-tight tracking-wide">
            MEET THE ARCHITECT
          </h2>
          <div className="space-y-6 text-base md:text-lg text-black">
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
    </section>

  );
}