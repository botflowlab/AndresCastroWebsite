import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home.jsx';
import Projects from './pages/projects/Projects.jsx';
import ProjectDetailPage from './pages/projects/ProjectDetailPage.jsx';
import Contact from './pages/contact/Contact.jsx';
import Architect from './pages/architect/Architect.jsx';
import AuthPage from './pages/auth/AuthPage.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/arquitecto" element={<Architect />} />
          <Route path="/client-dashboard" element={<AuthPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;