# Dios Studios — Config & Data Store Architecture

> **CRITICAL:** You are operating as an Elite Data Architect. This file dictates how content, media paths, and dynamic data are decoupled from the UI. Hardcoding content into React components is a fireable offense.

---

## 1. Objective

Implement a strict separation between UI and content. Establish a Hybrid Data Architecture where foundational site data is managed via a centralised config, while dynamic modules (menus, products, etc.) can be overridden via Admin/Database providers.

---

## 2. Tech Stack

### Allowed
- `dios-config.js` (NOT JSON — JS allows comments and dynamic values)
- React Context API
- Supabase / REST APIs

### Banned
- Hardcoded text inside `.jsx`
- Hardcoded image paths inside JSX
- Direct database calls inside presentational components

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### Zero-Hardcoding Law
- **NEVER** write actual content inside JSX
- Components must only render data passed via props or sourced from config

### Hybrid Data Law
You **MUST** support both static and dynamic data:

**Static Baseline**
- Global data (SEO, Hero, Footer, Contact) **MUST** live in `src/config/dios-config.js`

**Dynamic Override**
- Collection data **MUST** have fallback data defined in config
- Collection data **MUST** be overrideable via props or Context
- Components **MUST** always prioritise dynamic data over static config

### SEO Centralisation Law
- All SEO metadata **MUST** exist inside config
- Hardcoded `<title>` or meta tags inside components are banned

### Asset Path Law
- Image and media paths **MUST** only exist in config or the database
- Hardcoded paths inside JSX are banned

### Null Safety Law
Components **MUST** safely handle:
- Missing data
- Empty arrays
- Undefined props

No crashes allowed under any data condition.

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Hardcoding | Writing `<h1>Welcome</h1>` instead of sourcing from config |
| Asset Paths | Writing `/images/file.webp` directly in JSX |
| Mixed Concerns | Fetching from the database inside a presentational component |
| Prop Drilling | Passing the full config object across multiple component layers |

---

## 5. The Golden Snippets

### Dios Config Standard — `src/config/dios-config.js`

```js
export const siteConfig = {
  seo: {
    title: "Dios Studios Premium Template",
    description: "A high-performance cinematic experience.",
    ogImage: "/seo/og-image.jpg"
  },
  hero: {
    heading: "The Future of Web",
    subtext: "Scroll to explore",
    ctaText: "Discover More",
    heroVideoPath: "/media/hero-bg.mp4"
  },
  menu: [
    {
      id: "1",
      name: "Classic Item",
      price: "₹250",
      imagePath: "/images/item1.webp"
    }
  ]
};
```

### Hybrid Component Pattern

```jsx
import { siteConfig } from '../config/dios-config';

export default function MenuGrid({ dynamicItems = null }) {
  const itemsToRender = dynamicItems || siteConfig.menu || [];

  return (
    <div className="menu-items-container">
      {itemsToRender.map((item) => (
        <article key={item.id} className="menu-card">
          <div className="menu-card-image-wrapper">
            <img
              src={item.imagePath}
              alt={item.name}
              className="menu-card-image"
            />
          </div>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </article>
      ))}
    </div>
  );
}
```

---

## 6. Required Output Format

> Before generating **any** React code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (Config & Data Store):
- [ ] No text or image paths hardcoded in JSX
- [ ] dios-config.js created and holds all global data
- [ ] Components support dynamic override via props or Context
- [ ] Dynamic data is prioritised over static config
- [ ] Database logic isolated to Providers or Hooks
- [ ] Components handle null, empty arrays, and undefined props safely
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
