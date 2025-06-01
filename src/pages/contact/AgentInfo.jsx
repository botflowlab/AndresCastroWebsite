import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function AgentInfo() {
  return (
    <div className="h-full relative bg-[#0c0c0c]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 p-8 md:p-16 text-white">
        <div className="max-w-md">
          <h2 className="text-4xl font-cormorant font-bold mb-4">Andrés Castro</h2>
          <p className="text-xl mb-8 font-light">Sustainable Architecture Specialist</p>

          <div className="space-y-4 mb-8">
            <a href="mailto:arquiteccr@gmail.com" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
              <MdEmail className="text-2xl" />
              <span>arquiteccr@gmail.com</span>
            </a>
            <a href="tel:+50622538380" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
              <MdPhone className="text-2xl" />
              <span>+506 2253 8380</span>
            </a>
            <div className="flex items-center gap-3">
              <MdLocationOn className="text-2xl" />
              <span>San José, Costa Rica</span>
            </div>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300 transition-colors"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://www.instagram.com/arq_andres_castro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300 transition-colors"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.linkedin.com/in/arquitecto-andr%C3%A9s-castro-ruiz-238858339/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300 transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}