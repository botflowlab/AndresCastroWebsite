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
        <div className="flex-1 px-4 md:px-8 relative z-10">
          <ProjectGrid />
        </div>

        {/* Right-side Vertical Text */}
        <div className="hidden md:flex fixed right-0 top-0 h-screen w-[16%] items-start justify-center z-0 pointer-events-none pt-24">
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