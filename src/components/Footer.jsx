import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0c0c0c] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="text-2xl font-light leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-6">{t('footer.help')}</h3>
          <nav className="space-y-4">
            <a href="/about" className="block hover:text-gray-300">{t('footer.about')}</a>
            <a href="/projects" className="block hover:text-gray-300">{t('footer.featuredProjects')}</a>
            <a href="/architect" className="block hover:text-gray-300">{t('footer.process')}</a>
            <a href="/publications" className="block hover:text-gray-300">{t('footer.architect')}</a>
          </nav>
        </div>

        <div>
          <h3 className="text-xl mb-6">{t('footer.contact')}</h3>
          <div className="space-y-4">
            <a href="mailto:andres@andrescastroarq.co.nz" className="block hover:text-gray-300">
              arquiteccr@gmail.com
            </a>
            <a href="tel:+64272799306" className="block hover:text-gray-300">
              +506 123123
            </a>
            <a href="https://www.linkedin.com/in/arquitecto-andr%C3%A9s-castro-ruiz-238858339/" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300">
              LINKEDIN
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300">
              FACEBOOK
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center">
        <p>{t('footer.rights')}</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-gray-300">{t('footer.privacy')}</a>
          <a href="/terms" className="hover:text-gray-300">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;