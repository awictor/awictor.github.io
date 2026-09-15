# Sillage

**A zero-dependency, single-file curl-noise flow-field painter.** Thousands of particles drift through a divergence-free vector field, leaving fading ink-wakes that marble into flowing generative art.

![Sillage — aurora palette](https://img.shields.io/badge/deps-0-brightgreen) ![single file](https://img.shields.io/badge/build-none-blue)

## Why it's cool

Curl noise is the trick that separates a mesmerizing flow-field painter from a mediocre one. The velocity field is the **2D curl of a domain-warped fBm Perlin potential**, which makes it divergence-free (incompressible). Because nothing can pile up in an incompressible flow, streams glide *alongside* each other in silky, non-crossing ribbons instead of clumping into blobs — the water-and-ink look you get from marbling paper.

Each particle draws a thin, additively-blended trail onto a canvas that fades a hair every frame. The accumulation of thousands of paths slowly builds a painterly composition — the *sillage*, the wake left behind. Speed and age drive stroke width, opacity, and color, so fast/young particles read as bright highlights and slow/old ones as soft washes, giving real depth.

Everything is live-tunable, seedable, and shareable by link. It's both a satisfying toy and a reproducible art generator.

## Run it

No build step, no dependencies, no network calls.

- **Double-click `index.html`**, or drag it into any modern browser.
- Optionally serve it statically (`python -m http.server`, `npx serve`, etc.) — this is only needed if you want the *Copy link* button to use the async clipboard API, which some browsers restrict on `file://`. A textarea fallback copies the link either way.

Append a shared `#hash` to the URL to reproduce an exact painting; the full parameter set (field scale, curl, warp, particle count, fade, step, palette, seed, toggles) is encoded there and loads on open.

## Controls

**Panel sliders (hot-applied, no restart):**

| Control | What it does |
|---|---|
| Field scale | Zoom of the noise field — small = broad sweeps, large = fine turbulence |
| Curl strength | Magnitude of the velocity field |
| Domain warp | Feeds noise back into its own coordinates for organic, braided eddies |
| Particles | 1,500–20,000 agents advected each frame |
| Trail fade | How fast the canvas washes back to the background (short trails vs. long smears) |
| Step / pace | Integration step size / flow speed |

**Palette:** ink on rice paper, aurora, ember, cyanotype, monochrome, magma bloom.

**Toggles:** `evolve` (slowly drifts the field's z-offset so a finished painting keeps breathing) · `bloom` (additive blurred self-composite) · `grain` (paper-texture overlay, also baked into PNG exports).

**Seed:** shown in the panel; **re-roll** picks a new one. The bottom **variation gallery** renders 5 seeded thumbnails — click one to promote its seed to the full canvas.

**Buttons:** Clear · Pause/Resume · Copy link · Save PNG.

**Keyboard shortcuts:**

| Key | Action |
|---|---|
| `Space` | Pause / resume |
| `C` | Clear canvas |
| `H` | Hide / show the UI |
| `R` | Re-roll seed |
| `S` | Save PNG |

## How it works

- **PRNG:** `mulberry32` seeded from a string hash of the seed — deterministic across reloads.
- **Noise:** improved 3D Perlin with a seeded permutation table; 4-octave fBm.
- **Field:** `curl()` finite-differences the (domain-warped) fBm potential with a small epsilon to produce a divergence-free 2D velocity.
- **Render:** one `fillRect` fade wash per frame, then per-particle segments batched into quantized color/width/alpha buckets and stroked with `globalCompositeOperation = "lighter"` — so the whole frame is a handful of `stroke()` calls rather than thousands of state changes. Particles respawn on exit, stall, or old age.
- **Export:** `Save PNG` composites the paper grain onto an offscreen copy (matching the on-screen overlay blend) before serializing, so the saved image matches what you see.

Single file, ~380 lines including inline CSS and JS.

## License

MIT © Alex Wictor
