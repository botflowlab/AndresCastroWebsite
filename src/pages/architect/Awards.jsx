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
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#0c0c0c] z-5"></div>
      
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat z-1"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wider text-white">
            PREMIOS Y RECONOCIMIENTOS
          </h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {awards.map((award, index) => (
            <div 
              key={index}
              className="backdrop-blur-sm bg-black/30 rounded-lg overflow-hidden"
            >
              <div className="relative p-8">
                <div className="border-b border-white/20 pb-4 mb-4">
                  <span className="text-white/70 text-sm">{award.year}</span>
                  <h3 className="text-2xl font-medium text-white mt-2">{award.title}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-xl text-white/90">{award.event}</p>
                  <p className="text-white/70 italic">{award.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center z-10 relative">
          <p className="text-2xl text-white/80 font-light italic">
            "La arquitectura es el testigo insobornable de la historia"
          </p>
        </div>
      </div>
    </section>
  );
}