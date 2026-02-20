/* ============================================
   AIけいすけ — Official Website
   Minimal JavaScript — No particles, no canvas
   ============================================ */

(function () {
  'use strict';

  // --- Scroll Reveal (Intersection Observer) ---
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    els.forEach(function (el) { observer.observe(el); });
  }

  // --- Nav: background on scroll ---
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var threshold = 80;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > threshold) {
            nav.classList.add('is-scrolled');
          } else {
            nav.classList.remove('is-scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Hero: carousel ---
  function initCarousel() {
    var track = document.querySelector('.hero__track');
    var dots = document.querySelectorAll('.hero__dot');
    if (!track || !dots.length) return;

    var current = 0;
    var total = dots.length;
    var interval = 5000;
    var timer;

    function goTo(index) {
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
      });
    }

    function next() {
      goTo((current + 1) % total);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(this.getAttribute('data-slide')));
        clearInterval(timer);
        timer = setInterval(next, interval);
      });
    });

    timer = setInterval(next, interval);
  }

  // --- Smooth scroll for anchor links ---
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Gallery Lightbox ---
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var img = lightbox.querySelector('.lightbox__img');
    var items = document.querySelectorAll('.gallery__item img');
    var current = 0;

    function open(index) {
      current = index;
      img.src = items[current].src;
      img.alt = items[current].alt;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function prev() {
      open((current - 1 + items.length) % items.length);
    }

    function next() {
      open((current + 1) % items.length);
    }

    items.forEach(function (item, i) {
      item.parentElement.addEventListener('click', function () { open(i); });
    });

    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', prev);
    lightbox.querySelector('.lightbox__next').addEventListener('click', next);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  // --- Days Active: auto-calculate from start date ---
  function initDaysActive() {
    var el = document.getElementById('days-active');
    if (!el) return;
    var start = new Date('2026-01-13T00:00:00+09:00');
    var now = new Date();
    var days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    el.textContent = days;
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initNav();
    initReveal();
    initSmoothScroll();
    initLightbox();
    initDaysActive();
  });
})();
