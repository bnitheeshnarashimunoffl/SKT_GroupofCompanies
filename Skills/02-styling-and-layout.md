# Dios Studios — Styling & Layout Architecture

> **CRITICAL:** You are operating as an Elite UI/UX Engineer. This file dictates the visual rendering engine, layout mathematics, and zero-CLS laws for the application. Any deviation from this design system will result in layout shifts, failed builds, and termination of the process.

---

## 1. Objective

Enforce a strict, pure-CSS design system using CSS Variables, fluid typography (`clamp`), and Grid/Flexbox layouts. Maintain an absolute **0.00** Cumulative Layout Shift (CLS) score by mathematically reserving space for all media before it loads.

---

## 2. Tech Stack

### Allowed
- Pure CSS (Vanilla)
- CSS Custom Properties (Variables)
- CSS Grid & Flexbox
- `clamp()`, `min()`, `max()` for fluid responsiveness

### Banned
- Tailwind CSS
- Styled Components / Emotion
- CSS Modules
- Inline `<style>` blocks in JSX (unless driven dynamically by GSAP)

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### Zero-CLS Media Law
- Do **NOT** rely on `height: auto` for layout-critical sizing
- Every image or video **MUST** be wrapped in a container `div`
- That container **MUST** define `aspect-ratio` and `overflow: hidden`
- The `<img>` inside **MUST** use `width: 100%`, `height: 100%`, and `object-fit: cover`

### Design Token Law
- No hardcoded hex values or font family strings anywhere in the codebase
- All styling **MUST** reference global CSS variables from `:root`

### Global Token Requirement
- All design tokens **MUST** be defined in the global `:root` stylesheet before any component references them

### Fluid Typography Law
- All major typography **MUST** use `clamp(min, preferred, max)`
- Multiple media queries for font scaling are banned

### Spacing Law
- Use Flexbox/Grid with `gap` for all layout spacing
- `margin` is banned for spacing between sibling elements

### PX Usage Law
- Hardcoded `px` values are banned for typography and major layout sizing
- Small decorative values (borders, shadows, radii) are permitted

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Inline Styles | Never write `<div style={{ marginTop: '20px' }}>` |
| Media Queries | Never stack multiple breakpoints for typography scaling |
| Hardcoded Colors | Never write raw hex values in CSS or JSX |
| Image Layout | Never let an image control its parent's height |

---

## 5. The Dios Design System — Available Tokens

> You MUST use these exclusively. Inventing new tokens is not permitted.

### Colors
| Token | Usage |
|---|---|
| `--pink` | Primary brand, CTAs, highlights |
| `--cream` | Primary background |
| `--cream-dark` | Secondary background, cards |
| `--charcoal` | Primary text |
| `--charcoal-soft` | Secondary text |
| `--mustard` | Accent, stats, decorative |
| `--pink-dim` | Subtle pink tints, overlays |
| `--pink-light` | Hover states, soft fills |

### Typography
| Token | Usage |
|---|---|
| `--font-display` | Headings, display text |
| `--font-body` | Body copy, labels, captions |

### Animation
| Token | Usage |
|---|---|
| `--ease-out-expo` | All GSAP and CSS transitions |

---

## 6. The Golden Snippets

### Layout & Spacing — Grid + Gap

```css
.menu-items-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: clamp(1.5rem, 4vw, 2.5rem);
  align-items: stretch;
}
```

### Zero-CLS Image Wrapper

```css
.menu-card-image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--cream);
}

.menu-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Fluid Typography

```css
.section-heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--charcoal);
  line-height: 1.1;
}
```

---

## 7. Required Output Format

> Before generating **any** React code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (Styling & Layout):
- [ ] No Tailwind or CSS-in-JS used
- [ ] Image containers use aspect-ratio + overflow: hidden
- [ ] Images use width: 100%, height: 100%, object-fit: cover
- [ ] height: auto not used for layout-critical images
- [ ] gap used for all sibling spacing (margin banned)
- [ ] clamp() used for all responsive typography
- [ ] var(--tokens) used exclusively — no hardcoded values
- [ ] No inline <style> blocks in JSX
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
