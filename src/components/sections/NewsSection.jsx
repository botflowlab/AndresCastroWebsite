import React from 'react';
import { Link } from 'react-router-dom';

function NewsSection() {
  const videos = [
    {
      id: "IJ2QtRYl0dA",
      title: "Arquitectura Sostenible",
      thumbnail: `https://img.youtube.com/vi/IJ2QtRYl0dA/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=IJ2QtRYl0dA"
    },
    {
      id: "wTrOXg-EVHE",
      title: "Diseño Bioclimático",
      thumbnail: `https://img.youtube.com/vi/wTrOXg-EVHE/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=wTrOXg-EVHE"
    }
  ];

  const articles = [
    {
      image: "/images/publications/news1.jpg",
      title: "SUSTAINABLE DESIGN AWARD 2023",
      excerpt: "Andres Castro's innovative approach to sustainable architecture earns prestigious recognition at the International Design Awards.",
      source: "ARCHITECTURE TODAY",
      date: "MARCH 15, 2024"
    },
    {
      image: "/images/publications/news2.jpg",
      title: "LEADING THE GREEN REVOLUTION",
      excerpt: "How Andres Castro is reshaping Costa Rica's architectural landscape with sustainable practices and innovative design solutions.",
      source: "ECO BUILDERS MAGAZINE",
      date: "FEBRUARY 28, 2024"
    }
  ];

  return (
    <section className="py-32 bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/concrete1.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-light mb-8">
            LATEST NEWS
          </h2>
          <div className="w-32 h-1 bg-[#0c0c0c] mx-auto mb-12"></div>
        </div>

        {/* Featured Videos */}
        <div className="mb-20">
          <h3 className="text-3xl font-light mb-12 text-center">
            FEATURED VIDEOS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="aspect-video overflow-hidden rounded-lg relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-medium mt-4 text-center group-hover:text-gray-600 transition-colors">
                  {video.title}
                </h4>
              </a>
            ))}
          </div>
        </div>

        {/* Latest Articles */}
        <div>
          <h3 className="text-3xl font-light mb-12 text-center">
            ARTICLES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {articles.map((article, index) => (
              <article key={index} className="group">
                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-6">
                  <img
                    src={/images/news/1.jpg}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-medium group-hover:text-gray-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="text-sm text-gray-500">
                    {article.source} • {article.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link
            to="/noticias"
            className="inline-block border-2 border-[#0c0c0c] px-12 py-4 text-lg font-medium hover:bg-[#0c0c0c] hover:text-white transition-all duration-300"
          >
            VIEW ALL NEWS
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;