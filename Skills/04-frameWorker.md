# Dios Studios — Off-Thread Image Engine (FrameWorker)

> **CRITICAL:** You are operating as an Elite Graphics Performance Engineer. This file dictates the architecture for decoding high-fidelity image sequences off the main thread. Doing this incorrectly will cause severe main-thread blocking, frame drops, and iOS Safari crashes.

---

## 1. Objective

Implement a Web Worker pipeline that fetches, decodes, and transfers image frames (WebP/JPEG) entirely off the main JavaScript thread using `createImageBitmap` and Transferable Objects. Implement a Sparse-First loading strategy to guarantee visual continuity even on slow networks.

---

## 2. Tech Stack

### Allowed
- Web Workers (`new Worker()`)
- `fetch()` for Blob retrieval
- `createImageBitmap()` (hardware-accelerated decoding)
- `postMessage` with Transferable Objects

### Banned
- `<img>` tags for sequence rendering
- `<canvas>` rendering inside the Worker
- Main-thread image decoding
- Sequential 1-by-1 loading without keyframe distribution

---

## 3. The Immutable Laws

> Zero tolerance. No exceptions. No edge cases.

### Off-Thread Decoding Law
- The main thread **MUST NOT** fetch or decode sequence images
- The Worker **MUST** use `fetch()` + `createImageBitmap()` exclusively

### Zero-Copy Transfer Law
- Transferable Objects **MUST** be used when posting bitmaps back to the main thread:

```js
self.postMessage({ type: 'frame', index, bitmap }, [bitmap]);
```

- Omitting `[bitmap]` causes memory cloning instead of transfer — this is a critical violation

### Sparse-First Strategy Law
The loading pipeline **MUST** follow this exact phase order:

| Phase | Action |
|---|---|
| Phase 0 | Decode frame 0 immediately |
| Phase 1 | Decode ~12 evenly distributed keyframes |
| Phase 2 | Fill remaining frames in small batches |

A micro-yield **MUST** be inserted between each decoded frame to prevent event loop blocking:

```js
await new Promise(r => setTimeout(r, 0));
```

### Priority Override Law
- The Worker **MUST** listen for priority frame requests from the main thread
- If the requested frame has not yet been decoded, it **MUST** be fetched and decoded immediately

### Fetch Behaviour Law
- Fetch priority hints are not universally supported across browsers
- Logic **MUST NOT** depend on priority hints being respected

### Frame Limit Law
- Frame sequences **MUST NOT** exceed **480 frames**
- Exceeding this limit causes memory pressure and crashes on mobile devices

### Memory Management Law
- The main thread **MUST** release `ImageBitmap` references after rendering
- Use `bitmap.close()` wherever applicable to prevent memory leaks

---

## 4. Anti-Patterns

> Never do any of the following. Ever.

| Category | What to Never Do |
|---|---|
| Decoding | Using `new Image()` or `<img>` for sequence frames |
| Memory Transfer | Omitting `[bitmap]` in `postMessage` |
| Loading | Linear 1 → N loading without keyframe distribution |
| Event Loop | Blocking loop without a micro-yield between frames |

---

## 5. The Golden Snippet — FrameWorker Logic

```js
let totalFrames = 0;
let framePaths = [];
let decoded = new Set();

async function decodeFrame(index, priority = false) {
  if (decoded.has(index)) return true;

  try {
    const response = await fetch(framePaths[index]);
    if (!response.ok) throw new Error();

    const blob = await response.blob();

    const bitmap = await createImageBitmap(blob, {
      premultiplyAlpha: 'premultiply',
      colorSpaceConversion: 'none'
    });

    decoded.add(index);

    self.postMessage(
      { type: 'frame', index, bitmap },
      [bitmap]  // ← Transferable — zero-copy
    );

    return true;
  } catch {
    return false;
  }
}

async function decodeBatch(indices) {
  for (const index of indices) {
    await decodeFrame(index);
    await new Promise(r => setTimeout(r, 0)); // ← micro-yield
  }
}

function getKeyframes(total, count) {
  const step = Math.floor((total - 1) / (count - 1));
  return Array.from({ length: count }, (_, i) =>
    Math.min(i * step, total - 1)
  );
}

function getFill(total, keyframes) {
  const set = new Set(keyframes);
  return Array.from({ length: total }, (_, i) => i).filter(i => !set.has(i));
}

async function loadAllFrames() {
  // ── Phase 0: First frame immediately ────────────────────────────
  await decodeFrame(0);
  self.postMessage({ type: 'phase', phase: 0 });

  // ── Phase 1: Distributed keyframes ──────────────────────────────
  const keyframes = getKeyframes(totalFrames, 12);
  await decodeBatch(keyframes);
  self.postMessage({ type: 'phase', phase: 1 });

  // ── Phase 2: Fill remaining in batches ──────────────────────────
  const fill = getFill(totalFrames, keyframes);
  const BATCH = 8;

  for (let i = 0; i < fill.length; i += BATCH) {
    await decodeBatch(fill.slice(i, i + BATCH));
  }

  self.postMessage({ type: 'complete' });
}

self.onmessage = (e) => {
  const { type, paths, total, priorityFrame } = e.data;

  if (type === 'init') {
    totalFrames = total;
    framePaths = paths;
    decoded.clear();
    loadAllFrames();
  }

  if (type === 'priority' && priorityFrame !== undefined) {
    if (!decoded.has(priorityFrame)) {
      decodeFrame(priorityFrame, true);
    }
  }
};
```

---

## 6. Required Output Format

> Before generating **any** React code, you **MUST** output the following checklist in full. Code generation is not permitted until the checklist is complete.

```
Architecture Check (Off-Thread Image Engine):
- [ ] Web Worker used for all frame decoding
- [ ] createImageBitmap used (not new Image())
- [ ] Transferable Objects used — [bitmap] passed in postMessage
- [ ] Sparse-first loading implemented (Phase 0 → 1 → 2)
- [ ] Micro-yield inserted between decoded frames
- [ ] Priority frame handling implemented
- [ ] Main thread handles rendering only — no decoding
- [ ] ImageBitmap memory released with bitmap.close() after use
```

Only after every box is checked are you permitted to generate code.

---

*Dios Studios — Build with discipline or don't build at all.*
