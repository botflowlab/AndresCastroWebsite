import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      key: '1',
      image: "/images/publications/houselogo.png"
    },
    {
      key: '2',
      image: "/images/publications/cosilogo.png"
    },
    {
      key: '3',
      image: "/images/andrescastrologosolo.png"
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle geometric patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/5 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/10 rounded-full"></div>
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-wider leading-tight">
            {t('publications.testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            What our clients say about working with us
          </p>
        </div>
        
        {/* Enhanced Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-10 lg:p-12 border border-white/10 hover:border-white/20 transition-all duration-700 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 text-6xl text-white/10 font-serif leading-none">
                  "
                </div>
                
                {/* Logo/Image */}
                <div className="flex justify-center mb-10">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-3 border border-white/20 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={testimonial.image}
                      alt={t(`publications.testimonials.items.${testimonial.key}.author`)}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative z-10 mb-10">
                  <blockquote className="text-lg lg:text-xl font-light leading-relaxed text-white/90 italic">
                    "{t(`publications.testimonials.items.${testimonial.key}.quote`)}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6"></div>
                  
                  <cite className="not-italic">
                    <div className="text-lg font-medium text-white mb-2">
                      {t(`publications.testimonials.items.${testimonial.key}.author`)}
                    </div>
                    <div className="text-sm text-white/60 font-light tracking-wide">
                      {t(`publications.testimonials.items.${testimonial.key}.role`)}
                    </div>
                  </cite>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-20">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
          </div>
        </div>
      </div>

      {/* Enhanced background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none"></div>
    </section>
  );
}