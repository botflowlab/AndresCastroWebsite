import React from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function AgentInfo() {
  return (
    <div className="h-full bg-white flex items-center justify-center p-0 md:p-16">
      <div className="w-full max-w-md flex flex-col items-center text-center justify-center min-h-full">
        {/* Logo */}
        <img 
          src="/images/andrescastrologosolo.png" 
          alt="Andres Castro Logo" 
          className="w-48 mb-12"
        />

        {/* Contact Information */}
        <div className="space-y-4 mb-12 w-full">
          <a 
            href="mailto:arquiteccr@gmail.com" 
            className="flex items-center justify-center gap-3 text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <MdEmail className="text-2xl" />
            <span>arquiteccr@gmail.com</span>
          </a>
          
          <a 
            href="tel:+50622538380" 
            className="flex items-center justify-center gap-3 text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <MdPhone className="text-2xl" />
            <span>+506 2253 8380</span>
          </a>
          
          <div className="flex items-center justify-center gap-3 text-[#0c0c0c]">
            <MdLocationOn className="text-2xl" />
            <span>San José, Costa Rica</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8">
          <a 
            href="https://www.instagram.com/arq_andres_castro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-3xl text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://www.linkedin.com/in/arquitecto-andr%C3%A9s-castro-ruiz-238858339/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-3xl text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://wa.me/50622538380" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-3xl text-[#0c0c0c] hover:text-gray-600 transition-colors"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}