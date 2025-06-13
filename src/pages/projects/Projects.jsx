import { useState, useEffect } from 'react';
import Sidebar from './ProjectSidebar';
import ProjectGrid from './ProjectGrid';
import { supabase } from '../../supabaseClient';

export default function Projects() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase.from('projects').select('*');
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Simulate minimum loading time for smooth UX
      setTimeout(() => {
        setProjects(data || []);
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error.message);
      setLoading(false);
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false);
  };

  const handleRetry = () => {
    fetchProjects();
  };

  return (
    <div className="font-cormorant">
      {/* Right-side Vertical Text */}
      <div className="hidden md:flex fixed right-0 top-12 h-screen w-1/6 items-center justify-center text-align-right z-0 pointer-events-none">
        <div
          className="-rotate-90 text-[170px] opacity-30 text-left font-bold whitespace-nowrap text-transparent"
          style={{ WebkitTextStroke: '1px black' }}
        >
          PROJECTS
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative pt-24 z-10 mt-16 mb-32">
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

        {/* Desktop Layout */}
        <div className="hidden md:flex">
          {/* Sidebar */}
          <div className="w-64 pl-10 pt-6 shrink-0">
            <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
          </div>

          {/* Main Grid Content */}
          <div className="flex-1">
            <div className="max-w-5xl mx-auto px-6 mt-12">
              <main>
                {error ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-800 mb-2">Failed to Load Projects</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                      onClick={handleRetry}
                      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <ProjectGrid projects={projects} loading={loading} />
                )}
              </main>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden px-4 mt-12">
          {error ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Failed to Load</h3>
              <p className="text-gray-600 mb-4 text-sm">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm"
              >
                Retry
              </button>
            </div>
          ) : (
            <ProjectGrid projects={projects} loading={loading} />
          )}
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
            <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
          </div>
        </div>
      )}
    </div>
  );
}