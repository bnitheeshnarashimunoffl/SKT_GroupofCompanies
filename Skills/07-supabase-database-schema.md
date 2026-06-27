# Dios Studios — Supabase Database & Security Architecture

> **CRITICAL:** You are operating as an Elite Database Administrator and Security Engineer. This file dictates the schema design and Row Level Security (RLS) implementation for Supabase. Your primary directive is to ensure absolute data security, prevent unauthorised mutations, enforce predictable data sorting, and provide the developer with exact deployment instructions.

---

## 1. Objective

Engineer a secure, production-ready PostgreSQL schema in Supabase. Enforce strict Row Level Security, prevent unauthorised mutations, ensure predictable UI ordering, and provide exact implementation instructions for the developer.

---

## 2. Tech Stack

### Allowed
- Supabase PostgreSQL
- Row Level Security (RLS)
- Supabase `anon` key (frontend only)
- UUID primary keys
- Supabase Storage (for media)

### Banned
- Disabling RLS on any table
- Exposing the `service_role` key in frontend code
- Permissive mutation policies (`USING (true)` on writes)
- Tables without a sorting column
- SQL output without a human execution plan

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### RLS Law
RLS **MUST** be enabled on every table without exception:

```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Policy Security Law
- Public read access is permitted:
  ```sql
  FOR SELECT USING (true)
  ```
- All mutation policies **MUST** be restricted to authenticated users:
  ```sql
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated')
  ```
- `USING (true)` on `INSERT`, `UPDATE`, or `DELETE` is a **critical violation**

### Schema Standard Law
Every table **MUST** include these three columns:

| Column | Definition |
|---|---|
| `id` | `UUID PRIMARY KEY DEFAULT uuid_generate_v4()` |
| `created_at` | `TIMESTAMPTZ DEFAULT NOW()` |
| `display_order` | `INTEGER DEFAULT 0` |

### Data Integrity Law
- All critical fields **MUST** use `NOT NULL`
- Nullable important fields are banned

### Predictable UI Law
- The frontend **MUST** always query with `.order('display_order')`
- Unsorted queries produce unpredictable UI rendering

### Indexing Law
Frequently queried columns **MUST** be indexed:

```sql
CREATE INDEX idx_display_order ON menu_items(display_order);
```

### Storage Security Law
All media uploads **MUST** use Supabase Storage with the following bucket rules:
- Public **read** access allowed
- **Write** access restricted to authenticated users only

### Manual Handoff Law
Every SQL output **MUST** be followed by a step-by-step human action plan. SQL without deployment instructions is an incomplete deliverable.

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Security | Skipping RLS on any table |
| Policies | Using `USING (true)` for mutations |
| Schema | Using auto-increment integer IDs instead of UUIDs |
| Performance | Creating tables with no indexes on sorted columns |
| Handoff | Delivering SQL with no execution instructions |

---

## 5. The Golden Snippet — Schema + RLS + Indexing

```sql
-- ── 1. Create Table ──────────────────────────────────────────────────
CREATE TABLE menu_items (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ             DEFAULT NOW(),
  display_order INTEGER                 DEFAULT 0,
  name          TEXT        NOT NULL,
  price         TEXT        NOT NULL
);

-- ── 2. Enable RLS ────────────────────────────────────────────────────
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- ── 3. Public Read Policy ────────────────────────────────────────────
CREATE POLICY "public_read"
ON menu_items FOR SELECT
USING (true);

-- ── 4. Authenticated Mutation Policies ───────────────────────────────
CREATE POLICY "auth_insert"
ON menu_items FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_update"
ON menu_items FOR UPDATE
TO authenticated
USING  (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_delete"
ON menu_items FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- ── 5. Performance Index ─────────────────────────────────────────────
CREATE INDEX idx_display_order ON menu_items(display_order);
```

---

## 6. Required Output Format

> Before generating **any** SQL or database code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (Database & Security):
- [ ] UUID used for all primary keys
- [ ] created_at column included
- [ ] display_order column included
- [ ] NOT NULL constraints applied to all critical fields
- [ ] RLS enabled on every table
- [ ] Public SELECT policy created
- [ ] INSERT, UPDATE, DELETE policies restricted to authenticated users
- [ ] No USING (true) on any mutation policy
- [ ] Indexes created on sorted/queried columns
- [ ] Storage bucket rules defined (public read, authenticated write)
- [ ] Human Action Plan included after SQL
```

Only after every box is checked are you permitted to generate code.

---

## ⚡ Human Action Plan

> Execute these steps in order after the SQL is generated.

1. Go to the **Supabase Dashboard** → create a new project
2. Open the **SQL Editor**
3. Paste the generated SQL → click **Run**
4. Go to **Storage** → create a new bucket
   - Enable **public read**
   - Restrict **write to authenticated users**
5. Go to **Settings → API** and copy your credentials:
   ```js
   const supabaseUrl = 'YOUR_PROJECT_URL';
   const supabaseAnonKey = 'YOUR_ANON_KEY';
   ```
6. Add credentials to `supabase.js` or your `.env` file
7. Go to **Authentication → Users** → create your admin user

---

*Dios Studios — Build with discipline or don't build at all.*
