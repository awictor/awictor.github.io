# Camber

**Hand-tune the curve your UI moves on, then copy the exact CSS.**

Camber is a single-file, zero-dependency easing editor. Drag the two control
handles of a cubic-bezier on a unit grid and watch a bank of live demos animate
along it in real time — a modal scaling in, a toast sliding, a knob traveling, a
staggered list — all looping on one shared clock so you *feel* the timing instead
of reading numbers. A velocity strip under the curve shows where motion speeds up,
stalls, or overshoots at a glance. One click copies the paste-ready token.

## Why it's cool

Everyone reaches for cubic-bezier.com, but it stops at cubic-beziers. Camber
also covers the two other things you actually ship today:

- **CSS springs** via a real `linear()` string (a tiny physics sim, sampled),
- **staircase timing** via `steps(n, jump-*)` with correct semantics and a crisp
  staircase render.

Add a side-by-side feel-test, a velocity readout, and full state in the URL hash —
so "here's the easing I want" becomes a link you can drop in a PR comment. It runs
entirely offline from one HTML file.

## Run it

Open `index.html` in any modern browser. No build step, no server, no install.

```
# or, if you prefer a local server:
python3 -m http.server   # then visit http://localhost:8000/index.html
```

## Modes & output

| Mode | Copied token |
|------|--------------|
| cubic-bezier | `cubic-bezier(x1, y1, x2, y2)` |
| spring → linear() | `linear(0, …, 1)` sampled from a mass/stiffness/damping sim |
| steps() | `steps(n, jump-start\|end\|both\|none)` |

Besides the raw token, the export buttons give you a ready `@keyframes` block, a
Web Animations API snippet, a Framer/JS transition object, a downloadable SVG of
the curve, and a copy-share-link button.

## Controls

- **Drag** either handle on the grid. X is clamped to [0, 1]; Y can overshoot.
- **Keyboard**: focus a handle and use the arrow keys to nudge (hold **Shift** for
  a ×5 step). Handles are ARIA sliders, so this works with a screen reader too.
- **Numeric fields** let you type exact control-point coordinates.
- **Presets**: CSS keywords (`ease`, `ease-in`, `ease-out`, `ease-in-out`,
  `linear`) plus Penner-style curves (`easeInOutCubic`, `easeOutBack`, `anticipate`).
- **Import**: paste an existing `cubic-bezier(…)`, `linear(…)`, or `steps(…)` string
  to load it back into the editor and tweak.
- **Demo bank**: play/pause, scrub the timeline, set the duration, and pick an
  A/B reference (a native keyword or the faint *ghost* of your previous curve) to
  compare against on the same clock.

`prefers-reduced-motion` is honored — auto-play is disabled and the demos show a
static end-frame you can scrub.

## Shareable links

Every setting (mode, curve/spring/steps params, duration, A/B reference) is
serialized into the URL hash on each change, and imported `linear()` curves are
preserved too. Copy the URL — or use **Copy share link** — and the recipient opens
the exact same curve. A malformed or truncated hash falls back to sane defaults
rather than breaking the editor.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
