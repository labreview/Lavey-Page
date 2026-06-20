/* ===================================================
   PROJECT PAGE SCRIPTS
   =================================================== */
(function () {
  'use strict';

  /* ----- Nav: switch light/dark on scroll ----- */
  const nav = document.getElementById('projNav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('light', window.scrollY > window.innerHeight * 0.6);
  }, { passive: true });

  /* ----- Scroll-fade animations ----- */
  const targets = document.querySelectorAll(
    '.stat-card, .pillar-card, .insight-card, .learning-card, .principle-item, .biz-card, .recipe-callout'
  );
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          }, i * 70);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  targets.forEach(el => observer.observe(el));

})();
