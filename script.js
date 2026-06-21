/* ===================================================
   LAVEY LAI — PORTFOLIO SCRIPTS
   =================================================== */

(function () {
  'use strict';

  /* ----- Hero entrance animation ----- */
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      const hero = document.querySelector('.hero');
      if (hero) hero.classList.add('hero-loaded');
    });
  });

  /* ----- Nav: scroll state & active link ----- */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const toggle   = document.querySelector('.nav-toggle');
  const navMenu  = document.querySelector('.nav-links');

  function updateNav() {
    navbar.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.75);

    let current = '';
    for (const sec of sections) {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    }
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ----- Mobile nav toggle ----- */
  toggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  /* ----- Scroll-reveal animations ----- */
  // Section headers — no stagger, reveal as unit
  document.querySelectorAll('.section-header, .contact-inner').forEach(el => {
    el.classList.add('fade-up');
  });

  // About grid — single reveal
  document.querySelectorAll('.about-grid').forEach(el => {
    el.classList.add('fade-up');
  });

  // Project cards — stagger within the grid
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.setProperty('--fd', `${i * 70}ms`);
  });

  // Literature cards — stagger
  document.querySelectorAll('.lit-card').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.setProperty('--fd', `${i * 65}ms`);
  });

  // Skill items — stagger in small batches
  document.querySelectorAll('.skill-item').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.setProperty('--fd', `${i * 35}ms`);
  });

  // Photo items — stagger by column position (mod 4)
  document.querySelectorAll('.photo-item').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.setProperty('--fd', `${(i % 4) * 65}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ----- Video autoplay on scroll ----- */
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    },
    { threshold: 0.25 }
  );
  document.querySelectorAll('video[autoplay]').forEach(vid => {
    vid.removeAttribute('autoplay');
    videoObserver.observe(vid);
  });

  /* ----- Photography Lightbox ----- */
  const photoItems   = document.querySelectorAll('.photo-item');
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const btnClose     = document.getElementById('lightbox-close');
  const btnPrev      = document.getElementById('lightbox-prev');
  const btnNext      = document.getElementById('lightbox-next');

  const photoSrcs = Array.from(photoItems).map(
    item => item.querySelector('img').src
  );
  let currentIdx = 0;

  function openLightbox(index) {
    currentIdx = index;
    lightboxImg.src = photoSrcs[currentIdx];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPhoto(delta) {
    currentIdx = (currentIdx + delta + photoSrcs.length) % photoSrcs.length;
    lightboxImg.src = photoSrcs[currentIdx];
  }

  photoItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click',  () => showPhoto(-1));
  btnNext.addEventListener('click',  () => showPhoto(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPhoto(-1);
    if (e.key === 'ArrowRight')  showPhoto(1);
  });

  /* ----- Touch swipe for lightbox ----- */
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) showPhoto(delta < 0 ? 1 : -1);
  }, { passive: true });

})();
