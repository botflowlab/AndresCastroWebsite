import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Sidebar from './ProjectSidebar';
import ProjectGrid from './ProjectGrid';

export default function Projects() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans relative">
      <Navbar />

      {/* Right-side Vertical Text */}
      <div className="hidden md:flex fixed right-0 top-0 h-screen w-1/6 items-center justify-center text-align-right z-0 pointer-events-none">
        <div className="-rotate-90 text-[160px] text-left font-bold whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '1px black' }}>PROJECTS</div>
      </div>

     <div className="relative pt-24 z-10">
      {/* Sidebar: hidden on small screens */}
      <div className="hidden md:block absolute left-0 top-24 w-64 h-full z-20 px-12 pt-12">
        <Sidebar />
      </div>
    
      {/* Main Container */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-12 md:ml-64 pt-6 md:pt-6 md:pl-6">
        <main>
          <ProjectGrid />
        </main>
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