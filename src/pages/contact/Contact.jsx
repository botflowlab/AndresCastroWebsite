import React from 'react';
import ContactForm from './ContactForm';
import AgentInfo from './AgentInfo';

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] mt-20 items-center">
          {/* Left side - Contact Form */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center">
            <ContactForm />
          </div>

          {/* Right side - Agent Info */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <AgentInfo />
          </div>
        </div>
      </div>
    </div>
  );
}