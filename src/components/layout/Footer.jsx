import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();

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
            <Link to="/proyectos" className="block hover:text-gray-300">{t('footer.featuredProjects')}</Link>
            <Link to="/architect" className="block hover:text-gray-300">{t('footer.architect')}</Link>
            <Link to="/publications" className="block hover:text-gray-300">{t('footer.publications')}</Link>
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
        <p>{t('footer.rights')}</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-gray-300">{t('footer.privacy')}</Link>
          <Link to="/terms" className="hover:text-gray-300">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;