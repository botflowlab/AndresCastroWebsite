import React from 'react';

export default function Awards() {
  const awards = [
    {
      year: '2012',
      title: 'Candidato al Premio Nacional de Arquitectura',
      event: 'Bienal Arquitectura Verde',
      description: 'Mejor integración con el paisaje natural existente'
    },
    {
      year: '2007',
      title: 'Primera Mención de Honor',
      event: '3ra Bienal de Arquitectura Veritas',
      description: 'Escuela de Bahía Ballena'
    },
    {
      year: '2007',
      title: 'Primer Lugar',
      event: 'Concurso Holcim & Fundación de Parques Nacionales',
      description: 'Construcción en armonía con el medio ambiente (Escuela de Bahía Ballena)'
    }
  ];

  return (
    <section className="py-40 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wider text-white">
            PREMIOS Y RECONOCIMIENTOS
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
                <h3 className="text-3xl font-medium text-white mt-2">{award.title}</h3>
              </div>
              <div className="space-y-2">
                <p className="text-2xl text-white/90">{award.event}</p>
                <p className="text-xl text-white/70 italic">{award.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-3xl md:text-4xl text-white/80 font-light italic">
            "La forma y la función siguen al confort"
          </p>
        </div>
      </div>
    </section>
  );
}