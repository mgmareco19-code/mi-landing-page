/* =========================================================
   AUTO-PAUSA LAVADERO — script.js
   ========================================================= */
(function () {
  'use strict';

  // Número centralizado de WhatsApp (formato internacional, sin '+')
  const WHATSAPP_NUMBER = '595971309243';
  const DEFAULT_MESSAGE = 'Hola, quiero reservar un turno en Auto-Pausa Lavadero';

  function buildWhatsAppLink(message) {
    const text = encodeURIComponent(message || DEFAULT_MESSAGE);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }

  function initWhatsAppLinks() {
    document.querySelectorAll('[data-wa-link]').forEach((el) => {
      const customText = el.getAttribute('data-wa-text');
      el.setAttribute('href', buildWhatsAppLink(customText));
    });
  }

  // Menú móvil
  function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      observer.observe(el);
    });
  }

  // Header con sombra al hacer scroll
  function initHeaderShadow() {
    const header = document.getElementById('header');
    if (!header) return;
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 18px rgba(10,46,69,.08)' : 'none';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Botón flotante de WhatsApp: aparece después de bajar un poco
  function initFloatingWhatsApp() {
    const btn = document.getElementById('floatWa');
    if (!btn) return;
    const onScroll = () => {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Botón flotante "volver arriba": aparece cerca del final de la página
  function initFloatingTop() {
    const btn = document.getElementById('floatTop');
    if (!btn) return;

    const onScroll = () => {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200;
      btn.classList.toggle('is-visible', scrolledToBottom);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // Galería: lightbox al hacer clic en una foto
  function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    if (!items.length || !lightbox || !lightboxImg || !closeBtn) return;

    function open(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    items.forEach((item) => {
      item.addEventListener('click', () => {
        const full = item.getAttribute('data-full');
        const img = item.querySelector('img');
        open(full || (img ? img.src : ''), img ? img.alt : '');
      });
    });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppLinks();
    initNavToggle();
    initReveal();
    initHeaderShadow();
    initFloatingWhatsApp();
    initFloatingTop();
    initGalleryLightbox();
    initYear();
  });
})();
