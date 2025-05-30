import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/projects/Projects';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <div className="font-cormorant">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;