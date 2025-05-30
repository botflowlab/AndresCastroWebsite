import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import MciParking from './pages/projects/MciParking';
import KansasMuseum from './pages/projects/KansasMuseum';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyectos/mci-parking" element={<MciParking />} />
        <Route path="/proyectos/kansas-museum" element={<KansasMuseum />} />
      </Routes>
    </Router>
  );
}

export default App;