/* ===== ASHRAFUL ISLAM - SCRIPT.JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAV SCROLL EFFECT ===== */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ===== MOBILE NAV TOGGLE ===== */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  /* ===== SCROLL REVEAL ===== */
  const revealElements = document.querySelectorAll('.reveal, .timeline-item, .goal-item, .stagger, .tilt-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Stagger for tilt-cards in grid
        if (el.classList.contains('tilt-card')) {
          const cards = Array.from(document.querySelectorAll('.tilt-card'));
          const index = cards.indexOf(el);
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 100);
        } else {
          el.classList.add('visible');
        }
        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  // Initial hidden state for tilt-cards
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease, box-shadow 0.35s cubic-bezier(0.23,1,0.32,1), border-color 0.35s cubic-bezier(0.23,1,0.32,1)';
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ===== GOAL ITEMS STAGGER DELAY ===== */
  document.querySelectorAll('.goal-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });

  /* ===== ORB PARALLAX ===== */
  const orbScene = document.querySelector('.orb-scene');
  if (orbScene) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      orbScene.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
    }, { passive: true });
  }

  /* ===== 3D TILT CARDS ===== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotX = -dy * 8;
        const rotY = dx * 8;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
        // Dynamic shadow
        card.style.boxShadow = `
          ${-dx * 20}px ${-dy * 20}px 50px rgba(0,0,0,0.4),
          0 0 40px rgba(0,255,136,0.1),
          inset 0 0 0 1px rgba(0,255,136,0.15)
        `;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
      card.style.boxShadow = '';
    });
  });

  /* ===== ORB PARTICLES ===== */
  const particlesContainer = document.querySelector('.orb-particles');
  if (particlesContainer) {
    createParticles(particlesContainer);
  }

  function createParticles(container) {
    const count = 16;
    const colors = ['#00FF88', '#00D4FF', '#ffffff'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      const size = Math.random() * 4 + 2;
      const angle = Math.random() * 360;
      const radius = 140 + Math.random() * 60;
      const startX = container.offsetWidth / 2 + Math.cos(angle * Math.PI / 180) * radius;
      const startY = container.offsetHeight / 2 + Math.sin(angle * Math.PI / 180) * radius;
      const endAngle = angle + (Math.random() * 120 - 60);
      const endRadius = radius + (Math.random() * 40 - 20);
      const endX = container.offsetWidth / 2 + Math.cos(endAngle * Math.PI / 180) * endRadius;
      const endY = container.offsetHeight / 2 + Math.sin(endAngle * Math.PI / 180) * endRadius;

      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 5;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${startX}px;
        top: ${startY}px;
        box-shadow: 0 0 ${size * 3}px ${color};
        opacity: 0;
        position: absolute;
        border-radius: 50%;
      `;

      // Animate with keyframe-based approach
      const keyframes = [
        { opacity: 0, transform: 'translate(0, 0)' },
        { opacity: 0.9, transform: `translate(${(endX - startX) * 0.5}px, ${(endY - startY) * 0.5}px)`, offset: 0.3 },
        { opacity: 0, transform: `translate(${endX - startX}px, ${endY - startY}px)` }
      ];

      const animate = () => {
        const anim = p.animate(keyframes, {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: 'ease-in-out',
          fill: 'both'
        });
        anim.onfinish = () => {
          setTimeout(animate, Math.random() * 2000);
        };
      };

      container.appendChild(p);
      setTimeout(animate, delay * 1000);
    }
  }

  /* ===== SMOOTH COUNTER ANIMATION ===== */
  // Not used but keeping for possible future stat counters

  /* ===== ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ===== CUSTOM CURSOR ===== */

  // 1. Small sharp dot — snaps instantly to cursor
  const cursorDot = document.createElement('div');
  cursorDot.id = 'cursor-dot';
  document.body.appendChild(cursorDot);

  // 2. Larger ring — lags behind with lerp for smooth trailing
  const cursorRing = document.createElement('div');
  cursorRing.id = 'cursor-ring';
  document.body.appendChild(cursorRing);

  // 3. Ambient glow blob — very soft, follows slowest
  const cursorGlow = document.createElement('div');
  cursorGlow.id = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let mouseX = -200, mouseY = -200;
  let ringX = -200, ringY = -200;
  let glowX = -200, glowY = -200;
  let isHovering = false;

  // Track real mouse position instantly
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
    cursorGlow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
    cursorGlow.style.opacity = '1';
  });

  // Detect hover over interactive elements
  const interactiveSelectors = 'a, button, .tilt-card, .stat-card, .timeline-card, .goal-item, .nav-toggle';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      isHovering = true;
      cursorRing.classList.add('cursor-hover');
      cursorDot.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      isHovering = false;
      cursorRing.classList.remove('cursor-hover');
      cursorDot.classList.remove('cursor-hover');
    }
  });

  // Click burst
  document.addEventListener('mousedown', () => cursorRing.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => cursorRing.classList.remove('cursor-click'));

  // RAF loop — lerp the ring and glow toward mouse
  function lerpCursor() {
    // Dot: instant
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

    // Ring: smooth lag (lerp factor 0.14)
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

    // Glow blob: slowest lag (lerp factor 0.07)
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;

    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  /* ===== TEXT SHIMMER on hover for nav logo ===== */
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.background = 'linear-gradient(90deg, #fff, #00FF88, #00D4FF, #fff)';
      logo.style.backgroundSize = '200% auto';
      logo.style.webkitBackgroundClip = 'text';
      logo.style.webkitTextFillColor = 'transparent';
      logo.style.animation = 'none';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.background = '';
      logo.style.webkitBackgroundClip = '';
      logo.style.webkitTextFillColor = '';
    });
  }

});
