# Ocellate

**Grow circles until they kiss — pack a canvas, a shape, or a word.**

Ocellate is a single-file, zero-dependency generative-art toy. Instead of the usual recursive circle packing, it packs a scene by **growth**: seed points are scattered on a jittered grid, then every disc expands radially, one frame at a time, until it kisses a neighbor, touches the mask boundary, or hits its max radius. Watching it fill in is half the point.

## Why it's cool

- **Growth, not recursion.** The pack is animated and deterministic — same seed + params give a pixel-identical result, every time (mulberry32 PRNG).
- **Type a word.** Text is rendered to an offscreen canvas and its alpha mask constrains growth, so `HELLO` becomes a bubbly, letter-shaped mosaic. Or drop any image and its silhouette (transparency) or dark shapes (luminance) become the boundary.
- **True vector export.** SVG output is real `<circle>` elements, not a rasterized image — drop it straight into a logo or poster. There's also an animated SVG export that replays the growth via SMIL.
- **One-link presets.** Every knob, plus the seed and typed text, is serialized into the URL hash. Any pack you like is one shareable link away.

Runs entirely in the browser. No build step, no server, no dependencies.

## Run it

Open `index.html` in any modern browser. That's it.

```
# or, if you prefer a local server:
python3 -m http.server 8000   # then visit http://localhost:8000/index.html
```

To load a shared preset, append the hash, e.g.:

```
index.html#6hx.fa.3.1g.e.1j.5.0.0~HELLO
```

## Controls

**Panel**
- **Shape** — Canvas, Type a word, Heart, Hexagon, Ring, Blob. Choosing "Type a word" reveals the text field.
- **Density / Min r / Max r** — how tightly seeds are packed and the circle size range.
- **Speed / Jitter** — growth rate per frame and how much seeds are randomly offset from the grid.
- **Palette** — Viridis, Warm, Mono, Duotone, Rainbow, or From image (samples dominant colors from a dropped image).
- **Color by** — map color to circle Radius, Angle, Index, or Neighbor count.
- **Seed** — the deterministic seed; same seed + params = identical pack.
- **Reseed / Tighten / Pause / PNG / SVG / Anim SVG / Copy share link** — Tighten runs a few Lloyd-style relaxation passes to close gaps, then re-grows.

**Keyboard**
- `Space` pause/resume · `R` reseed · `T` tighten
- `S` save PNG · `V` save SVG · `C` copy share link · `H` hide UI

**Canvas**
- Click to seed a new disc; drag to sweep-seed a stroke of them.
- Drop an image anywhere to use its shape as the mask.

Respects `prefers-reduced-motion`: when set, packs fast-forward to their settled state instead of animating. Dark/light theme follows your OS.

## License

MIT — see [LICENSE](LICENSE).
