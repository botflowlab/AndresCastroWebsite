import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Experience() {
  const { t } = useTranslation();
  
  const education = [
    {
      year: '2023',
      title: 'Glenn Murcutt Master Class',
      institution: 'Architecture Foundation Australia, Sydney',
      specialization: 'Sustainable Architecture',
      type: 'Diploma'
    },
    {
      year: '2022',
      title: 'Architecture for the Senses',
      institution: 'Dublin, Ireland',
      type: 'Diploma'
    },
    {
      year: '2020',
      title: 'Master in Tropical Architecture',
      institution: 'Universidad de Costa Rica (UCR)',
      type: 'Master's Degree'
    },
    {
      year: '2018',
      title: 'Architecture',
      institution: 'Universidad Autónoma de Centroamérica (UACA)',
      type: 'Licentiate'
    },
    {
      year: '2016',
      title: 'Architecture',
      institution: 'Universidad Autónoma de Centroamérica (UACA)',
      type: 'Bachelor's Degree'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wider">
            ACADEMIC FORMATION
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {education.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Year Marker */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-black rounded-full transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} pl-16 md:pl-0`}>
                  <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <span className="text-sm font-medium text-gray-500">{item.year}</span>
                    <h3 className="text-2xl font-medium mt-2 mb-2">{item.type}</h3>
                    <h4 className="text-xl text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.institution}</p>
                    {item.specialization && (
                      <p className="text-gray-500 mt-2 italic">{item.specialization}</p>
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