# Morphogen

**Paint living chemistry.** A brushable Gray-Scott reaction-diffusion lab that grows spots, stripes, coral, and mazes under your cursor — one self-contained HTML file, zero dependencies.

## Why it's cool

Reaction-diffusion is the math Alan Turing proposed for how animals get their spots and stripes, and the imagery is mesmerizing. But almost every demo online is a fixed shader you just watch. Morphogen makes it a paintbrush: you seed the field with your own strokes and steer the chemistry live with named presets that land on the celebrated corners of Gray-Scott parameter space. A parameter-space minimap shows exactly where in "Turing space" you are, and you can export the result as a crisp PNG or record a timelapse — all in a single ~370-line file with no build step and no network calls.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into Chrome/Firefox/Edge. That's it. No install, no server, no dependencies.

Then **drag on the canvas to paint** chemical B and watch the pattern grow.

## Controls

- **Paint** — drag on the canvas to deposit chemical B into a soft circular brush. **Right-drag erases** back to pure A.
- **Presets** — snap the feed/kill rates to a canonical regime (see cheat-sheet below). Changing the `f`/`k` sliders or hitting Random drops you into a "custom" point.
- **Sliders** — feed rate (f), kill rate (k), diffusion ratio, speed (sim sub-steps per frame), and brush radius.
- **Parameter space (f,k)** — minimap plotting the preset dots (grey) and your current point (cyan cursor).
- **Palette** — Magma, Ice, Coral, Mono, or Spectrum gradient mapping of the concentration field.
- **Symmetry** — 1x / 2x / 4x / 6x / 8x radial-mirror folding for kaleidoscopic mandalas.
- **Seed** — splat random noise blobs. **Clear** — reset to A=1, B=0. **Play/Pause**. **Random** — randomize f/k.
- **Export PNG @2x** — save the current frame upscaled 2x (nearest-neighbor, so the fine Turing detail stays crisp).
- **Rec timelapse** — record a WebM via `MediaRecorder` (falls back to a PNG if the browser can't capture the canvas).
- **Copy shareable link** — encodes f, k, diffusion, speed, palette, brush, and symmetry into the URL hash so you can share or bookmark a setup.

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `[` / `]` | shrink / grow brush |
| `,` / `.` | cycle presets |
| `space` | play / pause |

(Shortcuts are ignored while a slider, button, or menu has focus, so you can still Tab and activate controls normally.)

## Preset cheat-sheet

| Preset | f | k | Grows |
|--------|------|------|-------|
| Mitosis | 0.0367 | 0.0649 | cells that split and divide |
| Coral | 0.0545 | 0.0620 | branching coral / lichen |
| Worms | 0.0780 | 0.0610 | wandering fingerprint worms |
| Maze | 0.0290 | 0.0570 | self-organizing labyrinth walls |
| Spots | 0.0300 | 0.0620 | stable spots & solitons |
| Waves | 0.0140 | 0.0450 | travelling excitable waves |
| U-Skate | 0.0620 | 0.0609 | gliders drifting across the field |

## How it works

Morphogen integrates the [Gray-Scott](https://www.karlsims.com/rd.html) reaction-diffusion equations on a 200×200 grid using a Float32 double buffer and a toroidal (wrap-around) 5-point Laplacian, running several sub-steps per animation frame. Concentrations are clamped to [0, 1] each step for numerical stability. Your brush strokes deposit chemical B directly into the field; the pattern is whatever the chemistry does with those seeds. Each frame the B field is Sobel-shaded for a subtle embossed relief, mapped through the selected gradient LUT, optionally folded through a precomputed symmetry map, and written straight into a reused `ImageData` buffer.

Note on export: PNG @2x renders the LUT at native grid resolution and upscales — "high-res" here means texture-crisp (nearest-neighbor), not resampled to a higher intrinsic resolution.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
