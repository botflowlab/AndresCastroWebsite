import { createContext, useContext, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const TransitionContext = createContext(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

const quotes = {
  en: "\u201CArchitecture is the materialization of the architect\u2019s design through creativity as a response to source after having channeled what truly wants to happen on site\u201D",
  es: "\u201CLa arquitectura es la materializaci\u00F3n del dise\u00F1o del arquitecto a trav\u00E9s de la creatividad como respuesta a la fuente y despu\u00E9s de haber canalizado lo que verdaderamente quiere ocurrir en el sitio\u201D"
};

let overlayEl = null;
let quoteEl = null;

function ensureOverlayInDOM() {
  if (overlayEl && document.body.contains(overlayEl)) return;

  overlayEl = document.createElement('div');
  overlayEl.id = 'page-transition-overlay';
  Object.assign(overlayEl.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '99999',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateY(-100%)',
    pointerEvents: 'none',
    willChange: 'transform'
  });

  const inner = document.createElement('div');
  Object.assign(inner.style, {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: '0 2.5rem'
  });

  quoteEl = document.createElement('p');
  Object.assign(quoteEl.style, {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: '1.8',
    fontSize: 'clamp(1.05rem, 2.5vw, 1.875rem)',
    opacity: '0',
    letterSpacing: '0.025em',
    fontFamily: "'Cormorant Garamond', serif"
  });

  inner.appendChild(quoteEl);
  overlayEl.appendChild(inner);
  document.body.appendChild(overlayEl);
}

// Exported so ScrollToTop can check if a transition is running
export let isTransitionActive = false;

export default function PageTransition({ children }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const animatingRef = useRef(false);

  useEffect(() => {
    ensureOverlayInDOM();
    return () => {
      // Don't remove on unmount - the overlay lives for the app's lifetime
    };
  }, []);

  const navigateWithTransition = useCallback((path) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    isTransitionActive = true;

    ensureOverlayInDOM();

    const lang = i18n.language?.startsWith('es') ? 'es' : 'en';
    quoteEl.textContent = quotes[lang];

    gsap.killTweensOf([overlayEl, quoteEl]);

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
        isTransitionActive = false;
      }
    });

    tl
      .set(overlayEl, { yPercent: -100, pointerEvents: 'all' })
      .set(quoteEl, { opacity: 0, y: 40 })
      .to(overlayEl, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.inOut'
      })
      .to(quoteEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.15')
      .to({}, { duration: 3.2 })
      .to(quoteEl, {
        opacity: 0,
        y: -20,
        duration: 0.7,
        ease: 'power2.in'
      })
      .call(() => {
        navigate(path);
        window.scrollTo(0, 0);
      })
      .to({}, { duration: 0.2 })
      .to(overlayEl, {
        yPercent: 100,
        duration: 0.9,
        ease: 'power4.inOut'
      })
      .set(overlayEl, { yPercent: -100, pointerEvents: 'none' });
  }, [navigate, i18n]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
