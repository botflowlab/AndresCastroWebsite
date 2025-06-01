import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

function NewsSection() {
  const articles = [
    {
      image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
      title: "SUSTAINABLE DESIGN AWARD 2023",
      excerpt: "Andres Castro's innovative approach to sustainable architecture earns prestigious recognition at the International Design Awards.",
      source: "ARCHITECTURE TODAY",
      date: "MARCH 15, 2024"
    },
    {
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      title: "LEADING THE GREEN REVOLUTION",
      excerpt: "How Andres Castro is reshaping Costa Rica's architectural landscape with sustainable practices and innovative design solutions.",
      source: "ECO BUILDERS MAGAZINE",
      date: "FEBRUARY 28, 2024"
    },
    {
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      title: "FUTURE OF ARCHITECTURE",
      excerpt: "Andres Castro discusses the integration of bioclimatic principles in modern architectural design and its impact on urban development.",
      source: "DESIGN QUARTERLY",
      date: "JANUARY 20, 2024"
    }
  ];

  return (
    <section className="w-full py-20 bg-white relative">
      {/* Background Pattern Container with Gradient Overlays */}
      <div className="absolute inset-0 w-full h-full">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 w-full h-full opacity-100"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Top Fade */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"
        />
        {/* Bottom Fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Navigation and Title Header */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0c0c0c] font-cormorant tracking-[.25em] text-center mb-8">
            IN THE NEWS
          </h2>
          <div className="flex gap-4">
            <button className="p-2 border-2 border-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white transition-colors">
              <FiArrowLeft size={24} />
            </button>
            <button className="p-2 border-2 border-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white transition-colors">
              <FiArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-[#0c0c0c] text-center mb-16 max-w-3xl mx-auto font-light">
          As one of the leading architects in sustainable design, Andres Castro continues to push the boundaries of eco-friendly architecture in Costa Rica.
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <article key={index} className="flex flex-col">
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#0c0c0c]">{article.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow font-light">{article.excerpt}</p>
              <p className="text-sm text-[#0c0c0c] font-medium">
                {article.source} | {article.date}
              </p>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-block border-2 border-[#0c0c0c] px-8 py-3 text-lg font-medium hover:bg-[#0c0c0c] hover:text-white transition-all duration-300 tracking-[.25em] uppercase">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;