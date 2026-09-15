# Ringdown

**Design spring physics, copy real CSS `linear()` easing.**

Ringdown is a single-file spring-animation designer. It treats a CSS timing
curve as a damped harmonic oscillator, lets you tune stiffness, damping, and
mass, and emits a ready-to-paste modern CSS `linear()` easing string that
reproduces that exact spring in any browser — no runtime animation library.

## Why it's cool

Springs are how modern UI animation actually feels right (React Spring, Framer
Motion, iOS), but native CSS has no spring primitive — so people hand-tune magic
cubic-béziers that can't overshoot. CSS `linear()` easing (now broadly shipped)
can encode *any* curve, including a real spring's overshoot and ring-down.
Ringdown closes that gap: tune the physics, get portable, dependency-free CSS.
"Ringdown" is the physics term for a decaying oscillation settling to rest —
which is exactly what a spring easing is.

## The physics

Ringdown solves the step response of a second-order system:

```
m·x″ + c·x′ + k·x = 0      (x: 0 → 1, starting at rest)
```

- `k` — stiffness (pull toward the target)
- `c` — damping (energy bleed)
- `m` — mass (inertia)

From these it computes the natural frequency and damping ratio ζ and picks the
exact closed-form solution for the regime — **underdamped** (overshoots and
rings down), **critically damped** (fastest settle, no overshoot), or
**overdamped** (slow, no overshoot). No numerical integration, so the curve is
analytically correct.

## How `linear()` reproduces it

A CSS `linear(...)` easing is a piecewise-linear function of progress. Ringdown
samples the analytic spring at N points across the duration, prunes
near-collinear samples with a Douglas–Peucker pass (keeps the string short), and
emits stops like `linear(0, 0.42 8%, 1.12 34%, ... 1)`. The final stop is pinned
to `1.0` so the animation always lands exactly on its target, even if you shorten
the duration below the spring's natural settle time. A live **max error** readout
tells you how faithful the sampled curve is to the true spring.

## Run it

No build, no server, no dependencies, no network calls.

- **Easiest:** double-click `index.html`, or open it in any modern browser
  (Chrome, Edge, Firefox, Safari).
- **Served statically** (optional):
  ```
  python -m http.server 8000
  # then open http://localhost:8000/index.html
  ```

## Controls & usage

- **Stiffness / Damping / Mass** — the three spring sliders. The curve, regime,
  overshoot %, and settle time update live.
- **Snap to critical** — sets damping to the critical value for the current
  `k`/`m` (fastest settle with zero overshoot).
- **Samples** — trade output fidelity against string length. More samples =
  lower max error, longer `linear()`.
- **Duration** — the emitted animation duration. Leave it on **Auto** (tracks
  the spring's settle time) or type an exact value.
- **Presets** — Gentle, Wobbly, Stiff, and Deadbeat (critical) as live
  mini-preview chips.
- **Drag on the canvas** — grab the diamond (the first overshoot peak) to
  back-solve stiffness/damping while keeping mass, or drag the dashed rest line
  up/down to scale the spring's speed.
- **Preview** — click the track to fire a box using your generated easing
  (translate + scale). Honors `prefers-reduced-motion`.
- **Output tabs** — copy any of five targets: raw `linear()` + duration, a
  `transition` snippet, a `@keyframes` snippet, Framer Motion spring params, or
  react-spring `tension`/`friction`/`mass`. Tabs are keyboard-navigable
  (arrow keys); the Copy button falls back to a manual-select prompt in
  non-secure contexts where the Clipboard API is unavailable.

## Shareable state

The full spring (`k`, `c`, `m`, samples, and any manual duration) is serialized
into the URL hash, e.g.:

```
#k=180.0&c=12.00&m=1.00&n=24
```

Copy the address bar to share the exact spring. On load, hash values are
validated and clamped to the slider ranges, so a stale or hand-edited link can't
break the app.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
