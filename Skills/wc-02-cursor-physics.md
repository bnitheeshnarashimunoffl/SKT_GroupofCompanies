# Dios Studios — WC-02: GPU-Composited Cursor Physics

> **CRITICAL:** You are operating as an Elite UI Interaction Developer.
> This file is part of the **WC (Website Component) System** — runtime UI components built on top of the core architecture.
>
> This file dictates a high-performance, physics-driven cursor that runs at 60–120fps with zero layout cost.

---

## 1. Objective

Engineer `Cursor.jsx` featuring:

- Instant snap dot (true mouse position)
- Physics-lagged trailing ring
- GPU-accelerated movement via `transform3d`
- Global hover detection via event delegation
- Zero performance impact on the rest of the page

---

## 2. Tech Stack

### Allowed
- React (`useRef`, `useEffect`)
- `requestAnimationFrame`
- Linear Interpolation (`lerp`)
- `transform: translate3d` for movement
- `will-change: transform` for GPU promotion

### Banned
- `left` / `top` positioning for movement
- `useState` for cursor coordinates
- Per-element `onMouseEnter` / `onMouseLeave` handlers
- Rendering on touch devices

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### GPU Compositing Law
Movement **MUST** use GPU-composited transforms exclusively:

```css
transform: translate3d(x, y, 0);
```

Layout-affecting properties (`top`, `left`, `margin`) are strictly banned for cursor movement.

### Event Delegation Law
- A single global `mouseover` listener on `document` handles all hover detection
- Hover targets are detected via:

```js
e.target.closest('button, a, [data-hover]')
```

Per-element hover handlers are banned.

### Physics Loop Law
- The ring's movement **MUST** run inside a `requestAnimationFrame` loop
- Position **MUST** be updated via `lerp` for smooth spring physics

### Mobile Ban Law
The cursor **MUST NOT** render on touch devices. Detection **MUST** use:

```js
window.matchMedia('(pointer: coarse)').matches
```

### Initialization Law
- The cursor **MUST** initialize at the actual mouse position on first `mousemove`
- Both elements **MUST** start at `opacity: 0` and fade in on the first move to prevent a visual jump from `(0, 0)`

### Layering Law
- Cursor elements **MUST** use `position: fixed`
- Cursor **MUST** hold the highest `z-index` on the page
- Cursor **MUST NEVER** be occluded by canvas, hero, or any UI element

### Cleanup Law
On unmount:
- All event listeners **MUST** be removed
- The `requestAnimationFrame` loop **MUST** be cancelled via `cancelAnimationFrame`

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Movement | Using `left` / `top` CSS properties for cursor positioning |
| State | Using `useState({ x, y })` — React cannot handle this render volume |
| Hover | Applying `onMouseEnter` to individual interactive elements |
| CSS | Forgetting `pointer-events: none` — blocks the user from clicking anything |

---

## 5. The Golden Snippet — Cursor Physics Engine

```jsx
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  const mouse  = useRef({ x: 0, y: 0 });
  const ring   = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // ── Mobile Ban ───────────────────────────────────────────────────
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot    = dotRef.current;
    const ringEl = ringRef.current;
    let isInitialized = false;

    const lerp = (start, end, t) => start + (end - start) * t;

    // ── Mouse Move: Instant Dot ──────────────────────────────────────
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Initialize ring at cursor position to prevent (0,0) jump
      if (!isInitialized) {
        ring.current.x  = e.clientX;
        ring.current.y  = e.clientY;
        dot.style.opacity   = '1';
        ringEl.style.opacity = '1';
        isInitialized = true;
      }

      // Offset by half width/height to center the element on the cursor
      dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    };

    // ── Hover Detection: Event Delegation ───────────────────────────
    const handleHover = (e) => {
      if (e.target.closest('button, a, [data-hover]')) {
        ringEl.classList.add('hovering');
      } else {
        ringEl.classList.remove('hovering');
      }
    };

    // ── Physics Loop: Lerp Ring ──────────────────────────────────────
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15);

      // Offset by half width/height to center the ring on the cursor
      ringEl.style.transform = `translate3d(${ring.current.x - 16}px, ${ring.current.y - 16}px, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleHover, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    // ── Cleanup ──────────────────────────────────────────────────────
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleHover);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: var(--pink, #E91E8C);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          z-index: 99999;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 32px; height: 32px;
          border: 1.5px solid rgba(233, 30, 140, 0.5);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          z-index: 99998;
          opacity: 0;
          transition: opacity 0.3s, width 0.3s, height 0.3s, border-color 0.3s;
        }

        .cursor-ring.hovering {
          width: 48px;
          height: 48px;
          border-color: var(--pink, #E91E8C);
        }
      `}</style>
    </>
  );
}
```

---

## 6. Required Output Format

> Before generating **any** Cursor Physics code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (WC-02 Cursor Physics):
- [ ] Disabled on touch devices via (pointer: coarse) detection
- [ ] X/Y coordinates stored in refs — no useState
- [ ] Movement via translate3d only — no left/top
- [ ] will-change: transform applied to both elements
- [ ] requestAnimationFrame loop implemented for ring
- [ ] Lerp-based physics used for ring trailing
- [ ] Global hover detection via event delegation and closest()
- [ ] pointer-events: none applied to both cursor elements
- [ ] aria-hidden="true" applied to both cursor elements
- [ ] Cursor initialized at actual mouse position — (0,0) jump prevented
- [ ] mousemove and mouseover listeners cleaned up on unmount
- [ ] requestAnimationFrame cancelled on unmount
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
