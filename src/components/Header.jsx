import React from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

const Header = () => {
  return (
    <header>
      <nav>
        <Navbar />
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/proyectos">Proyectos</a></li>
        </ul>
      </nav>
      <Footer />
    </header>
  );
};

export default Header;