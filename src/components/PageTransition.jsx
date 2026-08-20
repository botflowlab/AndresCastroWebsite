import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const quotes = {
  en: "Architecture is the materialization of the architect's design through creativity as a response to source after having channeled what truly wants to happen on site",
  es: "La arquitectura es la materialización del diseño del arquitecto a través de la creatividad como respuesta a la fuente y después de haber canalizado lo que verdaderamente quiere ocurrir en el sitio"
};

export default function PageTransition({ children }) {
  const location = useLocation();
  const { i18n } = useTranslation();
  const overlayRef = useRef(null);
  const quoteRef = useRef(null);
  const contentRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const isAnimating = useRef(false);
  const hasPlayedOnce = useRef(false);

  useEffect(() => {
    const isNavigatingToProjects = location.pathname === '/proyectos' && prevPath !== '/proyectos';

    if (isNavigatingToProjects && !isAnimating.current) {
      isAnimating.current = true;
      hasPlayedOnce.current = true;
      setShowOverlay(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setShowOverlay(false);
          isAnimating.current = false;
        }
      });

      tl.set(overlayRef.current, { yPercent: -100, visibility: 'visible' })
        .set(quoteRef.current, { opacity: 0, y: 30 })
        .set(contentRef.current, { opacity: 0 })
        .to(overlayRef.current, {
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        })
        .to(quoteRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.1')
        .to(quoteRef.current, {
          opacity: 1,
          duration: 3.5
        })
        .to(quoteRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.in'
        })
        .to(overlayRef.current, {
          yPercent: 100,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.2')
        .to(contentRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.4');
    }

    setPrevPath(location.pathname);
  }, [location.pathname]);

  const currentQuote = quotes[i18n.language] || quotes.en;

  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center ${showOverlay ? '' : 'invisible'}`}
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16">
          <p
            ref={quoteRef}
            className="text-white text-center font-light leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-0 tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &ldquo;{currentQuote}&rdquo;
          </p>
        </div>
      </div>

      <div ref={contentRef} style={{ opacity: hasPlayedOnce.current && isAnimating.current ? 0 : 1 }}>
        {children}
      </div>
    </>
  );
}
