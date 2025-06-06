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
    },
    {
      id: "CPU7lAlXSj0",
      title: "Habitat TV",
      thumbnail: `https://img.youtube.com/vi/CPU7lAlXSj0/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=CPU7lAlXSj0"
    },
    {
      id: "VotRi8jnh3w",
      title: "Habitat TV",
      thumbnail: `https://img.youtube.com/vi/VotRi8jnh3w/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=VotRi8jnh3w"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-light mb-12 text-center">
          FEATURED VIDEOS
        </h2>

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
    </section>
  );
}