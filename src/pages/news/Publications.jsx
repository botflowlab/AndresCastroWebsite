import React from 'react';

export default function Publications() {
  const publications = [
    {
      title: "Sustainable Architecture in Costa Rica",
      journal: "Architecture Today",
      date: "March 2025",
      image: "https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg",
      link: "#"
    },
    {
      title: "Bioclimatic Design Principles",
      journal: "Green Building Review",
      date: "February 2025",
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      link: "#"
    },
    {
      title: "Future of Eco-Friendly Architecture",
      journal: "Sustainable Design Magazine",
      date: "January 2025",
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      link: "#"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-12 text-center tracking-wider">
          PUBLICATIONS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publications.map((pub, index) => (
            <article key={index} className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                <img
                  src={pub.image}
                  alt={pub.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-medium mb-2">{pub.title}</h3>
                <p className="text-gray-600">{pub.journal}</p>
                <p className="text-gray-500">{pub.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}