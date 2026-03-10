import React from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import AgentInfo from './AgentInfo';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/theArchitect/acCta2.jpg)'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
          <div className="max-w-6xl text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8 leading-tight">
              {t('contact.hero.title')}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-light max-w-2xl mx-auto">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-12 shadow-xl rounded-xl">
              <ContactForm />
            </div>

            {/* Agent Info */}
            <div className="lg:sticky lg:top-24">
              <AgentInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}