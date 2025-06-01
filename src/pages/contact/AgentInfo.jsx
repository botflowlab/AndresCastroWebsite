import React from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function AgentInfo() {
  return (
    <div className="h-full flex items-center justify-center w-full">
      <div className="w-full max-w-xl flex flex-col items-center text-center justify-center min-h-full">
        {/* Logo */}
        <img 
          src="/images/andrescastrologosolo.png" 
          alt="Andres Castro Logo" 
          className="w-64 lg:w-72 mb-16"
        />

        {/* Contact Information */}
        <div className="space-y-6 mb-16 w-full">
          <a 
            href="mailto:arquiteccr@gmail.com" 
            className="flex items-center justify-center gap-4 text-[#0c0c0c] hover:text-gray-600 transition-colors text-xl"
          >
            <MdEmail className="text-3xl" />
            <span>arquiteccr@gmail.com</span>
          </a>
          
          <a 
            href="tel:+50622538380" 
            className="flex items-center justify-center gap-4 text-[#0c0c0c] hover:text-gray-600 transition-colors text-xl"
          >
            <MdPhone className="text-3xl" />
            <span>+506 2253 8380</span>
          </a>
          
          <div className="flex items-center justify-center gap-4 text-[#0c0c0c] text-xl">
            <MdLocationOn className="text-3xl" />
            <span>San José, Costa Rica</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-12">
          <a 
            href="https://www.instagram.com/arq_andres_castro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-4xl text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://www.linkedin.com/in/arquitecto-andr%C3%A9s-castro-ruiz-238858339/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-4xl text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://wa.me/50622538380" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-4xl text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}