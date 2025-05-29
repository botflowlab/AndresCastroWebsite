import React from 'react'
import ReactPlayer from 'react-player'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-neutra">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0c0c0c] mb-4">
          EN CONSTRUCCIÓN
        </h1>
        <h2 className="text-xl md:text-2xl text-[#0c0c0c] mb-8">
          Gracias por visitarnos! Estamos trabajando en el sitio
        </h2>
        
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
          {/* Replace the url with your Vimeo video link */}
          <ReactPlayer
            url="https://vimeo.com/1088748083"
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            loop={true}
            muted={true}
            className="react-player"
          />
        </div>
      </div>
    </div>
  )
}

export default App