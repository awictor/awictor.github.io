# Creaseform

Generate flat-foldable origami tessellations, then watch them collapse.

Creaseform is a single-screen origami-tessellation studio: one HTML file, zero
dependencies, no build step. Pick a family — Miura-ori, waterbomb, or hexagonal
twist — and it builds a mathematically exact, flat-foldable crease pattern on a
repeating grid. A master **Fold** slider drives a continuous flat-to-folded
collapse, rigidly hinging every panel about its creases and projecting to 2.5D
so you watch the paper gather and open in real time.

## Why it's cool

Most origami-tessellation toys show a static crease pattern or a pre-baked GIF.
Creaseform generates the geometry from each family's fold kinematics and animates
the actual motion, so the flat-foldability isn't asserted — it's demonstrated.
The Miura collapse is a true single-DOF rigid fold: every panel stays rigid and
every edge keeps its flat length (verified numerically to ~4.4e-16, machine
epsilon). And the SVG export is a real print-and-fold crease pattern, not a
screenshot.

## Features

- **Three flat-foldable generators** — Miura-ori (exact isometric single-DOF
  collapse), waterbomb (8-triangle base cells), and hexagonal twist (rotating
  honeycomb with valley pleats), all sharing one panel-transform pipeline.
- **Master fold slider** driving a continuous flat-to-folded collapse with a
  rotated-orthographic 2.5D projection and painter's-algorithm depth sorting.
- **Live regeneration** from grid size, sector/twist angle, cell depth, and a
  movable light source.
- **Mountain vs valley creases** color- and dash-coded; folded facets shade by
  surface normal against the light for a papercraft look, with a soft ground
  shadow.
- **Print-ready layered SVG export** — mountain, valley, and cut creases as
  separate `<g>` layers from the flat pattern.
- **Shareable URL-hash presets** — every parameter (including play/pause state)
  is encoded in the URL for one-click reproduction.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a
tab. That's the whole setup: zero dependencies, no build, no network calls.

It auto-plays a breathing fold loop on load (nice for screenshots and GIFs).

Optionally serve it over HTTP if you prefer (not required):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

> The **Copy link** button uses the clipboard API, which some browsers restrict
> on `file://` pages. If a copy fails, the shareable URL is still in the address
> bar. Serving over HTTP avoids the restriction.

## Controls

| Control | What it does |
|---|---|
| **Family** (Miura-ori / Waterbomb / Hex twist) | Switch tessellation generator |
| **Fold collapse** | Master flat-to-folded position; dragging it pauses the breathing loop |
| **Grid size** | Number of repeated unit cells (2–10) |
| **Sector angle** (Miura) / **Fold sharpness** (Waterbomb) / **Twist rate** (Hex) | Per-family fold geometry — the label updates with the family |
| **Cell depth** / **Pop height** | Per-family panel depth / center pop |
| **Light source** | Azimuth of the shading light (0–360°) |
| **Breathe** | Toggle the auto-play fold loop |
| **Reset** | Restore defaults |
| **Export SVG** | Download the flat crease pattern as layered SVG |
| **Copy link** | Copy a shareable URL encoding all parameters |

## Notes on the math

Each family is a grid of repeated unit cells fed through a shared transform
pipeline; a generator returns a common `{points, faces, creases}` contract, so
projection, shading, and SVG export don't care which family produced the mesh.

- **Miura-ori** uses the exact single-DOF parametrization: parallelogram panels
  hinge about their creases with no stretching, which is why edge lengths are
  preserved to machine epsilon at every fold angle.
- **Waterbomb** uses the standard 8-triangle base collapse — centers pop up,
  edge vertices fold down — as the fold angle sweeps.
- **Hexagonal twist** rotates each hexagon as the sheet gathers, opening valley
  pleats between neighboring cells.

Folding uses each family's closed-form kinematics plus a lightweight oblique
projection rather than a full 3D rigid-fold solver — accurate motion without a
heavy engine.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
