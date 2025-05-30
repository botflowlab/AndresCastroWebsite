import React from 'react';
import { useTranslation } from 'react-i18next';

function Architect() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col justify-start overflow-hidden py-8 md:py-0">
      {/* Top Section with Centered Content */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{t('architect.title')}</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl mb-4 font-light">{t('architect.subtitle')}</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
          {t('architect.intro')}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex-1 flex items-center px-4 mt-4">
        <div className="container mx-auto flex flex-col md:flex-row h-full">
          {/* Left Column - Image */}
          <div className="w-full md:w-[60%] h-[500px] md:h-[600px]">
            <img
              src="/images/home/ac1.jpg"
              alt="Professional architect"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-[40%] bg-[#f5f5f0] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between h-[500px] md:h-[600px]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">{t('architect.name')}</h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-600 font-light">
                {t('architect.description')}
              </p>
            </div>
            <div>
              <hr className="border-t border-gray-300 mb-6" />
              <a
                href="/arquitecto"
                className="inline-block border-2 border-black px-2 py-1 text-base sm:text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 text-center w-full"
              >
                {t('architect.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Architect;