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
        <div className="hidden md:block md:w-[16%] pt-4 px-4 bg-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:px-12 relative z-10">
          <ProjectGrid />
        </div>

        {/* Right-side Vertical Text */}
        <div className="hidden md:flex md:w-[16%] items-start justify-center pt-24 pointer-events-none z-0">
          <div
            className="-rotate-90 origin-top-right text-[160px] font-bold whitespace-nowrap text-transparent"
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
