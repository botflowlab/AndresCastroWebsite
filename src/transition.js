import gsap from 'gsap';

const quotes = {
  en: "\u201CArchitecture is the materialization of the architect\u2019s design through creativity as a response to source after having channeled what truly wants to happen on site\u201D",
  es: "\u201CLa arquitectura es la materializaci\u00F3n del dise\u00F1o del arquitecto a trav\u00E9s de la creatividad como respuesta a la fuente y despu\u00E9s de haber canalizado lo que verdaderamente quiere ocurrir en el sitio\u201D"
};

let running = false;

export function isTransitionRunning() {
  return running;
}

export function runTransition(navigateFn, path, lang) {
  if (running) return;
  running = true;

  const overlay = document.getElementById('page-transition-overlay');
  const quote = document.getElementById('page-transition-quote');

  if (!overlay || !quote) {
    navigateFn(path);
    running = false;
    return;
  }

  const langKey = lang && lang.startsWith('es') ? 'es' : 'en';
  quote.textContent = quotes[langKey];

  gsap.killTweensOf([overlay, quote]);

  const tl = gsap.timeline({
    onComplete() {
      running = false;
    }
  });

  tl
    .set(overlay, { yPercent: -100, pointerEvents: 'all' })
    .set(quote, { opacity: 0, y: 40 })
    // Step 1: slide black overlay down to cover screen
    .to(overlay, { yPercent: 0, duration: 0.9, ease: 'power4.inOut' })
    // Step 2: fade in quote text
    .to(quote, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.1')
    // Step 3: hold for reading
    .to({}, { duration: 3 })
    // Step 4: fade out quote
    .to(quote, { opacity: 0, y: -20, duration: 0.7, ease: 'power2.in' })
    // Step 5: navigate (overlay still covering -- user sees nothing)
    .call(() => {
      navigateFn(path);
      window.scrollTo(0, 0);
    })
    // Step 6: small pause for new page to mount
    .to({}, { duration: 0.25 })
    // Step 7: slide overlay away downward revealing new page
    .to(overlay, { yPercent: 100, duration: 0.9, ease: 'power4.inOut' })
    // Step 8: reset overlay off-screen above
    .set(overlay, { yPercent: -100, pointerEvents: 'none' });
}
