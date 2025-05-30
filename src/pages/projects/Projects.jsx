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
      <div className="hidden md:flex fixed right-0 top-12 h-screen w-1/6 items-center justify-center text-align-right z-0 pointer-events-none">
        <div className="-rotate-90 text-[170px] opacity-30 text-left font-bold whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '1px black'}}>PROJECTS</div>
      </div>

      <div className="relative pt-24 z-10 mt-16 ml-4 md:ml-16 mb-32">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMenuOpen(true)}
          className="md:hidden fixed top-24 left-4 z-30 bg-white p-2 rounded-md shadow-sm"
        >
          <span className="sr-only">Open filters</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar */}
        <div className="hidden md:block absolute left-0 top-24 w-64 h-full z-20 px-6 pt-6">
          <Sidebar />
        </div>
      
        {/* Main Content */}
        <div className="md:ml-24 pr-20">
          <div className="max-w-4xl mx-auto px-6 mt-12">
            <main>
              <ProjectGrid />
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-3xl">Filters</h2>
              <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2">
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar onItemClick={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}