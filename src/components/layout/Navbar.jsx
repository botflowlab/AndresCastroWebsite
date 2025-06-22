import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 0);
      
      setVisible((prevVisible) => {
        const isScrollingUp = prevScrollPos > currentScrollPos || currentScrollPos < 10;
        return isScrollingUp;
      });
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white/0 text-[#CB8F4A] backdrop-blur-md shadow-sm'}`}
      >
        <div className="px-6 sm:px-8 lg:px-10 flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="block">
              <img src="/images/andrescastrologohor.png" alt="Logo" className="h-12 md:h-16 object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/arquitecto" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
              {t('nav.architect')}
            </Link>
            <Link to="/proyectos" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
              {t('nav.projects')}
            </Link>
            <Link to="/noticias" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
              {t('nav.publications')}
            </Link>
            <Link to="/contacto" className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium">
              {t('nav.contact')}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className="text-black-900 hover:text-gray-600 px-3 py-2 text-lg font-medium flex items-center"
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
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
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link 
              to="/" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/arquitecto" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.architect')}
            </Link>
            <Link 
              to="/proyectos" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.projects')}
            </Link>
            <Link 
              to="/noticias" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.publications')}
            </Link>
            <Link 
              to="/contacto" 
              className="text-2xl text-black-900 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;