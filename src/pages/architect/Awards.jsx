import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Awards() {
  const { t } = useTranslation();
  
  const awards = [
    {
      year: '2012',
      key: 'national'
    },
    {
      year: '2007',
      key: 'honor'
    },
    {
      year: '2007',
      key: 'first'
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/theArchitect/acAwards.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl lg:text-7xl font-light mb-6 tracking-wider text-white">
            {t('architect.awards.title')}
          </h2>
          <div className="w-32 h-1 bg-white mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {awards.map((award, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <div className="border-b border-white/20 pb-4 mb-4">
                <span className="text-white/70 text-lg">{award.year}</span>
                <h3 className="text-3xl font-medium text-white mt-2">
                  {t(`architect.awards.items.${award.key}.title`)}
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-2xl text-white/90">
                  {t(`architect.awards.items.${award.key}.event`)}
                </p>
                <p className="text-xl text-white/70 italic">
                  {t(`architect.awards.items.${award.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-3xl md:text-4xl text-white/80 font-light italic">
            {t('architect.awards.quote')}
          </p>
        </div>
      </div>
    </section>
  );
}