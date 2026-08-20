import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

import Layout from './components/Layout';
import PageTransition, { isTransitionActive } from './components/PageTransition';
import VimeoIntro from './components/VimeoIntro';
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
  const lenis = useLenis();

  React.useEffect(() => {
    if (isTransitionActive) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, lenis]);

  return null;
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return (
      <div>
        <VimeoIntro onComplete={handleIntroComplete} />
      </div>
    );
  }

  return (
    // The "root" prop tells Lenis to take over the main scrollbar
    <ReactLenis root>
      <div>
        <Router>
          <ScrollToTop />
          <PageTransition>
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
          </PageTransition>
        </Router>
      </div>
    </ReactLenis>
  );
}

export default App;