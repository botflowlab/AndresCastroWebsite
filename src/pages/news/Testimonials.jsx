import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Working with Andrés transformed our vision into reality. His sustainable approach to architecture is unmatched.",
      author: "Maria González",
      role: "CEO, EcoHabitat",
      image: "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg"
    },
    {
      quote: "The attention to detail and commitment to sustainability in every project is remarkable.",
      author: "Carlos Rodríguez",
      role: "Development Director",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg"
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#0c0c0c] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-wider">
          TESTIMONIALS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="text-2xl font-light mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <cite className="not-italic">
                <div className="text-xl font-medium">{testimonial.author}</div>
                <div className="text-gray-400">{testimonial.role}</div>
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}