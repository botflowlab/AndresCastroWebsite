import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ProjectSidebar from '../components/sections/ProjectSidebar.jsx';
import ProjectGrid from '../components/sections/ProjectGrid.jsx';

function VerticalText() {
  const { i18n } = useTranslation();
  return (
    <div className="hidden md:flex items-center justify-center px-4">
      <div className="-rotate-90 text-[180px] font-light text-transparent" style={{ WebkitTextStroke: '1px black' }}>
        {i18n.language === 'en' ? 'PROJECTS' : 'PROYECTOS'}
      </div>
    </div>
  );
}

function Projects() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="font-neutra overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen pt-20 relative">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block md:w-1/4 max-w-xs flex-shrink-0 overflow-y-auto pt-4">
          <ProjectSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-16 py-8">
          <ProjectGrid />
        </main>

        {/* Vertical Text (Desktop) */}
        <aside className="hidden md:block md:w-1/5 max-w-sm flex-shrink-0">
          <VerticalText />
        </aside>

        {/* Sidebar Toggle Button (Mobile) */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white overflow-y-auto">
            <div className="p-4 h-full">
              <button className="absolute top-4 right-4" onClick={() => setIsSidebarOpen(false)}>
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