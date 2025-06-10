import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Trajectory() {
  const { t } = useTranslation();
  
  const categories = [
    'houses',
    'condos', 
    'commercial',
    'banking',
    'offices',
    'institutional'
  ];

  return (
    <section className="py-40 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl lg:text-7xl font-light mb-6 tracking-wider text-[#0c0c0c]">
            {t('architect.trajectory.title')}
          </h2>
          <div className="w-32 h-1 bg-[#0c0c0c] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="p-8 border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <h3 className="text-3xl font-medium text-[#0c0c0c] mb-6 pb-4 border-b border-gray-200">
                {t(`architect.trajectory.categories.${category}.title`)}
              </h3>
              <ul className="space-y-4">
                {t(`architect.trajectory.categories.${category}.items`, { returnObjects: true }).map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="text-xl text-gray-600 flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#0c0c0c] rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}