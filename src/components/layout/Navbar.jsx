import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo placeholder */}
            <div className="flex-shrink-0 flex items-center">
              <img src="/images/andrescastrologohor.png" alt="Logo" className="h-12 md:h-16 object-contain" />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
                {t('nav.home')}
              </a>
              <a href="/arquitecto" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
                {t('nav.architect')}
              </a>
              <a href="/proyectos" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
                {t('nav.projects')}
              </a>
              <a href="/publicaciones" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
                {t('nav.publications')}
              </a>
              <a href="mailto:arquiteccr@gmail.com" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
                {t('nav.contact')}
              </a>
              
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium flex items-center"
              >
                {i18n.language === 'en' ? 'ES' : 'EN'}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Language Switcher for Mobile */}
              <button
                onClick={toggleLanguage}
                className="text-black-900 hover:text-gray-600 px-2 py-1 text-lg font-medium"
              >
                {i18n.language === 'en' ? 'ES' : 'EN'}
              </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-600"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a 
              href="/" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </a>
            <a 
              href="/arquitecto" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.architect')}
            </a>
            <a 
              href="/proyectos" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.projects')}
            </a>
            <a 
              href="/publicaciones" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.publications')}
            </a>
            <a 
              href="mailto:arquiteccr@gmail.com" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;