import React, { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useTranslation } from 'react-i18next';

const VideoPlayer = lazy(() => import('./components/VideoPlayer'));

function App() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen font-neutra">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-white">
        <div className="w-full h-screen flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center space-y-8">
            <div className="opacity-0 animate-[fadeIn_1s_ease-in_forwards]">
              <Suspense fallback={
                <div style={{ position: 'relative', paddingTop: '56.25%' }} className="rounded-lg overflow-hidden bg-white mb-8" />
              }>
                <VideoPlayer />
              </Suspense>
            </div>
            
            <div className="opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards]">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0c0c0c] mb-4">
                {t('construction.title')}
              </h1>
              <h2 className="text-xl md:text-2xl text-[#0c0c0c]">
                {t('construction.message')}
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