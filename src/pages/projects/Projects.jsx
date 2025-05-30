import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from './ProjectSidebar';
import ProjectGrid from './ProjectGrid';
import Footer from '../../components/layout/Footer';

export default function Projects() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans relative">
      <Navbar />

      {/* Left-side Sidebar (absolute) */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-[16%] z-0 pt-24 px-4 bg-white">
        <Sidebar />
      </div>

      {/* Right-side Vertical Text */}
      <div className="hidden md:flex fixed right-0 top-0 h-screen w-[16%] items-start justify-center z-0 pointer-events-none pt-24">
        <div className="-rotate-90 origin-top-right text-[160px] font-bold whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '1px black' }}>
          PROJECTS
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="pt-24 relative z-10 max-w-screen-xl mx-auto px-4 md:pl-[18%] md:pr-[18%]">
        <ProjectGrid />
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