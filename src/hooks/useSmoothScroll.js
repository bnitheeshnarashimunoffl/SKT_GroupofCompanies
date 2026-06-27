/**
 * Smooth Scroll Hook — Lenis + GSAP Integration
 *
 * Synchronous imports — no StrictMode race conditions, no mixed-pattern
 * bundling warnings. Cleanup is scoped: lenis owns its ticker and instance,
 * scrollAnimations.js owns its ScrollTriggers. Neither module kills the
 * other's resources.
 *
 * Per 01-smooth-scroll-engine.md:
 * - Lenis initialized once at app root
 * - GSAP ticker sync with zero lag smoothing
 * - Width-only resize handler
 * - Full cleanup on unmount
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // ── 1. Init Lenis ────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // ── 2. GSAP Sync ─────────────────────────────────────────────────
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    // ── 3. Width-Only Resize Handler ─────────────────────────────────
    let lastWidth = window.innerWidth;
    let refreshTimeout = null;

    const onResize = () => {
      const w = window.innerWidth;
      if (w === lastWidth) return;
      lastWidth = w;
      clearTimeout(refreshTimeout);
      const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
      refreshTimeout = schedule(() => ScrollTrigger.refresh());
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── 4. Cleanup — ONLY our ticker and instance ────────────────────
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      // Do NOT kill ScrollTriggers here — scrollAnimations.js owns
      // its triggers and cleans them up in cleanupAnimations().
    };
  }, []);

  return lenisRef;
}
