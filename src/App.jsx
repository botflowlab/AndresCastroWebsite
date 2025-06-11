import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import VimeoIntro from './components/VimeoIntro';
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

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Show intro animation first
  if (showIntro) {
    return <VimeoIntro onComplete={handleIntroComplete} />;
  }

  // Show main application after intro
  return (
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
  );
}

export default App;