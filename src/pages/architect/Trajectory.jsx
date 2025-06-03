import React from 'react';

export default function Trajectory() {
  const categories = [
    {
      title: 'Diseño de casas de habitación',
      items: ['Lujo', 'Medio lujo', 'Playa', 'Montaña', 'Condominios']
    },
    {
      title: 'Condominios residenciales',
      items: ['Horizontales', 'Verticales', 'Mixtos']
    },
    {
      title: 'Proyectos comerciales',
      items: [
        'Franquicias internacionales (COSÍ, LOCATEL)',
        'Tiendas',
        'Farmacias',
        'Restaurantes'
      ]
    },
    {
      title: 'Arquitectura bancaria',
      items: [
        'Sucursales',
        'Remodelaciones',
        'Bóvedas',
        'Cajeros automáticos',
        'Oficinas'
      ]
    },
    {
      title: 'Oficinas',
      items: [
        'Bufetes',
        'Call centers',
        'Empresas públicas',
        'Empresas privadas'
      ]
    },
    {
      title: 'Institucional',
      items: [
        'Escuela Pública de Bahía Ballena (premiada)',
        'Centro Educativo "Mi Patria" (proyecto futuro)'
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl lg:text-7xl font-light mb-6 tracking-wider text-[#0c0c0c]">
            TRAYECTORIA ARQUITECTÓNICA
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
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, itemIndex) => (
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