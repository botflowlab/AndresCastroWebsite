import React from 'react'
import ReactPlayer from 'react-player'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="flex flex-col min-h-screen font-neutra">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-white">
        <div className="w-full h-screen flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center space-y-8">
            <div style={{ position: 'relative', paddingTop: '56.25%' }} className="rounded-lg overflow-hidden bg-white mb-8">
              <ReactPlayer
                url="https://vimeo.com/video/1088748083"
                width="100%"
                height="100%"
                controls={false}
                playing={true}
                loop={true}
                muted={true}
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[#0c0c0c] mb-4">
              EN CONSTRUCCIÓN
            </h1>
            <h2 className="text-xl md:text-2xl text-[#0c0c0c]">
              Gracias por visitarnos! Estamos trabajando en el sitio
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App