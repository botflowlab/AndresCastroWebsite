import React from 'react';
import ContactForm from './ContactForm';
import AgentInfo from './AgentInfo';

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      {/* Background Pattern Container with Gradient Overlays */}
      <div className="absolute inset-0 w-full h-full">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 w-full h-full opacity-10"
          style={{
            backgroundImage: 'url(/images/concrete1.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px'
          }}
        />
        {/* Top Fade */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"
        />
        {/* Bottom Fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] mt-20 mb-20 items-center">
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