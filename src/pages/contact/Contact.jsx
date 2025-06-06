import React from 'react';
import ContactForm from './ContactForm';
import AgentInfo from './AgentInfo';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/theArchitect/acCta2.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-light mb-6">GET IN TOUCH</h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto px-4">
              Let's discuss your project and create something extraordinary together
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