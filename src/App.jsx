import React from 'react'
import ReactPlayer from 'react-player'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-neutra">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          EN CONSTRUCCIÓN
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
          We're working on something amazing
        </h2>
        
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
          {/* Replace the url with your Vimeo video link */}
          <ReactPlayer
            url="https://vimeo.com/your-video-id"
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            loop={true}
            muted={true}
            className="react-player"
          />
        </div>
        
        <div className="mt-8">
          <p className="text-gray-400 text-lg">
            Our website is under construction. We'll be here soon with our new awesome site.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App