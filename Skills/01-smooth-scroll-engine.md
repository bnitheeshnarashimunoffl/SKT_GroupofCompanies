# Dios Studios — Smooth Scroll Engine (Lenis + GSAP)

> **CRITICAL:** You are operating as an Elite Performance Architect. This file dictates the global scroll physics for the entire application. Flawless execution is required to prevent scroll-jacking penalties and maintain 60fps rendering on mobile.

---

## 1. Objective

Implement a global, performant smooth-scrolling physics engine using Lenis, perfectly synchronise its `requestAnimationFrame` ticker with GSAP's ScrollTrigger, and implement a width-only resize observer to prevent mobile layout thrashing.

---

## 2. Tech Stack

### Allowed
- `lenis` (v1.3+)
- `gsap`
- `gsap/ScrollTrigger`
- React `useRef`, `useEffect`

### Banned
- Native CSS `scroll-behavior: smooth`
- `useState` for scroll position tracking
- `ResizeObserver` without an explicit width-change check

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### Initialization Law
- Lenis **MUST** be initialized once, at the root of the application inside `App.jsx`
- GSAP lag smoothing **MUST** be disabled: `gsap.ticker.lagSmoothing(0)`
- The Lenis instance **MUST** be destroyed in the `useEffect` cleanup (`lenis.destroy()`) to prevent memory leaks

### GSAP Sync Law
Lenis **MUST** be synchronised with GSAP using both:
- `gsap.ticker.add(onTick)`
- `lenis.on('scroll', ScrollTrigger.update)`

Failure to implement both will result in broken scroll animations and desynced triggers.

### Mobile Resize Law
- Mobile browsers fire `resize` continuously as the address bar shows and hides — this is a height-only change and must be ignored
- `ScrollTrigger.refresh()` **MUST NOT** fire on height-only changes
- You **MUST** implement a width-only resize checker that compares `window.innerWidth` before acting
- `ScrollTrigger.refresh()` **MUST** be deferred via `requestIdleCallback` or `setTimeout`

### ResizeObserver Law
- `ResizeObserver` is only permitted if it explicitly checks for a width change before triggering any updates

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| CSS Interference | Never apply `overflow-x: hidden` globally without also applying `overflow-x: clip` |
| Event Listeners | Never attach a `resize` listener that calls `ScrollTrigger.refresh()` directly |
| Memory Leaks | Never omit cleanup of the GSAP ticker, resize listener, or Lenis instance |

---

## 5. The Golden Snippet — Lenis/GSAP Sync Standard

```jsx
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // ── 1. Init Lenis ────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
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
      const currentWidth = window.innerWidth;
      if (currentWidth === lastWidth) return;
      lastWidth = currentWidth;

      clearTimeout(refreshTimeout);
      const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
      refreshTimeout = schedule(() => {
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('resize', onResize, { passive: true });

    // ── 4. Cleanup ───────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="page-container">
      {/* sections go here */}
    </div>
  );
}
```

---

## 6. Global CSS Requirement

This must be present in the root stylesheet. No exceptions.

```css
html,
body {
  overflow-x: clip;
}
```

---

## 7. Required Output Format

> Before generating **any** React code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (Scroll Engine):
- [ ] Lenis initialized in App.jsx
- [ ] GSAP lag smoothing disabled
- [ ] lenis.on('scroll', ScrollTrigger.update) implemented
- [ ] Width-only resize handler implemented
- [ ] Deferred ScrollTrigger.refresh (requestIdleCallback or setTimeout)
- [ ] Full memory cleanup in useEffect return
- [ ] overflow-x: clip applied globally in CSS
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
