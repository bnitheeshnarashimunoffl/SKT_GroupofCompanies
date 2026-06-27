# Dios Studios — UI/UX Governance Layer

> **CRITICAL:** You are operating within the Dios Studios Architecture System.
>
> This workspace contains two distinct knowledge layers:
>
> - `skills/` → The Core Architecture System — **Hard Rules**
> - `ui-ux/` → UI/UX Intelligence & Design Inspiration — **Soft Guidance**
>
> You MUST understand the difference between them before writing a single line of code.

---

## 1. System Hierarchy

### `skills/` — Hard Constraints (Primary System)

The `skills/` folder governs:
- Performance laws and rendering architecture
- Security rules and runtime constraints
- Accessibility requirements
- Component structure and system consistency
- Browser performance protections

These rules are mandatory, non-negotiable, and production-critical. Violating them is a system failure.

### `ui-ux/` — Soft Guidance (Advisory Layer)

The `ui-ux/` folder exists to improve:
- Aesthetics and visual hierarchy
- Typography, spacing, and readability
- Interaction feel and motion polish
- Conversion-oriented UX

These files are inspirational and advisory. They are **not permitted** to override the architecture defined in `skills/`.

---

## 2. The Priority Order

When generating code, follow this order without exception:

| Priority | Layer |
|---|---|
| 1 | Security |
| 2 | Performance |
| 3 | Accessibility |
| 4 | System Consistency |
| 5 | Maintainability |
| 6 | UI/UX Polish |

UI/UX improvements are only valid if every higher-priority layer remains fully intact.

---

## 3. The Performance Supremacy Law

If any `ui-ux/` recommendation does any of the following, it **MUST** be rejected immediately:

- Increases layout thrashing
- Introduces unnecessary re-renders
- Significantly increases bundle size
- Causes Cumulative Layout Shift
- Blocks the main thread
- Harms Lighthouse scores
- Adds excessive animation complexity
- Introduces unstable abstractions

Performance always takes priority over visual flourish.

---

## 4. The Architectural Integrity Law

The AI **MUST NOT**:
- Override `skills/` architecture rules
- Replace system-defined rendering strategies
- Remove performance protections
- Bypass cleanup logic
- Alter runtime guarantees
- Introduce conflicting patterns

The `skills/` system is the operating system. The `ui-ux/` layer is decorative intelligence only.

---

## 5. The Simplicity Law

UI/UX polish **MUST** remain subtle, purposeful, performant, and maintainable.

Avoid:
- Overdesign and animation overload
- Excessive visual effects or unnecessary abstractions
- Award-site syndrome

The target audience is real-world business users — not design showcases.

---

## 6. The Motion Governance Law

All motion inspired by `ui-ux/` **MUST**:
- Remain GPU composited
- Use `transform` and `opacity` only
- Avoid layout-triggering properties
- Remain interruptible
- Feel responsive on mobile
- Preserve 60fps rendering

Visual smoothness **MUST NEVER** come at the cost of runtime stability.

---

## 7. The Mobile-First UX Law

Mobile usability always takes priority over desktop aesthetics.

Prioritise in this order:
- Touch ergonomics and accessibility
- Readability and loading speed
- Responsiveness and simplicity

Visual experimentation comes after all of the above are satisfied.

---

## 8. The Override Prevention Law

If any `ui-ux/` guidance conflicts with `skills/`, performance architecture, security rules, accessibility requirements, or runtime protections:

- The `skills/` system **MUST** win immediately
- The `ui-ux/` suggestion **MUST** be discarded

No exceptions.

---

## 9. The Ideal Thought Order

The AI **MUST** think in this exact sequence:

**First — using `skills/`:**
> "How do I build this correctly, safely, and performantly?"

**Then — using `ui-ux/`:**
> "How do I make this feel polished and premium without harming the system?"

Never reverse this order.

---

## 10. Required Output Behaviour

```
Governance Check (UI/UX Layer):
- [ ] skills/ architecture rules read and active
- [ ] ui-ux/ files treated as advisory only — not overrides
- [ ] All UI/UX suggestions pass the Performance Supremacy Law
- [ ] All motion remains GPU composited — transform/opacity only
- [ ] Mobile usability verified before desktop polish
- [ ] No skills/ rule has been overridden by a ui-ux/ suggestion
```

The architecture always has final authority.

---

*Dios Studios — Build with discipline or don't build at all.*
