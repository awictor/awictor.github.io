# Interfringe

**Living quasicrystals from intersecting light — de Bruijn multigrids you can morph, slide, and never see repeat.**

A single-file, zero-dependency canvas toy that builds aperiodic rhombic tilings with the de Bruijn multigrid (pentagrid) construction: `N` families of evenly spaced parallel lines, each intersection dualized into a rhombus.

## Why it's cool

The multigrid is the elegant, less-traveled road to Penrose tilings, and it exposes two dials most generators hide:

- **Symmetry order N.** One slider takes you from `N=5` (Penrose P3) through `N=8` (Ammann–Beenker) to a `13`-fold quasicrystal — all from the *same* construction.
- **The offset vector γ (the "phason window").** Nudging each line family's offset makes rhombi flip and re-tile in smooth phason waves. The pattern is a genuinely living quasicrystal: it reorganizes continuously and never repeats.

Rhombi are colored by their generating type (which pair of line families formed them, and their opening angle), so you get matching-rule-like color families for free — thin tiles to fat tiles.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. No build, no install, no network.

```
# or serve it, if you prefer
python -m http.server 8000   # then open http://localhost:8000
```

## Controls

| Action | How |
| --- | --- |
| Pan | Drag the canvas |
| Zoom | Scroll wheel, pinch (touch), the **± Zoom** buttons, or `+` / `-` keys |
| Reset view | **Reset view** button or `0` |
| Play / pause phason drift | **Play** button or `Space` |
| Symmetry order N | The `N` slider (`5` = Penrose P3, `8` = Ammann–Beenker) |
| Drift speed | Slider |
| Palette | Dropdown (Aurora / Ember / Ink / Candy) |
| Overlays | **Edges**, **Stars** (high-coordination vertices), **Ribbons** (Ammann-style bands) |
| Grid extent | Slider — more rhombi, wider field, heavier animation |
| Offset vector γ | Expand the **γ** panel for per-family sliders, or **Randomize offsets** |
| Export | **Export PNG** (raster) or **Export SVG** (one polygon per rhombus, print-quality) |
| Share | **Copy share link** — the full state (N, offsets, palette, zoom, pan, extent, overlays) lives in the URL hash |

The color legend under the readout shows what the tile colors mean (thin → fat).

## Nice starting points

- `N=5` — classic Penrose P3, two rhombi (thin 36°, fat 72°).
- `N=8` — Ammann–Beenker, square + 45° rhombus.
- `N=13` — an exotic high-fold quasicrystal; turn drift on and watch it breathe.

## How it works

For each pair of line families `(r, s)` the tool solves every line–line intersection inside the grid extent, then dualizes each crossing into a unit rhombus by summing the region-index steps `V = Σ Kⱼ eⱼ`, with `Kⱼ = round(p·eⱼ + γⱼ)` and the two crossing families pinned to their integer line indices. A generic γ keeps intersections non-degenerate (no triple concurrency), and antiparallel family pairs are skipped, so the result is gap-free and overlap-free. Everything — solver, UI, pan/zoom, animation, export, and URL (de)serialization — is inline in `index.html`.

## License

MIT — see [LICENSE](LICENSE).
