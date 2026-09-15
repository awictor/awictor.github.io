# Dapple

**Drop a photo and watch it dissolve into a living cloud of ink dots that flow toward detail — then pull it out as crisp, scalable SVG.**

Dapple is a single-file, zero-dependency canvas tool that turns any image into weighted-Voronoi stipple art. Instead of a one-shot dither, it runs live Lloyd relaxation: thousands of dots are scattered, then migrate each frame so denser clusters settle over the darkest regions. You watch the dots crawl into place and pause the moment it looks right.

## Why it's cool

Most stipple filters are static, one-shot dithers. Dapple shows the actual process — dots relaxing into equilibrium under an image-density field — so the artifact is both a tool and a small, mesmerizing simulation. The single-line **TSP** mode connects every dot into one continuous pen stroke, and **true vector SVG export** makes the output genuinely useful for pen plotters and laser cutters. Everything is client-side; your image never leaves the tab.

## Features

- **Live weighted-Voronoi stipple** via animated Lloyd relaxation — watch dots migrate toward detail, pausable at any point.
- **Rejection-sampled seeding** weighted by darkness, so relaxation converges quickly and cleanly.
- **Four renderers** from the same point set:
  - `Stipple` — fixed-radius dots
  - `Dots` — variable radius (bigger where it's darker)
  - `TSP line` — greedy nearest-neighbor + time-boxed 2-opt into one unbroken path
  - `Halftone` — classic rotated-screen dot grid
- **Ink layers**: Mono, Duotone (two interleaved inks), and full **CMYK** (per-channel densities + screen angles).
- **Live tuning**: dot count, gamma, contrast, dot size, and invert.
- **Inputs**: drag-and-drop, paste (Ctrl+V), file open, webcam (the stipple chases you in real time), and a built-in synthetic sample so it works on first load.
- **Exports**:
  - **PNG** (current frame)
  - **SVG** — circles per ink layer (each in its own `<g>`), or one `<polyline>` for TSP; sized for plotters and laser cutters
  - **WebM** — records the whole convergence
  - **Share link** — all parameters plus a deterministic RNG seed live in the URL hash, so a link reproduces the exact look

## Run it

No build, no server, no dependencies. Just open the file:

```
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Or double-click `index.html`, or drag it into any modern browser tab.

**Webcam note:** some browsers block `getUserMedia` on `file://`. If the camera doesn't start, serve the folder over http instead:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

Everything else (drag-drop, paste, exports, share links) works fine from `file://`.

## Controls

| Control | What it does |
|---|---|
| **Pause / Play** (or `Space`) | Freeze or resume the relaxation |
| **Restart** | Re-seed the current image and re-run convergence |
| **Record** | Capture the convergence to WebM (restarts the sim so the whole run is recorded) |
| **Open image / Webcam / Sample** | Choose a source; drag-drop or paste also work |
| **Freeze frame** | While on webcam, snapshot the current frame and let it settle |
| **Render mode** | Stipple / Dots / TSP line / Halftone |
| **Ink layers** | Mono / Duotone / CMYK (the ink swatches shown adapt to the mode) |
| **Dots / Gamma / Contrast / Dot size / Invert** | Live density and tone controls |
| **Reseed** | New random point layout for the same image |
| **PNG / SVG / Copy share link / Record WebM** | Export options |

## How it works

The image is downsampled to a coarse density grid (darkness → weight). Dots are rejection-sampled so they start dense where the image is dark. Each frame runs one Lloyd step: every grid cell is assigned to its nearest dot (accelerated by a spatial-hash bucket ring-search), and each dot moves to the darkness-weighted centroid of the cells it owns. Repeat and the dots settle into a stipple that traces the image's tones. CMYK splits the dot budget across four channels by ink weight, each with its own halftone screen angle. TSP builds a nearest-neighbor tour and cleans it up with time-boxed 2-opt.

## License

MIT © 2026 Alex Wictor. See [LICENSE](LICENSE).
