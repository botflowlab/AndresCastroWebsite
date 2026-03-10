import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Check if we're on a projects page
  const isProjectsPage = location.pathname.startsWith('/proyectos');

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

  // Determine text color based on page and scroll state
  const getTextColor = () => {
    if (isProjectsPage) {
      return 'text-black'; // Always black on projects pages
    }
    return isScrolled ? 'text-black' : 'text-white';
  };

  const textColorClass = getTextColor();

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white/0 text-white backdrop-blur-md shadow-sm'}`}
      >
        <div className="px-6 sm:px-8 lg:px-10 flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="block">
              <img src="/images/andrescastrologohor.png" alt="Logo" className="h-12 md:h-16 object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${textColorClass} hover:text-gray-600 px-3 py-2 text-lg font-medium transition-colors`}>
              {t('nav.home')}
            </Link>
            <Link to="/arquitecto" className={`${textColorClass} hover:text-gray-600 px-3 py-2 text-lg font-medium transition-colors`}>
              {t('nav.architect')}
            </Link>
            <Link to="/proyectos" className={`${textColorClass} hover:text-gray-600 px-3 py-2 text-lg font-medium transition-colors`}>
              {t('nav.projects')}
            </Link>
            <Link to="/noticias" className={`${textColorClass} hover:text-gray-600 px-3 py-2 text-lg font-medium transition-colors`}>
              {t('nav.publications')}
            </Link>
            <Link to="/contacto" className={`${textColorClass} hover:text-gray-600 px-3 py-2 text-lg font-medium transition-colors`}>
              {t('nav.contact')}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className={`${textColorClass} hover:text-gray-600 px-3 py-2 text-lg font-medium flex items-center transition-colors`}
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className={`${textColorClass} hover:text-gray-600 px-2 py-1 text-lg font-medium transition-colors`}
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${textColorClass} hover:text-gray-600 transition-colors`}
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
              className="text-2xl text-black hover:text-gray-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/arquitecto" 
              className="text-2xl text-black hover:text-gray-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.architect')}
            </Link>
            <Link 
              to="/proyectos" 
              className="text-2xl text-black hover:text-gray-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.projects')}
            </Link>
            <Link 
              to="/noticias" 
              className="text-2xl text-black hover:text-gray-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.publications')}
            </Link>
            <Link 
              to="/contacto" 
              className="text-2xl text-black hover:text-gray-600 transition-colors"
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