import React from 'react';

export default function MediaCoverage() {
  const mediaItems = [
    {
      title: "Leading the Way in Sustainable Architecture",
      outlet: "Costa Rica Architecture Magazine",
      date: "March 15, 2025",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      link: "#"
    },
    {
      title: "Innovative Designs Reshaping Urban Spaces",
      outlet: "Design Weekly",
      date: "February 28, 2025",
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      link: "#"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-12 text-center tracking-wider">
          MEDIA COVERAGE
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {mediaItems.map((item, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.outlet}</p>
                <p className="text-gray-500">{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}