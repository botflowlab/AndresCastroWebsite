// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/projects/Projects';
import Layout from '/components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;