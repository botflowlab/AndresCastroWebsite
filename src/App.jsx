import React, { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const VideoPlayer = lazy(() => import('./components/VideoPlayer'));

function App() {
  return (
    <div className="flex flex-col min-h-screen font-neutra">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-white">
        <div className="w-full h-screen flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center space-y-8 backdrop-blur-md bg-white/80 p-8 rounded-lg">
            <Suspense fallback={
              <div style={{ position: 'relative', paddingTop: '56.25%' }} className="rounded-lg overflow-hidden bg-[#0c0c0c] mb-8" />
            }>
              <VideoPlayer />
            </Suspense>
            
            <div className="backdrop-blur-md bg-white/80 p-8 rounded-lg">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0c0c0c] mb-4">
                EN CONSTRUCCIÓN
              </h1>
              <h2 className="text-xl md:text-2xl text-[#0c0c0c]">
                Gracias por visitarnos! Estamos trabajando en el sitio
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App