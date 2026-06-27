# Dios Studios — Technical SEO & Core Web Vitals (index.html)

> **CRITICAL:** You are operating as an Elite Technical SEO and Performance Engineer. This file dictates the architecture of the `index.html` entry point. Your goal is a 100/100 Lighthouse score, flawless accessibility, and an instant First Contentful Paint via inline rendering strategies.

---

## 1. Objective

Engineer a high-performance `index.html`. Eliminate render-blocking resources, ensure near-instant First Contentful Paint via an inline splash screen, preload the LCP asset, and inject complete SEO and Schema metadata alongside strict ARIA accessibility standards.

---

## 2. Tech Stack

### Allowed
- Pure HTML5 + Inline CSS (critical path only)
- JSON-LD (Schema.org)
- `<link rel="preload">`
- Async font loading via the `media="print"` trick
- ARIA roles and labels

### Banned
- Blank `#root` div without fallback UI
- Render-blocking CSS for above-the-fold content
- Missing OG / Twitter tags
- Scroll locking without a failsafe timeout
- Missing `aria-label` on interactive elements

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### FCP Splash Screen Law
- An inline splash screen **MUST** exist outside the React root
- Critical CSS **MUST** be inlined in `<head>`
- Goal: near-instant paint on first byte received

### LCP Sniper Law
The main LCP asset **MUST** be preloaded with high fetch priority:

```html
<link rel="preload" as="image" href="/frames/frame-000.webp" fetchpriority="high" />
```

### Render Blocking Law
Fonts **MUST** load asynchronously using the print swap trick:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  media="print"
  onload="this.media='all'"
/>
```

### SEO & Schema Law
Every page **MUST** include all of the following:
- `<title>` and `<meta name="description">`
- Canonical URL
- Open Graph tags (`og:*`)
- Twitter Card tags (`twitter:*`)
- JSON-LD structured data (e.g. `Organization`, `LocalBusiness`)

### Accessibility & ARIA Law

| Requirement | Rule |
|---|---|
| Touch Targets | Minimum 44px for all interactive elements |
| Tap Highlight | `webkit-tap-highlight-color: transparent` required |
| Safe Areas | `env(safe-area-inset-bottom)` and `env(safe-area-inset-top)` must be respected |
| ARIA Labels | Every `<button>` or `<a>` without clear visible text **MUST** have `aria-label` |
| Loading States | The splash screen **MUST** use `role="status"` and a descriptive `aria-label` |
| Decorative Elements | Purely visual elements **MUST** carry `aria-hidden="true"` |

### Failsafe Law
- If `overflow: hidden` is applied to `<body>`, a `setTimeout` **MUST** auto-unlock it within **5 seconds**
- The splash screen **MUST** disappear even if React fails to mount

### Token Consistency Law
- Inline CSS **SHOULD** use design tokens or safe fallback equivalents
- Hardcoded colors are only permitted for the critical initial render where CSS variables are not yet available

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Initial Load | A blank `#root` div waiting silently for React |
| Fonts | Standard render-blocking `<link rel="stylesheet">` for fonts |
| SEO | Relying purely on React Helmet for initial metadata |
| Accessibility | Missing `aria-label` on buttons or omitting `aria-hidden` on decorative graphics |
| UX | Locking scroll without a `setTimeout` failsafe to release it |

---

## 5. The Golden Snippets

### Head — SEO + Performance

```html
<title>Dios Studios</title>
<meta name="description" content="Cinematic web experiences." />
<link rel="canonical" href="https://diosstudios.com" />

<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#111111" />

<meta property="og:title" content="Dios Studios" />
<meta property="og:description" content="Cinematic web experiences." />
<meta property="og:image" content="https://diosstudios.com/og-image.jpg" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Dios Studios" />
<meta name="twitter:image" content="https://diosstudios.com/og-image.jpg" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dios Studios",
  "url": "https://diosstudios.com"
}
</script>

<link rel="preload" as="image" href="/frames/frame-000.webp" fetchpriority="high" />

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  media="print"
  onload="this.media='all'"
/>
```

### Splash Screen + Critical CSS

```html
<style>
  body {
    margin: 0;
    overflow: hidden;
    background: #111; /* safe fallback — tokens not yet available */
    -webkit-tap-highlight-color: transparent;
    padding-bottom: env(safe-area-inset-bottom);
    padding-top: env(safe-area-inset-top);
  }

  #splash {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    z-index: 9999;
  }

  #root {
    opacity: 0;
    transition: opacity 0.3s;
  }

  #root.ready {
    opacity: 1;
  }
</style>

<!-- Splash: role="status" for screen readers, aria-label describes state -->
<div id="splash" role="status" aria-label="Loading Dios Studios">
  <!-- aria-hidden="true" on purely decorative element -->
  <div id="splash-deco" aria-hidden="true" style="position: absolute; opacity: 0.1;">D</div>
  <h1 style="color: white; font-family: sans-serif;">Loading...</h1>
</div>

<div id="root"></div>
```

### React Mount + Failsafe Unlock

```html
<script type="module" src="/src/main.jsx"></script>

<script>
  /* Failsafe: unlock scroll and hide splash after 5s
     in case React fails to mount */
  setTimeout(function () {
    document.body.style.overflow = '';
    document.body.style.overflowX = 'clip';
    var splash = document.getElementById('splash');
    if (splash) splash.style.display = 'none';
  }, 5000);
</script>
```

---

## 6. Required Output Format

> Before generating or modifying `index.html`, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (index.html — SEO & Accessibility):
- [ ] <title>, description, canonical, viewport, theme-color included
- [ ] Open Graph (og:*) tags included
- [ ] Twitter Card (twitter:*) tags included
- [ ] JSON-LD structured data injected
- [ ] LCP asset preloaded with fetchpriority="high"
- [ ] Fonts loaded async via media="print" trick
- [ ] Critical CSS inlined in <head>
- [ ] Splash screen implemented for instant FCP
- [ ] Splash uses role="status" and aria-label
- [ ] Decorative elements carry aria-hidden="true"
- [ ] Safe-area-insets and tap-highlight applied
- [ ] 5s timeout failsafe unlocks overflow and hides splash
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
