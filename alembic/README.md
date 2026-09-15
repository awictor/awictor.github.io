# Alembic

**A Gray-Scott reaction-diffusion lab with a clickable pattern-zoo map.**

Two virtual reagents diffuse and react on a 200×200 grid, spontaneously self-organizing into Turing patterns — coral, spots, stripes, mitosis, solitons, and labyrinths. Alembic renders this in real time and puts the classic Pearson f/k phase-space chart right next to the vessel, with the named pattern zones drawn on it. Click anywhere on that map and the running simulation warps into that regime.

## Why it's cool

Most reaction-diffusion demos are opaque: you drag two mystery numbers and hope. Alembic's differentiator is the **clickable, zone-labeled phase map** — it turns the entire Gray-Scott pattern zoo into something you navigate in one gesture, so it works as both a mesmerizing generative-art toy and a genuine interactive explainer of Turing morphogenesis. Every result is deterministic from a seed and the full state lives in the URL hash, so anything striking is instantly reproducible and shareable.

## Features

- **Real-time simulation** — double-buffered `Float32Array` fields, a flat 9-point Laplacian kernel with precomputed toroidal wrap offsets, several sim steps per animation frame, drawn via a single `ImageData` blit.
- **Interactive phase map** — the Pearson f/k parameter space with six labeled zones (spots, solitons, mitosis, coral, maze, worms). Click to jump regimes; a crosshair marks the current spot and a fading numbered breadcrumb trail records recent stops.
- **Tour the zoo** — a one-click guided traversal that smoothly morphs the simulation across the six named regions.
- **Mouse/touch painting** — drag on the vessel to inject reagent B with a soft radial brush and seed or steer growth, with selectable symmetry (1×, 2× mirror, 4×, 6×, kaleido).
- **Seed presets** — center dot, ring, spore grid, and a text stamp.
- **Live sliders** — feed `f`, kill `k`, diffusion A, diffusion B, and steps/frame.
- **Four palettes** — patina, ferrofluid, ink, bone, mapped through a 256-entry gradient lookup.
- **Analysis overlay** — a live reagent-B concentration histogram plus a heuristic pattern-type label from coverage and threshold-crossing frequency.
- **Export & share** — save the current vessel as an upscaled PNG, capture a short WebM clip, or copy a shareable link that restores the full state (`f`, `k`, `dA`, `dB`, palette, seed, steps, symmetry).
- **Deterministic** — mulberry32 PRNG, so any seed reproduces exactly. Zero dependencies, single file.

## Run

Open `index.html` in any modern browser — double-click it, or drag it into a tab. No server, build step, or network access required.

> Copy-link and WebM recording rely on browser APIs that are restricted outside a secure context. If you open the file directly (`file://`) and the copy button reports it couldn't copy, either copy the URL from the address bar or serve the folder locally, e.g. `python -m http.server` then visit `http://localhost:8000`.

## Controls

| Control | What it does |
|---|---|
| **Click the phase map** | Warp the simulation to that feed/kill point |
| **Drag on the vessel** | Paint reagent B (respects the symmetry setting) |
| **Tour the zoo** | Auto-traverse the six named pattern regions |
| **Clear trail** | Remove the breadcrumb polyline from the map |
| **feed / kill / diffuse A / diffuse B / steps/frame** | Live parameter sliders |
| **symmetry** | Brush symmetry: 1× none, 2× mirror, 4×, 6×, kaleido |
| **Center dot / Ring / Spore grid / Text stamp** | Seed presets (reused by Re-seed and on seed change) |
| **palette** | patina · ferrofluid · ink · bone |
| **seed** | Integer seed for deterministic re-runs |
| **Pause / Re-seed** | Freeze the reaction (and the tour) / re-seed with the current preset |
| **Analysis** | Toggle the histogram + pattern-type label overlay |
| **Record** | Capture a ~6s WebM clip (with a live countdown) |
| **PNG** | Download the current vessel, upscaled 4× |
| **Copy link** | Copy a URL that restores the full state |

## License

MIT — see [LICENSE](LICENSE).
