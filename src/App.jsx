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
        
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <ReactPlayer
            url="https://player.vimeo.com/video/1088748083"
            width="100%"
            height="100%"
            controls={false}
            playing={true}
            loop={true}
            muted={true}
            className="absolute top-0 left-0"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

export default App