import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0c0c] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <p className="text-2xl font-light leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-6">{t('footer.help')}</h3>
          <nav className="space-y-4">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="block hover:text-gray-300 transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/arquitecto" 
              className="block hover:text-gray-300 transition-colors"
            >
              {t('nav.architect')}
            </Link>
            <Link 
              to="/proyectos" 
              className="block hover:text-gray-300 transition-colors"
            >
              {t('nav.projects')}
            </Link>
            <Link 
              to="/noticias" 
              className="block hover:text-gray-300 transition-colors"
            >
              {t('nav.publications')}
            </Link>
            <Link 
              to="/contacto" 
              className="block hover:text-gray-300 transition-colors"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-xl mb-6">{t('footer.contact')}</h3>
          <div className="space-y-4">
            <a href="mailto:arquiteccr@gmail.com" className="flex items-center gap-3 hover:text-gray-300">
              <MdEmail className="text-2xl" />
              arquiteccr@gmail.com
            </a>
            <a href="tel:+50622538380" className="flex items-center gap-3 hover:text-gray-300">
              <MdPhone className="text-2xl" />
              +506 22538380
            </a>
            <a href="https://www.linkedin.com/in/arquitecto-andr%C3%A9s-castro-ruiz-238858339/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-3 hover:text-gray-300">
              <FaLinkedin className="text-2xl" />
              LINKEDIN
            </a>
            <a href="https://www.instagram.com/arq_andres_castro?igsh=bGRua3dpY2VhcWxx&utm_source=qr" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-3 hover:text-gray-300">
              <FaInstagram className="text-2xl" />
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p>{t('footer.rights')}</p>
          {/* Subtle admin access link */}
          <Link 
            to="/client-dashboard" 
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors opacity-50 hover:opacity-100"
          >
            Admin
          </Link>
        </div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-gray-300">{t('footer.privacy')}</Link>
          <Link to="/terms" className="hover:text-gray-300">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;