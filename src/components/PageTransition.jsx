import { useEffect, useRef } from 'react';
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
  const prevPath = useRef(location.pathname);
  const isAnimating = useRef(false);
  const tlRef = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const wasOnProjects = prevPath.current === '/proyectos';
    const isGoingToProjects = currentPath === '/proyectos';

    if (isGoingToProjects && !wasOnProjects && !isAnimating.current) {
      isAnimating.current = true;

      const overlay = overlayRef.current;
      const quote = quoteRef.current;

      if (!overlay || !quote) {
        isAnimating.current = false;
        prevPath.current = currentPath;
        return;
      }

      gsap.killTweensOf([overlay, quote]);

      if (tlRef.current) {
        tlRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { yPercent: -100, pointerEvents: 'none' });
          gsap.set(quote, { opacity: 0 });
          isAnimating.current = false;
        }
      });

      tlRef.current = tl;

      tl.set(overlay, { yPercent: -100, pointerEvents: 'all' })
        .set(quote, { opacity: 0, y: 40 })
        .to(overlay, {
          yPercent: 0,
          duration: 0.9,
          ease: 'power4.inOut'
        })
        .to(quote, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.2')
        .to({}, { duration: 3.2 })
        .to(quote, {
          opacity: 0,
          y: -20,
          duration: 0.7,
          ease: 'power2.in'
        })
        .to(overlay, {
          yPercent: 100,
          duration: 0.9,
          ease: 'power4.inOut'
        }, '-=0.3');
    }

    prevPath.current = currentPath;
  }, [location.pathname]);

  const lang = i18n.language?.startsWith('es') ? 'es' : 'en';
  const currentQuote = quotes[lang];

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateY(-100%)',
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      >
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem' }}>
          <p
            ref={quoteRef}
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 300,
              lineHeight: 1.7,
              fontSize: 'clamp(1rem, 2.5vw, 1.875rem)',
              opacity: 0,
              letterSpacing: '0.02em',
              fontFamily: "'Cormorant Garamond', serif"
            }}
          >
            &ldquo;{currentQuote}&rdquo;
          </p>
        </div>
      </div>

      {children}
    </>
  );
}
