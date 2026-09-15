# Riffle

**A pool floor painted in living light — refracted-sunlight caustics you can ripple with a touch.**

Everyone has stared at the shimmering net of light dancing on the bottom of a
sunlit pool. Riffle turns it into an interactive toy: it simulates a shallow
body of water as an animated heightfield, refracts a virtual sun through the
wavy surface, and accumulates where the bent light rays converge on the floor
below. Drop a stone and watch the caustic web physically bend, focus, and
re-knit as the wavefront races outward.

One HTML file. No dependencies, no build step, no network.

## Why it's cool

The bright filaments aren't a texture or a shader trick baked in advance — they
are computed the way real caustics form. Every surface cell offsets a downward
light ray by its local slope and splats it into a floor accumulation buffer, so
convergence zones glow bright on their own. It's the standard ray-displacement
caustics technique, live, in ~300 lines of Canvas 2D.

## Features

- **Living water** — a drifting ambient wind-wave field plus a slow gust cycle
  keeps the floor in motion with zero input.
- **Drop a stone** — click/tap spawns an expanding, decaying ripple ring that
  visibly re-focuses the caustic net as it travels.
- **Swing the sun** — drag to change the sun angle. A low sun stretches and
  sharpens the filaments; a high sun tightens them into a fine mesh.
- **Chromatic caustics** — R/G/B rays refract at slightly different indices,
  giving the filament edges a faint prismatic fringe, with an additive bloom.
- **Believable pool** — a stable grout-lined tile floor, depth attenuation
  (deeper reads dimmer and bluer), and animated specular sun glints.
- **Presets** — Calm Dawn, Midday Shimmer, and Storm.
- **Rain** — toggle an automatic drizzle of drops.
- **View toggle** — pool view, or caustics-only to see the raw light net.
- **Shareable links** — the full scene (sun vector, wave params, and live drop
  sources with their ages) round-trips through the URL hash, so any moment is a
  copy-paste link. **Copy link** and **Save PNG** are one click away.
- **Respectful defaults** — honors `prefers-reduced-motion` (the pool sits
  still until you interact) and adapts controls for touch vs. mouse.

## Run it

No install. Open the file:

```
# just double-click index.html, or:
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or serve the folder (any static server works):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

Works in any modern browser (Chrome, Firefox, Safari, Edge).

## Controls

| Action | Mouse | Touch |
| --- | --- | --- |
| Drop a stone | Click | Tap |
| Swing the sun | Drag | One-finger drag |
| Water depth | Scroll wheel | Two-finger pinch |

Plus the on-screen chips: **presets**, **Rain**, **View** (pool vs.
caustics-only), **Copy link**, and **Save PNG**.

## How the caustics work

The surface is a summed-sinusoid heightfield `H`. For each cell, the local
gradient `(∂H/∂x, ∂H/∂y)` deflects a straight-down light ray laterally by an
amount that scales with water depth and sun angle. Each deflected ray is splatted
(+1) into a floor accumulation buffer. Where many rays land in the same cell —
the focus points of the wavy "lens" — the buffer value spikes, which is exactly
where real caustics are brightest. A light box blur, a wide additive bloom pass,
and an exponential tonemap turn that buffer into crisp glowing filaments instead
of noise. The sim runs on a 176×176 grid using reused typed `Float32Array`
buffers to stay smooth.

## License

MIT © 2026 Alex Wictor. See [LICENSE](LICENSE).
