import { createContext, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const TransitionContext = createContext(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

const quotes = {
  en: "Architecture is the materialization of the architect's design through creativity as a response to source after having channeled what truly wants to happen on site",
  es: "La arquitectura es la materialización del diseño del arquitecto a través de la creatividad como respuesta a la fuente y después de haber canalizado lo que verdaderamente quiere ocurrir en el sitio"
};

export default function PageTransition({ children }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const overlayRef = useRef(null);
  const quoteRef = useRef(null);
  const isAnimating = useRef(false);

  const navigateWithTransition = useCallback((path) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const overlay = overlayRef.current;
    const quote = quoteRef.current;

    if (!overlay || !quote) {
      navigate(path);
      isAnimating.current = false;
      return;
    }

    const lang = i18n.language?.startsWith('es') ? 'es' : 'en';
    quote.textContent = `\u201C${quotes[lang]}\u201D`;

    gsap.killTweensOf([overlay, quote]);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    tl
      .set(overlay, { yPercent: -100, pointerEvents: 'all' })
      .set(quote, { opacity: 0, y: 40 })
      // Slide overlay down to cover the screen
      .to(overlay, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.inOut'
      })
      // Fade in the quote
      .to(quote, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.15')
      // Hold the quote for reading
      .to({}, { duration: 3.2 })
      // Fade out the quote
      .to(quote, {
        opacity: 0,
        y: -20,
        duration: 0.7,
        ease: 'power2.in'
      })
      // Navigate while overlay is still covering (user can't see anything)
      .call(() => {
        navigate(path);
        window.scrollTo(0, 0);
      })
      // Small pause for page to mount
      .to({}, { duration: 0.15 })
      // Slide overlay away to reveal the new page
      .to(overlay, {
        yPercent: 100,
        duration: 0.9,
        ease: 'power4.inOut'
      })
      // Reset overlay position off-screen after done
      .set(overlay, { yPercent: -100, pointerEvents: 'none' });
  }, [navigate, i18n]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
      {children}
    </TransitionContext.Provider>
  );
}
