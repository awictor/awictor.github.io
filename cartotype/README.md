# Cartotype

**Type that reads like terrain.** A single-file, zero-dependency generative typography studio that turns any word into a topographic contour-map poster.

Your text is never drawn directly. It's rasterized into a signed distance field, then re-drawn as flowing iso-contour lines — the elevation lines of a survey map — that trace the letterforms. The word emerges from the landscape.

## Why it's cool

Most "text art" toys just style a font. Cartotype reframes the word as a *landscape*: legible up close, dissolving into elegant cartographic contour lines from afar. Everything runs client-side in one HTML file, exports to clean vector SVG or high-res PNG, and packs its entire state into the URL hash — so any poster you make is a link you can paste anywhere and reopen identically.

## Features

- **Text-to-SDF pipeline** — the phrase is rasterized to an offscreen canvas, converted to a true signed distance field (Felzenszwalb Euclidean distance transform), and traced into nested iso-contours with marching squares, stitched into continuous polylines.
- **Three render modes** from the same field:
  - *Topographic* — nested contour rings.
  - *Streamline* — particles integrated along the field's iso-direction (flow lines).
  - *Relief* — filled elevation bands with hairline overlays.
- **Domain-warp turbulence** — layered value noise (self-contained hash noise, no libraries) warps the field for organic, hand-plotted flow. Amplitude / frequency / octaves / seed are all live.
- **Live typography** — font family & weight, size, letter tracking, and line gap, updating in real time.
- **12 cartographic palettes** plus a custom 3-stop color picker, with paper / ink / tinted backgrounds and optional paper grain, vignette, and contour glow.
- **6 poster aspect ratios** — portrait, A-series, square, social, wide, story.
- **Breathing animation** with play/pause; exports capture the exact current frame.
- **Exports** — high-res PNG (3x), true vector SVG (Douglas–Peucker simplified, with a path-count guard), and an animated WebM loop where supported.
- **Shareable state** — the full deterministic state (seeded `mulberry32` PRNG) serializes to the URL hash. Copy the link, reopen anywhere, get the identical poster.

## Run it

No build step, no dependencies, no network calls.

- **Easiest:** double-click `index.html` (or drag it into a browser window).
- **Optional local server:**
  ```sh
  python -m http.server
  # then open http://localhost:8000/index.html
  ```

Works in any modern browser. The "Share link" button works under `file://` too.

## Controls

**Sidebar**
- **Phrase** — the text (each line becomes its own band of elevation), plus font, size, tracking, and line gap.
- **Contours** — render mode, line count / spacing / weight, jitter, and grid detail (higher = finer contours and more CPU; lower = faster and chunkier).
- **Turbulence** — domain-warp amplitude, frequency, octaves, and seed.
- **Palette & paper** — palette swatches or custom colors, background style, grain, vignette, glow.
- **Format & motion** — aspect ratio, breathing animation, drift speed.
- **Gallery** — one-click curated presets rendered as live thumbnails.

**Top bar**
- **Surprise me** — randomize everything.
- **Play / Pause** — toggle the breathing animation.
- **Reset** — return to the default poster.
- **Share link** — copy a URL that reproduces the current poster exactly.
- **PNG / SVG / WebM** — export.

**Keyboard shortcuts**
- `Space` — play / pause
- `R` — surprise me
- `P` — export PNG
- `S` — export SVG

## How the pipeline works

1. **Rasterize** the phrase to a small offscreen canvas at grid resolution, sized by binary search to fit with a margin.
2. **Signed distance field** — run a Euclidean distance transform inside and outside the letter mask; the signed difference gives distance-to-edge at every grid cell (negative inside, positive outside).
3. **Domain warp** — offset sample coordinates by fractal value noise so contours flow organically.
4. **Extract geometry** — marching squares at evenly spaced levels around the letter edge produces contour polylines (topo/relief), or the field gradient is integrated perpendicularly into streamlines (stream mode).
5. **Draw & export** — render to canvas at any scale for PNG, or emit the same polylines as SVG `<path>` elements.

Rendering is coalesced to one pass per animation frame, so sliders preview live while expensive recomputes stay capped. Grid detail is adjustable to bound CPU cost on long phrases.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Alex Wictor.
