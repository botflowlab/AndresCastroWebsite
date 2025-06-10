import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Experience() {
  const { t } = useTranslation();
  
  const education = [
    {
      year: '2023',
      key: 'masterClass'
    },
    {
      year: '2022',
      key: 'senses'
    },
    {
      year: '2020',
      key: 'master'
    },
    {
      year: '2018',
      key: 'licentiate'
    },
    {
      year: '2016',
      key: 'bachelor'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white relative mb-20 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-4xl lg:text-7xl font-light mb-6 tracking-wider">
            {t('architect.experience.title')}
          </h2>
          <div className="w-32 h-1 bg-black mx-auto"></div>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2"></div>

          <div className="space-y-16">
            {education.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-[#D19345] rounded-full transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} pl-16 md:pl-0`}>
                  <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <span className="text-lg font-medium text-gray-500">{item.year}</span>
                    <h3 className="text-3xl font-medium mt-2 mb-2">
                      {t(`architect.experience.items.${item.key}.type`)}
                    </h3>
                    <h4 className="text-2xl text-gray-800 mb-2">
                      {t(`architect.experience.items.${item.key}.title`)}
                    </h4>
                    <p className="text-xl text-gray-600">
                      {t(`architect.experience.items.${item.key}.institution`)}
                    </p>
                    {t(`architect.experience.items.${item.key}.specialization`, { defaultValue: '' }) && (
                      <p className="text-lg text-gray-500 mt-2 italic">
                        {t(`architect.experience.items.${item.key}.specialization`)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}