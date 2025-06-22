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

// Global audio instance to persist across all navigation
let globalAudio = null;
let audioInitialized = false;

function ScrollToTop() {
  const location = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Initialize audio ONCE when App component first mounts
  useEffect(() => {
    const initializeGlobalAudio = async () => {
      // Only initialize audio once per session
      if (!audioInitialized && !globalAudio) {
        try {
          globalAudio = new Audio('/sound/0621.MP3');
          globalAudio.volume = 0.5; // 50% volume
          globalAudio.loop = false; // Play only once
          globalAudio.preload = 'auto';
          
          // Try to play the audio immediately
          await globalAudio.play();
          console.log('🎵 Background music started (will play once)');
          audioInitialized = true;
        } catch (error) {
          console.log('🔇 Audio autoplay blocked by browser:', error);
          // Audio will start on first user interaction
        }
      }
    };

    initializeGlobalAudio();

    // Cleanup only when the entire app unmounts (page refresh/close)
    return () => {
      // Don't cleanup on navigation, only on actual page unload
      window.addEventListener('beforeunload', () => {
        if (globalAudio) {
          globalAudio.pause();
          globalAudio = null;
          audioInitialized = false;
        }
      });
    };
  }, []); // Empty dependency array - only run once

  // Handle user interaction to enable audio (for browsers that block autoplay)
  const handleUserInteraction = async () => {
    if (globalAudio && globalAudio.paused && !audioInitialized) {
      try {
        await globalAudio.play();
        console.log('🎵 Audio started after user interaction (will play once)');
        audioInitialized = true;
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
        <LogoIntro onComplete={handleIntroComplete} />
      </div>
    );
  }

  // Show main application after intro
  return (
    <div onClick={handleUserInteraction} onTouchStart={handleUserInteraction}>
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