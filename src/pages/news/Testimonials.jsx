import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      key: '1',
      image: "/images/andrescastrologosolo.png"
    },
    {
      key: '2',
      image: "/images/andrescastrologosolo.png"
    },
    {
      key: '3',
      image: "/images/andrescastrologosolo.png" // You can change this image path in the JSON
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#0c0c0c] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-wider">
          {t('publications.testimonials.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                <img
                  src={testimonial.image}
                  alt={t(`publications.testimonials.items.${testimonial.key}.author`)}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <blockquote className="text-xl font-light mb-6 leading-relaxed">
                "{t(`publications.testimonials.items.${testimonial.key}.quote`)}"
              </blockquote>
              <cite className="not-italic">
                <div className="text-lg font-medium">
                  {t(`publications.testimonials.items.${testimonial.key}.author`)}
                </div>
                <div className="text-gray-400 text-sm">
                  {t(`publications.testimonials.items.${testimonial.key}.role`)}
                </div>
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}