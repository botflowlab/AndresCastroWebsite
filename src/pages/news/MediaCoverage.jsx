import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MediaCoverage() {
  const { t } = useTranslation();
  
  const videos = [
    {
      id: "IJ2QtRYl0dA",
      title: "Arquitectura Sostenible",
      thumbnail: `https://img.youtube.com/vi/IJ2QtRYl0dA/0.jpg`,
      url: "https://www.youtube.com/watch?v=IJ2QtRYl0dA"
    },
    {
      id: "wTrOXg-EVHE",
      title: "Diseño Bioclimático",
      thumbnail: `https://img.youtube.com/vi/wTrOXg-EVHE/0.jpg`,
      url: "https://www.youtube.com/watch?v=wTrOXg-EVHE"
    },
    {
      id: "CPU7lAlXSj0",
      title: "Habitat TV",
      thumbnail: `https://img.youtube.com/vi/CPU7lAlXSj0/0.jpg`,
      url: "https://www.youtube.com/watch?v=CPU7lAlXSj0"
    },
    {
      id: "VotRi8jnh3w",
      title: "Habitat TV",
      thumbnail: `https://img.youtube.com/vi/VotRi8jnh3w/0.jpg`,
      url: "https://www.youtube.com/watch?v=VotRi8jnh3w"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-light mb-12 text-center">
          {t('publications.videos.title')}
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
        {/* YouTube Playlist Button */}
        <div className="text-center mt-12">
          <a
            href="https://youtube.com/playlist?list=PLbBptUcSJjm1DwGjQRbtAcver9aZPk27w&si=a-VRjU5-4RiC7cuX"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 border-2 border-red-600 bg-red-600 text-white px-8 py-4 text-lg font-medium transition-all duration-500 overflow-hidden hover:bg-red-700 hover:border-red-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {/* YouTube icon */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            
            {/* Button text */}
            <span className="relative z-10">
              {t('publications.videos.playlist', 'Ver Playlist Completa')}
            </span>
            
            {/* Arrow indicator */}
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
          </a>
        </div>

    </section>
  );
}