import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <div className="w-full h-full">
          <div className={`absolute inset-0 bg-black ${isLoading ? 'opacity-100' : 'opacity-60'}`} />
          <ReactPlayer
            url="https://vimeo.com/video/1088748083"
            width="100%"
            height="100%"
            controls={false}
            playing={true}
            loop={true}
            muted={true}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            onReady={() => setIsLoading(false)}
            playsinline={true}
            config={{
              vimeo: {
                playerOptions: {
                  background: true,
                  autoplay: true,
                  controls: false,
                  responsive: true,
                  dnt: true
                }
              }
            }}
          />
        </div>
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
              Andres Castro Arquitectura
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards]">
              Diseño y Consultoría en Arquitectura Bioclimatica Sostenible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;