import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from './ProjectSidebar';
import ProjectGrid from './ProjectGrid';
import Footer from '../../components/layout/Footer';

export default function Projects() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans">
      <Navbar />

      <div className="flex pt-24 relative">
        {/* Left-side Sidebar (static) */}
        <div className="hidden md:block w-1/4 pt-4 px-4 bg-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <ProjectGrid />
          </div>
        </div>

        {/* Right-side Vertical Text */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 pointer-events-none z-0">
          <div
            className="-rotate-90 text-[160px] font-bold whitespace-nowrap text-transparent"
            style={{ WebkitTextStroke: '1px black' }}
          >
            PROJECTS
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white p-6 md:hidden">
          <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-2xl">✕</button>
          <Sidebar onItemClick={() => setMenuOpen(false)} />
        </div>
      )}

      <Footer />
    </div>
  );
}