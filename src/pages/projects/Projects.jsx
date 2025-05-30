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
      <div className="hidden md:flex absolute right-0 top-0 h-full w-1/6 items-center justify-center z-0 pointer-events-none">
        <div
    className="-rotate-90 origin-top-right absolute right-0 top-0 translate-y-[-100%] text-[120px] text-black/10 font-bold whitespace-nowrap leading-none"
  >
    WORK
  </div>
      </div>

      {/* Layout */}
      <div className="pt-24 relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <Sidebar />
        </div>

        {/* Grid */}
        <main className="md:col-span-9">
          <ProjectGrid />
        </main>
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