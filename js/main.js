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

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initNav();
    initReveal();
    initSmoothScroll();
  });
})();
