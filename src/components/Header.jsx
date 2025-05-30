import React from 'react';

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
    </header>
  );
};

export default Header;