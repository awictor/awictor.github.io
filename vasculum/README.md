# Vasculum

**A slime-mold that draws itself — tens of thousands of agents grow living vein networks on your screen.**

Vasculum is a self-contained [Physarum polycephalum](https://en.wikipedia.org/wiki/Physarum_polycephalum) (slime-mold) simulation in a single HTML file. No build step, no dependencies, no network calls. Open it and watch vascular networks, lace, dunes, and spirals emerge and reorganize in real time.

## Why it's cool

Most Physarum sims are WebGL or compute-shader builds that are hard to read or hack. Vasculum gets the same mesmerizing emergent vein networks from plain Canvas2D and typed arrays, in one readable file — so it's both a toy you leave running in a background tab *and* a legible reference implementation you can fork and learn from.

Every agent follows the same three-line rule — **sense, rotate, deposit**:

1. **Sense** the trail (pheromone) field at three points ahead: left, center, right.
2. **Rotate** toward whichever sensor smells strongest, then step forward.
3. **Deposit** a bit of trail where it lands.

Between frames the field is blurred (diffusion) and faded (decay). No network is ever coded — the branching structure is grown entirely by that feedback loop. Two knobs, diffusion and decay, flip the whole colony between fine lace, thick veins, and rolling dune fields.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

That's it. It runs entirely client-side.

## Controls

| Action | How |
|---|---|
| Feed the colony | Click-drag on the canvas — drops a food attractant it grows toward |
| Repel | Shift-drag |
| Hide / show the panel | Tap the **≡** button (top-right) or press **H** |
| Copy a shareable link | **Copy link** — encodes all params + seed in the URL hash |
| Save the current frame | **Export PNG** |
| Reseed the colony | **Reseed** — new random spawn, same params |
| Screensaver | **Ambient** — drifts params and auto-cycles presets |

### Panel

- **Presets** — Veinwork, Lacework, Dunes, Vortex, Cobweb. Each snaps all parameters to a distinct morphology; switching animates a smooth ~1.2s morph between them.
- **Palette** — Amber, Cyan·Mag, Mono Ink, Spectral. Trail intensity is mapped through a 256-entry gradient LUT.
- **Behaviour** — sensor angle, sensor distance, turn speed, step size. How each agent steers.
- **Field** — deposit, decay, diffusion, glow, population. How the trail field lives and how many agents run.

## Reproducibility & sharing

A deterministic [mulberry32](https://github.com/bryc/code/blob/master/jshash/PRNGs.md) seed drives every agent's spawn position and heading, so a given seed reproduces the exact same morphology. The full parameter set, palette, and seed round-trip through the URL hash — so any frame you like is a shareable link, and **Export PNG** saves the pixels.

## Performance

The trail field is a flat `Float32Array`; diffusion is a cheap 3×3 box blur; each frame does a single `ImageData` write. An FPS governor watches a moving average of frame time and auto-scales the active agent pool (roughly 3k–60k) to hold ~60fps, so it adapts to the device it's running on. Field resolution is capped and scaled to keep large displays smooth.

## License

MIT — see [LICENSE](LICENSE).
