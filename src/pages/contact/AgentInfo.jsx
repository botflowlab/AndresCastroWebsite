import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function AgentInfo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      {/* Logo and Intro */}
      <div className="text-center">
        <img 
          src="/images/andrescastrologosolo.png" 
          alt="Andres Castro Logo" 
          className="w-32 mx-auto mb-8"
        />
        <h2 className="text-3xl font-light mb-4">ANDRÉS CASTRO</h2>
        <p className="text-gray-600 text-lg">
          {t('contact.info.tagline')}
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-8">
        <a 
          href="mailto:arquiteccr@gmail.com" 
          className="flex items-center gap-4 text-[#0c0c0c] hover:text-gray-600 transition-colors group"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <MdEmail className="text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('contact.info.contact.email')}</p>
            <p className="text-lg">arquiteccr@gmail.com</p>
          </div>
        </a>
        
        <a 
          href="tel:+50622538380" 
          className="flex items-center gap-4 text-[#0c0c0c] hover:text-gray-600 transition-colors group"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <MdPhone className="text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('contact.info.contact.phone')}</p>
            <p className="text-lg">+506 2253 8380</p>
          </div>
        </a>
        
        <div className="flex items-center gap-4 text-[#0c0c0c] group">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <MdLocationOn className="text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('contact.info.contact.location')}</p>
            <p className="text-lg">{t('contact.info.location.city')}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6">
        <a 
          href="https://www.instagram.com/andrescastroarquitectura.cr?igsh=MXkwdHplN3F4NmtieA%3D%3D&utm_source=qr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#0c0c0c] hover:bg-gray-200 transition-colors"
        >
          <FaInstagram className="text-2xl" />
        </a>
        <a 
          href="https://www.linkedin.com/in/arquitecto-andr%C3%A9s-castro-ruiz-238858339/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#0c0c0c] hover:bg-gray-200 transition-colors"
        >
          <FaLinkedin className="text-2xl" />
        </a>
        <a 
          href="https://wa.me/50622538380" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#0c0c0c] hover:bg-gray-200 transition-colors"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      </div>

      {/* Office Hours */}
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">{t('contact.info.hours.title')}</h3>
        <p className="text-gray-600">
          {t('contact.info.hours.weekdays')}<br />
          {t('contact.info.hours.saturday')}
        </p>
      </div>
    </div>
  );
}