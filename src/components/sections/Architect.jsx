import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Architect() {
  const { t } = useTranslation();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#f8f8f8]">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/concrete1.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Top Content */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 text-[#0c0c0c]">
            THE ARCHITECT
          </h2>
          <div className="w-32 h-1 bg-[#0c0c0c] mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            {t('architect.intro')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Stats */}
          <div className="lg:col-span-3 space-y-12">
            <div className="text-center p-8 bg-white shadow-lg">
              <div className="text-5xl font-light text-[#0c0c0c] mb-4">25+</div>
              <div className="text-gray-600 uppercase tracking-wider text-sm">Years Experience</div>
            </div>
            <div className="text-center p-8 bg-white shadow-lg">
              <div className="text-5xl font-light text-[#0c0c0c] mb-4">150+</div>
              <div className="text-gray-600 uppercase tracking-wider text-sm">Projects</div>
            </div>
          </div>

          {/* Center - Image */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-square overflow-hidden">
              <img
                src="/images/home/personal2.jpg"
                alt="Andres Castro"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border-2 border-[#0c0c0c] -z-10"></div>
          </div>

          {/* Right Side - Text & CTA */}
          <div className="lg:col-span-3 space-y-8">
            <div className="text-xl text-gray-600 leading-relaxed">
              {t('architect.description')}
            </div>
            <Link 
              to="/arquitecto" 
              className="inline-block w-full text-center border-2 border-[#0c0c0c] px-8 py-4 text-lg font-medium hover:bg-[#0c0c0c] hover:text-white transition-all duration-300"
            >
              {t('architect.learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Architect;