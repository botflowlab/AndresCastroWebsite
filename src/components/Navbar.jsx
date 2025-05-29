import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo placeholder */}
          <div className="flex-shrink-0">
            <div className="h-12 w-32 bg-transparent">
              <img src="/ruta/a/tu/logo.png" alt="Logo" className="h-full object-contain" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Inicio
            </a>
            <a href="/arquitecto" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              El Arquitecto
            </a>
            <a href="/proyectos" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Proyectos
            </a>
            <a href="/publicaciones" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Publicaciones
            </a>
            <a href="/contacto" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Contacto
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-600">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;