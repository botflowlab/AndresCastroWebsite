import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import LogoIntro from './components/LogoIntro';
import Home from './pages/Home.jsx';
import Projects from './pages/projects/Projects.jsx';
import ProjectDetailPage from './pages/projects/ProjectDetailPage.jsx';
import Contact from './pages/contact/Contact.jsx';
import Architect from './pages/architect/Architect.jsx';
import News from './pages/news/News.jsx';
import AuthPage from './pages/auth/AuthPage.jsx';

function ScrollToTop() {
  const location = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);

  // Initialize audio when App component mounts
  useEffect(() => {
    const initializeAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.2; // Set to 50% volume
          audioRef.current.loop = false; // Loop the background music
          
          // Try to play the audio
          await audioRef.current.play();
          console.log('🎵 Background music started');
        } catch (error) {
          console.log('🔇 Audio autoplay blocked by browser:', error);
          // Autoplay was blocked, which is normal in many browsers
          // The audio will play when user interacts with the page
        }
      }
    };

    initializeAudio();

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Handle user interaction to enable audio (for browsers that block autoplay)
  const handleUserInteraction = async () => {
    if (audioRef.current && audioRef.current.paused) {
      try {
        await audioRef.current.play();
        console.log('🎵 Audio started after user interaction');
      } catch (error) {
        console.log('🔇 Could not start audio:', error);
      }
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Show intro animation first
  if (showIntro) {
    return (
      <div onClick={handleUserInteraction} onTouchStart={handleUserInteraction}>
        {/* Background Audio - Available throughout entire app */}
        <audio
          ref={audioRef}
          preload="auto"
          playsInline
        >
          <source src="/sound/0621.MP3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <LogoIntro onComplete={handleIntroComplete} />
      </div>
    );
  }

  // Show main application after intro
  return (
    <div onClick={handleUserInteraction} onTouchStart={handleUserInteraction}>
      {/* Background Audio - Available throughout entire app */}
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
      >
        <source src="/sound/0621.MP3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/arquitecto" element={<Architect />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/client-dashboard" element={<AuthPage />} />
            <Route path="/admin" element={<AuthPage />} />
            <Route path="/dashboard" element={<AuthPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;