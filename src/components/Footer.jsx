import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0c0c0c] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="max-w-md">
          <p className="text-3xl font-light leading-relaxed mb-8">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="mt-8 md:mt-0">
          <h3 className="text-2xl font-medium mb-8">{t('footer.help')}</h3>
          <nav className="space-y-6">
            <a href="/projects" className="block hover:text-gray-300 text-lg">{t('footer.featuredProjects')}</a>
            <a href="/architect" className="block hover:text-gray-300 text-lg">{t('footer.architect')}</a>
            <a href="/publications" className="block hover:text-gray-300 text-lg">{t('footer.publications')}</a>
          </nav>
        </div>

        <div className="mt-8 md:mt-0">
          <h3 className="text-2xl font-medium mb-8">{t('footer.contact')}</h3>
          <div className="space-y-6">
            <a href="mailto:arquiteccr@gmail.com" className="flex items-center gap-3 hover:text-gray-300 text-lg">
              <MdEmail className="text-2xl" />
              arquiteccr@gmail.com
            </a>
            <a href="tel:+50622538380" className="flex items-center gap-3 hover:text-gray-300 text-lg">
              <MdPhone className="text-2xl" />
              +506 22538380
            </a>
            <a href="https://www.linkedin.com/in/arquitecto-andr%C3%A9s-castro-ruiz-238858339/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-3 hover:text-gray-300 text-lg">
              <FaLinkedin className="text-2xl" />
              LINKEDIN
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063929412411" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-3 hover:text-gray-300 text-lg">
              <FaFacebook className="text-2xl" />
              FACEBOOK
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 flex flex-col md:flex-row justify-between items-center">
        <p className="text-lg">{t('footer.rights')}</p>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="/privacy" className="hover:text-gray-300 text-lg">{t('footer.privacy')}</a>
          <a href="/terms" className="hover:text-gray-300 text-lg">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;