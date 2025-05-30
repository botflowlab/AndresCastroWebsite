import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ProjectSidebar from '../components/sections/ProjectSidebar.jsx';
import ProjectGrid from '../components/sections/ProjectGrid.jsx';

function Projects() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className="font-neutra">
      <Navbar />
      <div className="flex min-h-screen pt-20">
        {/* Left section - Sidebar */}
        <div className="w-96 border-r">
          <div className="fixed top-0 w-96 h-screen overflow-y-auto pt-20">
            <ProjectSidebar />
          </div>
        </div>

        {/* Center section - Project Grid */}
        <div className="flex-1 p-16">
          <ProjectGrid />
        </div>

        {/* Right section - Vertical text */}
        <div className="w-48 relative">
          <div className="fixed top-1/2 -translate-y-1/2 -rotate-90 text-[180px] font-light text-transparent" style={{ WebkitTextStroke: '1px black', right: '3rem' }}>
            {i18n.language === 'en' ? 'PROJECTS' : 'PROYECTOS'}
          </div>
        </div>

        {/* Mobile sidebar toggle button */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white">
            <div className="p-4">
              <button
                className="absolute top-4 right-4"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ProjectSidebar onCategoryClick={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Projects;