import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function Projects() {
  const { t } = useTranslation();

  return (
    <div className="font-neutra min-w-[1024px]">
      <Navbar />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0c0c0c] mb-8 text-center">
              {t('nav.projects')}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example Project Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg" 
                  alt="Modern House"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Modern Residence</h3>
                  <p className="text-gray-600">Sustainable modern home with bioclimatic design principles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Projects;