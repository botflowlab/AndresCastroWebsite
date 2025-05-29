import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#0c0c0c] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="text-2xl font-light leading-relaxed">
            Designing architecture to enrich people's lives, in context with the natural and built environment.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-6">HOW CAN WE HELP?</h3>
          <nav className="space-y-4">
            <a href="/about" className="block hover:text-gray-300">About</a>
            <a href="/projects" className="block hover:text-gray-300">Featured Projects</a>
            <a href="/process" className="block hover:text-gray-300">Our Process</a>
            <a href="/services" className="block hover:text-gray-300">What we do</a>
          </nav>
        </div>

        <div>
          <h3 className="text-xl mb-6">CONTACT</h3>
          <div className="space-y-4">
            <a href="mailto:andres@andrescastroarq.co.nz" className="block hover:text-gray-300">
              andres@andrescastroarq.co.nz
            </a>
            <a href="tel:+64272799306" className="block hover:text-gray-300">
              +64 27 279 9306
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300">
              INSTAGRAM
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300">
              FACEBOOK
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Andres Castro Architecture Ltd.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-300">T & C's</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;