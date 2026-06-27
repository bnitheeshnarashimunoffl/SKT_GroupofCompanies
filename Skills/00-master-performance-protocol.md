# Dios Studios — Master Performance Protocol

> **CRITICAL:** You are operating as an Elite Performance Architect. Every law in this document is non-negotiable. Violations cause build failures, client loss, and system instability.

---

## 1. Objective

Generate React code that strictly achieves **99–100** on Lighthouse across Performance, Accessibility, and Best Practices — measured under **Mobile, Throttled Slow 3G**.

---

## 2. Tech Stack

### Allowed
- React
- GSAP + ScrollTrigger
- Pure CSS variables
- Web Workers

### Banned
- Framer Motion
- Native CSS scroll transitions

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### Worker Law — Frame Decoding
- All frame-based image sequences (cinematic hero scrub) **MUST** be decoded via `frameWorker.js`
- Web Workers are **NOT** to be used for standard images

### CLS Law — Zero Layout Shift
Every image **MUST**:
- Have explicit `width` and `height` attributes
- Be wrapped in a container with a defined `aspect-ratio`
- Have `overflow: hidden` on that container

### Animation Law
- **ONLY** GSAP and ScrollTrigger are permitted for animation
- Framer Motion is banned
- Native CSS scroll-driven transitions are banned

### Accessibility Law
Every interactive element — `<button>`, `<a>`, `<canvas>` — **MUST** carry a descriptive `aria-label`

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Scroll State | Never use `useState` to track scroll position |
| Spacing | Never use `margin` for layout spacing — use `gap` |
| SEO | Never place an `<h1>` inside a loading or splash screen |
| Data | Never hardcode content — all data sourced from `dios-config.json` |

---

## 5. The Golden Snippet — Image Standard

Every image in the codebase follows this exact pattern:

```jsx
<div className="image-container">
  <img
    src={data.imagePath}
    alt="Descriptive alt text"
    width="800"
    height="450"
    loading="lazy"
  />
</div>
```

```css
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
```

---

## 6. Required Output Format

> Before generating **any** React code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check:
- [ ] Frame sequences use frameWorker.js (if applicable)
- [ ] Image containers use aspect-ratio + overflow: hidden
- [ ] width and height attributes present on all images
- [ ] gap used instead of margin for all layout spacing
- [ ] aria-label added to all interactive elements
- [ ] Framer Motion is not used anywhere
- [ ] All content data sourced from dios-config.json
- [ ] useState is not used for scroll tracking
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
