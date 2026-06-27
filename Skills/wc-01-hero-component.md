# Dios Studios — WC-01: Cinematic Hero & Canvas Architecture

> **CRITICAL:** You are operating as an Elite Graphics Performance Engineer.
> This file is part of the **WC (Website Component) System** — a modular component layer built on top of the core infrastructure.
> Unlike Level 0 (infrastructure), WC files define **runtime UI components** that consume the system (FrameWorker, Scroll Engine, Config).
>
> This file dictates how to render high-fidelity, scroll-linked image sequences on an HTML5 `<canvas>` using `frameWorker.js`. Failure to follow these laws will result in frame drops, memory leaks, Safari crashes, or broken scroll sync.

---

## 1. Objective

Engineer the `Hero.jsx` component. This component:

- Consumes decoded frames from `frameWorker.js`
- Renders them onto a `<canvas>`
- Syncs frame progression with scroll using GSAP ScrollTrigger
- Maintains 60fps performance across all devices
- Prevents memory leaks and layout thrashing

---

## 2. Tech Stack

### Allowed
- React (`useRef`, `useEffect`, `useCallback`)
- HTML5 `<canvas>` (`CanvasRenderingContext2D`)
- GSAP (`ScrollTrigger`)
- Web Workers (`frameWorker.js`)

### Banned
- `<img>` tags for sequence rendering
- Canvas resizing on height-only changes
- `useState` for frame index or scroll progress
- Main-thread image decoding

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### Resize Thrashing Law
- Canvas resize **MUST ONLY** trigger on `window.innerWidth` change
- Height changes (e.g. mobile address bar appearing/disappearing) **MUST** be ignored entirely

### DPR Memory Law
- Device Pixel Ratio **MUST** be capped at `1.5` on mobile (`width <= 768px`)
- Leaving DPR uncapped on modern phones exhausts GPU memory and causes silent Safari crashes

### Canvas Sizing Law
- Canvas internal resolution = container size × DPR
- CSS display size and internal pixel buffer **MUST** be decoupled

### Scroll Sync Law
- Frame index **MUST** be driven exclusively by GSAP ScrollTrigger progress
- Manual `window` scroll listeners are banned

### Initial Frame Law
- The first available frame **MUST** render immediately on decode
- The canvas **MUST NEVER** appear blank

### Coalesced Draw Law
- Use an `isDrawingRef` flag to prevent redundant, overlapping paints
- If the target frame is not yet decoded, use **Sparse Interpolation**: find and draw the nearest loaded frame while firing a priority request to the Worker

### DOM Direct Law
- High-frequency updates (progress bars, loaders) **MUST** use direct DOM refs: `ref.current.style.width`
- Binding rapid updates to React `useState` will lock the main thread

### Failsafe Law
On component mount, body scroll **MUST** be unlocked:

```js
try {
  document.body.style.overflow = '';
  document.body.style.overflowX = 'clip';
} catch {}
```

This ensures the user is never trapped if the canvas or sequence fails to load.

### Garbage Collection Law
On unmount:
- `worker.terminate()` **MUST** be called
- Every `ImageBitmap` in `framesRef.current` **MUST** have `.close()` called individually to prevent memory leaks

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Scaling | Using uncapped DPR on mobile devices |
| Resize | Triggering canvas redraws on viewport height changes |
| State | Using `useState` to track the current frame index |
| Rendering | Using `<img>` tags or stretching images without cover-fit math |
| Cleanup | Forgetting `bitmap.close()` or `worker.terminate()` on unmount |

---

