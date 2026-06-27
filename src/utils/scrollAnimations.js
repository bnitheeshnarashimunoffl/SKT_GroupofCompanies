/**
 * GSAP ScrollTrigger Animations
 * 
 * Synchronous imports — no race conditions with StrictMode mount/unmount.
 * Every from() has immediateRender: false so elements render at their
 * natural CSS state and only animate when ScrollTrigger fires.
 * All toggleActions end in 'none' — reveals don't reverse on scroll-up.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initRevealAnimations() {
  gsap.defaults({ ease: 'power3.out', duration: 1 });

  // ── Helper: scoped trigger factory ────────────────────────────────
  const trig = (id, trigger, start = 'top 85%') => ({
    id: `skt-${id}`,
    trigger,
    start,
    toggleActions: 'play none none none',
  });

  // ── Hero — runs immediately, no ScrollTrigger ──────────────────────
  // Only target visible .btn elements to avoid GSAP issues with display:none
  const visibleBtns = gsap.utils.toArray('.hero-cta-group .btn').filter(
    (el) => getComputedStyle(el).display !== 'none'
  );

  const heroTl = gsap.timeline({
    defaults: { opacity: 0, y: 30 },
    onComplete: () => {
      // Clear all inline styles GSAP set, so CSS takes full control
      gsap.set('.hero-eyebrow, .hero-heading span, .hero-subtext, .hero-marquee', { clearProps: 'all' });
      visibleBtns.forEach((btn) => gsap.set(btn, { clearProps: 'all' }));
    },
  });
  heroTl
    .from('.hero-eyebrow', { duration: 0.8, delay: 0.2 })
    .from('.hero-heading span', { duration: 1, stagger: 0.15 }, '-=0.4')
    .from('.hero-subtext', { duration: 0.8 }, '-=0.6')
    .from(visibleBtns, { duration: 0.6, stagger: 0.15, y: 20 }, '-=0.4')
    .from('.hero-marquee', { duration: 1, opacity: 0 }, '-=0.6');

  // ── Section headers ────────────────────────────────────────────────
  document.querySelectorAll(
    '.about-header, .team-header, .services-header, .clients-header, .milestones-header, .branches-header, .contact-header'
  ).forEach((header, i) => {
    gsap.from(header, {
      scrollTrigger: trig(`header-${i}`, header),
      immediateRender: false,
      opacity: 0, y: 40, duration: 1,
    });
  });

  // ── About ─────────────────────────────────────────────────────────
  gsap.from('.about-image-wrapper', {
    scrollTrigger: trig('about-image', '.about-grid', 'top 75%'),
    immediateRender: false,
    opacity: 0, scale: 0.95, duration: 1.2,
  });
  gsap.from('.about-content > *', {
    scrollTrigger: trig('about-content', '.about-content', 'top 80%'),
    immediateRender: false,
    opacity: 0, y: 30, stagger: 0.15, duration: 0.8,
  });

  // ── Team ──────────────────────────────────────────────────────────
  gsap.utils.toArray('.team-member').forEach((member, i) => {
    gsap.from(member, {
      scrollTrigger: trig(`team-${i}`, member, 'top 90%'),
      immediateRender: false,
      opacity: 0, y: 40, duration: 0.8, delay: i * 0.1,
    });
  });

  // ── Services ──────────────────────────────────────────────────────
  gsap.from('.service-card', {
    scrollTrigger: trig('services-cards', '.services-grid', 'top 80%'),
    immediateRender: false,
    opacity: 0, y: 50, stagger: 0.15, duration: 0.8,
  });
  gsap.from('.services-featured', {
    scrollTrigger: trig('services-featured', '.services-featured'),
    immediateRender: false,
    opacity: 0, y: 40, duration: 1,
  });

  // ── Clients ───────────────────────────────────────────────────────
  gsap.from('.client-card', {
    scrollTrigger: trig('clients', '.clients-grid', 'top 80%'),
    immediateRender: false,
    opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.6,
  });

  // ── Milestones ────────────────────────────────────────────────────
  gsap.from('.milestone-card', {
    scrollTrigger: trig('milestones', '.milestones-grid', 'top 80%'),
    immediateRender: false,
    opacity: 0, y: 40, stagger: 0.08, duration: 0.7,
  });

  // ── Branches ──────────────────────────────────────────────────────
  gsap.from('.branch-item', {
    scrollTrigger: trig('branches', '.branches-accordion'),
    immediateRender: false,
    opacity: 0, x: -30, stagger: 0.1, duration: 0.6,
  });

  // ── Contact ───────────────────────────────────────────────────────
  gsap.from('.contact-card', {
    scrollTrigger: trig('contact-cards', '.contact-info', 'top 80%'),
    immediateRender: false,
    opacity: 0, x: -40, stagger: 0.15, duration: 0.8,
  });
  gsap.from('.contact-form', {
    scrollTrigger: trig('contact-form', '.contact-form', 'top 80%'),
    immediateRender: false,
    opacity: 0, x: 40, duration: 1,
  });

  // ── Footer ────────────────────────────────────────────────────────
  gsap.from('.footer-container > *', {
    scrollTrigger: trig('footer', '.footer', 'top 90%'),
    immediateRender: false,
    opacity: 0, y: 20, stagger: 0.1, duration: 0.6,
  });

  // ── Counters (hero stats + about metrics) ─────────────────────────
  animateCounters('.hero-stat-value');
  animateCounters('.about-metric-value');

  // ── Refresh after fonts load (Fontshare is async, reflows heights) ─
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

/**
 * Animate number counters from 0 → final value.
 * Uses fromTo with once:true and explicit finalValue so the counter
 * never overshoots or reverts to zero.
 */
function animateCounters(selector) {
  gsap.utils.toArray(selector).forEach((el, idx) => {
    const text = el.textContent.trim();
    const match = text.match(/([\d.]+)/);
    if (!match) return;

    const finalValue = parseFloat(match[1]);
    const prefix  = text.split(match[1])[0] || '';
    const suffix  = text.split(match[1])[1] || '';
    const isDecimal = text.includes('.');

    gsap.fromTo(el,
      { textContent: 0 },
      {
        scrollTrigger: {
          id: `skt-counter-${selector.replace(/\W/g, '')}-${idx}`,
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        textContent: finalValue,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: isDecimal ? 0.1 : 1 },
        immediateRender: false,
        onUpdate() {
          const raw = parseFloat(this.targets()[0].textContent) || 0;
          const cur = isDecimal ? Math.round(raw * 10) / 10 : Math.round(raw);
          el.textContent = prefix + cur + suffix;
        },
        onComplete() {
          el.textContent = prefix + finalValue + suffix;
        },
      }
    );
  });
}

/**
 * Cleanup only ScrollTriggers scoped with `skt-*` IDs.
 * Does NOT touch the globalTimeline (hero animation stays intact).
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((t) => {
    const id = t.vars && t.vars.id;
    if (id && id.startsWith('skt-')) t.kill();
  });
}

export function refreshAnimations() {
  ScrollTrigger.refresh();
}
