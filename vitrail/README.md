# Vitrail

**Draw one wedge, get a living mandala — a zero-dependency kaleidoscope studio in a single HTML file.**

Vitrail is a one-screen kaleidoscope/mandala sketchpad. You draw freehand inside a single pie-slice "wedge" and Vitrail mirrors and rotates your strokes in real time into a full radial mandala with true dihedral symmetry — like drawing on stained glass held up to a mirror.

## Why it's cool

It stores your **strokes**, not pixels. Because only the wedge-local strokes are kept, fold count and mirror mode stay *live, re-tileable parameters* — slide the fold count from 3 to 24 and the whole design re-blooms instantly. That same compactness means an entire creation (drawing + settings) fits in a URL, so a link reconstructs the exact, still-editable mandala on someone else's screen. No build step, no dependencies, ~350 lines of vanilla canvas.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into Chrome / Firefox / Safari / Edge. That's the whole install: no build, no server, no dependencies.

It opens on a curated mandala. Draw inside the glowing wedge to make your own, or hit **Lucky** for a random one.

## Features

- **Live radial mirror engine** — strokes drawn in one wedge are replayed rotated across N sectors and (optionally) reflected, giving true Cn (rotational) or Dn (reflected) symmetry as you draw.
- **Fold count 3–24** — instantly re-tiles the whole canvas from the stored wedge strokes.
- **Mirror toggle** — switch between rotational-only and reflected (kaleidoscopic) symmetry.
- **Glass mode** — additive glow rendering for a stained-glass look.
- **Brush palette** — color picker, stroke width, and a "rainbow-by-angle" HSL mode for glassy gradients. (When Rainbow is on it overrides the color picker, so the swatch greys out.)
- **Gentle auto-spin** — slowly rotates the composition for a meditative, screensaver feel. Respects `prefers-reduced-motion`.
- **Undo / Clear** — per-stroke undo and full clear.
- **Presets + Lucky** — a small preset gallery plus a seeded random generator.
- **Exports** — high-resolution **PNG**, true-vector **SVG**, and a seamless-loop **WebM** (via `captureStream` + `MediaRecorder`, no libraries).
- **Shareable link** — the drawing and settings are packed into the URL hash; copy the link and send your exact editable mandala.

## Controls

| Control | What it does |
|---|---|
| **Fold** slider | Number of symmetry sectors (3–24) |
| **Mirror** | Reflected Dn symmetry vs. rotational-only Cn |
| **Glass** | Additive glow render mode |
| **Spin** | Gentle auto-rotation |
| Color / **W** | Brush color and width (color is ignored while Rainbow is on) |
| **Rainbow** | Hue-by-angle brush, overriding the color picker |
| **✦ Lucky** | Generate a random mandala |
| **Presets…** | Load a curated design |
| **Undo / Clear** | Remove last stroke / clear canvas |
| **PNG / SVG / WebM** | Export the current mandala |
| **Copy Link** | Copy a shareable URL that rebuilds this exact mandala |

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Z` | Undo |
| `C` | Clear |
| `G` | Random mandala (Lucky) |
| `M` | Toggle mirror |
| `Space` | Toggle spin |

## How the symmetry works

Every pointer position is folded into a single canonical wedge as `(t, r)`: `t` is the angle within one sector normalized to `0–1`, and `r` is the distance from center normalized to the canvas radius. At render time each stored stroke is drawn once per sector (rotated by `k · 2π/fold`) and, when Mirror is on, again reflected — producing exact Cn / Dn symmetry directly from the stored wedge-local points. Changing the fold count or mirror mode just re-runs this tiling over the same stored strokes.

## URL seed format

The hash after `#` is a base64url-packed byte stream:

1. `fold`, then a flags byte (`bit0 = mirror`, `bit1 = glass`), then the stroke count.
2. Per stroke: RGB color (3 bytes), width, rainbow flag, point count, then each point as two bytes — `t` quantized to `0–255` and `r` quantized over the `0–2` range.

Points are simplified and capped (≤250 per stroke) while drawing, so even dense sketches stay within normal URL limits. Loading a hash reconstructs the full editable drawing.

## Notes on exports

- **SVG** is a genuine vector file. Non-rainbow mandalas reuse a single wedge group via `<use>`; rainbow mandalas emit a distinct hue-shifted group per sector so the on-screen per-wedge hue rotation is reproduced faithfully. Both `href` and `xlink:href` are emitted for compatibility with older/non-browser SVG renderers.
- **WebM** records one seamless symmetry step of the auto-spin, so the clip loops cleanly.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Alex Wictor.