## 5. The Golden Snippet — Hero Canvas Architecture

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef      = useRef(null);
  const workerRef      = useRef(null);
  const framesRef      = useRef([]);
  const currentFrameRef = useRef(0);
  const isDrawingRef   = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d', { alpha: false });

    // ── Failsafe: Unlock scroll ──────────────────────────────────────
    try {
      document.body.style.overflow  = '';
      document.body.style.overflowX = 'clip';
    } catch {}

    // ── 1. DPR + Resize Logic ────────────────────────────────────────
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth <= 768 ? 1.5 : 2  // ← cap DPR on mobile
    );
    let lastWidth = 0;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      if (w === lastWidth && canvas.width !== 0) return; // ignore height-only changes
      lastWidth = w;

      const h = window.innerHeight;
      canvas.width        = Math.floor(w * dpr);
      canvas.height       = Math.floor(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });

    // ── 2. Coalesced Draw + Cover-Fit Math ───────────────────────────
    const drawFrame = (index) => {
      if (isDrawingRef.current) return;
      isDrawingRef.current = true;

      let bitmap = framesRef.current[index];

      // Sparse interpolation fallback — find nearest decoded frame
      if (!bitmap) {
        for (let i = 1; i < 10; i++) {
          if (framesRef.current[index - i]) { bitmap = framesRef.current[index - i]; break; }
          if (framesRef.current[index + i]) { bitmap = framesRef.current[index + i]; break; }
        }
      }

      if (bitmap) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);

        // Object-fit: cover math
        const ca = w / h;
        const ia = bitmap.width / bitmap.height;
        let dw, dh, dx, dy;

        if (ca > ia) {
          dw = w;  dh = w / ia;  dx = 0;           dy = (h - dh) / 2;
        } else {
          dh = h;  dw = h * ia;  dx = (w - dw) / 2; dy = 0;
        }

        ctx.drawImage(bitmap, dx, dy, dw, dh);
      }

      isDrawingRef.current = false;
    };

    // ── 3. Worker Setup ──────────────────────────────────────────────
    const worker = new Worker(
      new URL('./frameWorker.js', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const { type, index, bitmap } = e.data;
      if (type === 'frame') {
        framesRef.current[index] = bitmap;
        if (index === 0) resizeCanvas(); // ← render first frame immediately
        if (index === currentFrameRef.current) drawFrame(index);
      }
    };

    // Replace [] with the actual array of frame paths from config
    worker.postMessage({ type: 'init', total: 300, paths: [] });

    // ── 4. Scroll Sync ───────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger : '.hero-section',
      start   : 'top top',
      end     : '+=3000',
      pin     : true,
      scrub   : true,
      onUpdate: (self) => {
        const targetFrame = Math.floor(self.progress * 299);
        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          worker.postMessage({ type: 'priority', priorityFrame: targetFrame });
          drawFrame(targetFrame);
        }
      }
    });

    // ── 5. Garbage Collection ────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      st.kill();
      worker.terminate();
      framesRef.current.forEach(bitmap => {
        if (bitmap && typeof bitmap.close === 'function') bitmap.close();
      });
      framesRef.current = [];
    };
  }, []);

  return (
    <section className="hero-section">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0 }}
        aria-label="Cinematic hero animation"
        role="img"
      />
    </section>
  );
}
```

---

## 6. Required Output Format

> Before generating **any** Canvas or Hero code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (WC-01 Hero Canvas):
- [ ] Canvas initialized with 2D context (alpha: false)
- [ ] DPR capped at 1.5 on mobile (width <= 768px)
- [ ] Resize triggered only on width change — height changes ignored
- [ ] Canvas internal size scaled with DPR, CSS size decoupled
- [ ] Cover-fit math applied during drawImage
- [ ] Worker connected and receiving frames
- [ ] First frame rendered immediately on decode
- [ ] ScrollTrigger drives frame progression — no scroll listeners
- [ ] Sparse interpolation implemented for missing frames
- [ ] Priority frame requests fired to Worker on scroll
- [ ] No useState used for frame index or scroll progress
- [ ] Failsafe overflow unlock implemented on mount
- [ ] Worker terminated on unmount
- [ ] All ImageBitmap objects closed individually on cleanup
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
