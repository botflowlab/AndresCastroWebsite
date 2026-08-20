import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import Sidebar from './ProjectSidebar';
import ProjectGrid from './ProjectGrid';
import { supabase } from '../../supabaseClient';

const quotes = {
  en: "\u201CArchitecture is the materialization of the architect\u2019s design through creativity as a response to source after having channeled what truly wants to happen on site\u201D",
  es: "\u201CLa arquitectura es la materializaci\u00F3n del dise\u00F1o del arquitecto a trav\u00E9s de la creatividad como respuesta a la fuente y despu\u00E9s de haber canalizado lo que verdaderamente quiere ocurrir en el sitio\u201D"
};

export default function Projects() {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [introComplete, setIntroComplete] = useState(false);

  const overlayRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const quote = quoteRef.current;
    if (!overlay || !quote) return;

    const lang = i18n.language?.startsWith('es') ? 'es' : 'en';
    quote.textContent = quotes[lang];

    const tl = gsap.timeline({
      onComplete: () => setIntroComplete(true)
    });

    tl
      .set(overlay, { yPercent: 0 })
      .set(quote, { opacity: 0, y: 30 })
      .to(quote, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 })
      .to({}, { duration: 3 })
      .to(quote, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' })
      .to(overlay, { yPercent: 100, duration: 1, ease: 'power4.inOut' });

    return () => { tl.kill(); };
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      let query = supabase.from('projects').select('*');
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false);
  };

  return (
    <div className="font-cormorant relative">
      {/* Entrance overlay -- sits on top of everything, slides away after quote */}
      {!introComplete && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform'
          }}
        >
          <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2.5rem' }}>
            <p
              ref={quoteRef}
              style={{
                color: '#fff',
                textAlign: 'center',
                fontWeight: 300,
                lineHeight: 1.8,
                fontSize: 'clamp(1.05rem, 2.5vw, 1.875rem)',
                opacity: 0,
                letterSpacing: '0.025em',
                fontFamily: "'Cormorant Garamond', serif"
              }}
            />
          </div>
        </div>
      )}

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
          <div className="w-64 pl-10 pt-6 shrink-0">
            <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
          </div>

          <div className="flex-1">
            <div className="max-w-5xl mx-auto px-6 mt-12">
              <main>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-2xl">Loading projects...</p>
                  </div>
                ) : (
                  <ProjectGrid projects={projects} />
                )}
              </main>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden px-4 mt-12">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-2xl">Loading projects...</p>
            </div>
          ) : (
            <ProjectGrid projects={projects} />
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
