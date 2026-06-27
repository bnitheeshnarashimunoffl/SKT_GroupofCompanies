# Dios Studios — Admin Dashboard & Auth Architecture

> **CRITICAL:** You are operating as an Elite Full-Stack Engineer. This file dictates the architecture for the private, authenticated Admin Dashboard used to manage dynamic site content via Supabase. Your primary directive is to build this dashboard so that **zero** admin code, CSS, or processing time ever bleeds into the public-facing website. The public site's FCP, LCP, and SEO performance must be fiercely protected.

---

## 1. Objective

Engineer a secure, functional, and visually distinct Admin Dashboard. Implement strict route protection using React Router and Context. Isolate all Admin styling from the public-facing website to prevent CSS pollution and maintain perfect public Lighthouse scores. Ensure graceful handling of all asynchronous Supabase operations.

---

## 2. Tech Stack

### Allowed
- React Router (`Navigate`, `useNavigate`)
- Context API for auth state
- Supabase JS Client
- Inline `<style>{...}</style>` blocks (Admin-only, scoped)

### Banned
- External CSS stylesheets for Admin components
- Unprotected Admin routes
- Missing async loading/error/empty states
- Redux or any heavy state manager

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### Auth Protection Law
- Every Admin route **MUST** be wrapped in `AdminLayout`
- If `!user && !loading` → redirect immediately to `/admin/login`
- Auth state **MUST** persist across page refresh via Supabase session (`onAuthStateChange`)

> **Why this matters for SEO:** By redirecting unauthenticated users, the heavy Admin DOM is completely hidden from Googlebot. Your Admin payload never impacts the public site's indexing or performance scores.

### Style Isolation Law
- Admin CSS **MUST** exist only inside inline `<style>` blocks at the bottom of each Admin component
- Styles **MUST** be scoped using class names (e.g. `.admin-nav`, `.dashboard-card`)
- Global `.css` files for Admin components are banned

> **Why this matters for Core Web Vitals:** CSS in global files forces the browser to download and parse it before painting the public splash screen. Trapping Admin styles inside Admin JSX ensures public users never download them — guaranteeing instant FCP and LCP on the public site.

### Graceful Async Law
Every Supabase request **MUST** handle all three states:

| State | Required Behaviour |
|---|---|
| Loading | Show spinner, disable all action buttons |
| Empty | Show a clear empty state with a CTA |
| Error | Display an error message — no silent failures |

### Error Handling Law
- Every Supabase response **MUST** check for errors explicitly:

```js
const { data, error } = await supabase.from('table').select('*');
if (error) {
  // handle explicitly — never ignore
}
```

### Destructive Action Law
- All `DELETE` actions **MUST** require confirmation via `confirm()` or a custom modal before executing

### Request Control Law
While any async operation is in progress:
- Action buttons **MUST** be disabled
- Duplicate requests **MUST** be prevented

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Routing | Exposing admin routes without an auth check — destroys SEO and security |
| Styling | Writing admin CSS in global stylesheets — creates render-blocking bloat that kills FCP |
| UX | Allowing multiple submits during an active async operation |
| UX | Showing a blank screen during initial data loading |
| Error Handling | Ignoring Supabase errors or failing silently |

---

## 5. The Golden Snippets

### Protected Layout — The SEO Shield

```jsx
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';

export default function AdminLayout({ children }) {
  const { user, loading, signOut } = useAdmin();

  if (loading) {
    return <div className="admin-loading">Verifying Access...</div>;
  }

  // CRITICAL SEO SHIELD: Hides the dashboard DOM from Googlebot
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <h1>Dashboard</h1>
        <button onClick={signOut}>Logout</button>
      </nav>

      <main>{children}</main>

      <style>{`
        .admin-layout { min-height: 100vh; background: #0a0a0a; color: #fff; }
        .admin-nav { display: flex; justify-content: space-between; padding: 1rem; }
      `}</style>
    </div>
  );
}
```

### CRUD Pattern — With Request Control & Graceful Async

```jsx
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

export default function DashboardPage() {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing]   = useState(false); // prevents duplicate requests

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('menu_items').select('*');

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    if (acting) return; // prevent duplicate requests

    setActing(true);
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    setActing(false);

    if (error) {
      console.error(error);
      return;
    }

    fetchItems();
  };

  // ── Loading state ─────────────────────────────────────────────────
  if (loading) return <div className="admin-state">Loading...</div>;

  // ── Empty state ───────────────────────────────────────────────────
  if (!items.length) {
    return <div className="admin-state">No items yet. Add your first one.</div>;
  }

  return (
    <div className="dashboard-page">
      {items.map(item => (
        <div key={item.id} className="dashboard-card">
          <h3>{item.name}</h3>
          <button
            onClick={() => handleDelete(item.id)}
            disabled={acting} // ← disabled during active request
          >
            Delete
          </button>
        </div>
      ))}

      <style>{`
        .dashboard-page { padding: 2rem; }
        .dashboard-card { display: flex; justify-content: space-between; padding: 1rem; }
        .admin-state { padding: 2rem; color: #aaa; }
      `}</style>
    </div>
  );
}
```

---

## 6. Required Output Format

> Before generating **any** Admin Dashboard code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (Admin Dashboard & SEO Protection):
- [ ] Admin routes protected via Auth Context
- [ ] Unauthenticated users redirected — hides DOM from SEO crawlers
- [ ] Auth session persists across page refresh
- [ ] CSS isolated inside inline <style> blocks — protects public FCP/LCP
- [ ] Loading states implemented for all async operations
- [ ] Action buttons disabled during active async operations
- [ ] Empty states handled with a clear CTA
- [ ] All Supabase errors handled explicitly — no silent failures
- [ ] Destructive actions require confirmation before executing
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
