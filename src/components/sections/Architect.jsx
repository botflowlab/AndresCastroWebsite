import React from 'react';
import { useTranslation } from 'react-i18next';

function Architect() {
  const { t } = useTranslation();

  return (
    <section className="w-full flex flex-col justify-start overflow-hidden py-8 md:py-16">
      {/* Top Section with Centered Content */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{t('architect.title')}</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl mb-4 font-light">{t('architect.subtitle')}</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
          {t('architect.intro')}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex items-center px-4 md:px-10">
        <div className="w-full flex flex-col md:flex-row h-[60vh]">
          {/* Left Column - Image */}
          <div className="w-full md:w-3/5 h-full">
            <img
              src="/images/home/ac1.jpg"
              alt="Professional architect"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-2/5 bg-[#f5f5f0] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div className="flex-grow">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#0c0c0c] mb-6">
                {t('architect.name')}
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#0c0c0c] font-medium mb-8">
                {t('architect.description')}
              </p>
            </div>
            <div className="mt-auto">
              <hr className="border-t border-gray-300 mb-8" />
              <a
                href="/arquitecto"
                className="inline-block border-2 border-black px-4 py-2 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 text-center w-full"
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