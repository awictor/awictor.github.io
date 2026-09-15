# Ichor

**A living pheromone-trail slime mold in one HTML file.**

Ichor is a zero-dependency, single-file [*Physarum polycephalum*](https://en.wikipedia.org/wiki/Physarum_polycephalum) simulator. Thousands of agents crawl across a pheromone field, each smelling three points ahead, steering toward the strongest scent, and dripping a fresh trail behind them. The field diffuses and decays every frame, so nothing is ever drawn directly — the eerie branching transport networks you see *emerge* purely from the feedback loop between deposit and follow.

You steer the colony by painting glowing food (and repellent walls) with the mouse and watch the veins reroute in real time to connect them by the cheapest path.

## Why it's cool

- The network is a pure **side effect of a scalar field**, not agents drawing lines. There is no path-planning code anywhere — the same emergence real slime molds use to [reconstruct the Tokyo rail map](https://en.wikipedia.org/wiki/Physarum_polycephalum#Biological_computing).
- **You can feel yourself steering an organism.** Paint food and the veins physically grow toward it; paint a wall and they route around it.
- Every configuration + the RNG seed lives in the **URL hash**, so any mesmerizing state you stumble onto is a shareable, reproducible link.
- No WebGL, no build step, no toolchain. One `.html` file you can open by double-clicking.

## Run it

```
Double-click index.html — or open it in any modern browser.
```

That's it. Zero dependencies, zero build, zero network calls. Everything (agent loop, pheromone grid, rendering, UI, export) is inline in `index.html`.

## How it works

Each frame runs the classic Jones (2010) diffusion-limited transport loop:

1. **Sense** — every agent samples 3 sensors (left / center / right) at an adjustable angle and distance ahead, reading the pheromone field of its own species (and subtracting rivals').
2. **Rotate** — it turns toward whichever sensor smells strongest (by the turn-angle step).
3. **Move & deposit** — it steps forward and drips chemoattractant into a `Float32` grid.
4. **Diffuse & decay** — the whole field gets a cheap separable 3×3 blur and is multiplied by the decay factor, so trails spread slightly and fade.

Repeat, and transport networks self-organize and prune themselves. Agents live in flat typed arrays; the grid runs at a fixed internal resolution decoupled from display size; the frame is rendered through a single reused `ImageData` buffer with an additive bloom pass.

## Controls

**Paint** — drag on the canvas. A brush ring previews the stamp and is tinted to the active tool.
- **food** — a constant attractant that pulls veins in (per-species when >1 colony)
- **wall** — repellent the agents avoid
- **erase** — clear field, food, and walls

**Behaviour sliders** (all live):

| Slider | What it does |
|---|---|
| sensor angle | spread of the 3 sensors — tighter = filaments, wider = sheets |
| sensor dist | how far ahead agents look |
| turn angle | how sharply they steer per step |
| deposit | trail strength dripped each step |
| decay | how fast trails fade (higher = more persistent) |
| agents | population size (up to 40,000) |

**Colony** — 1–3 species (each attracted to its own trail, repelled by rivals) and 4 palettes: bioluminescent, ember, ink, spore.

**Specimens** — 8 curated presets (filaments, oozing sheet, hex lattice, nervous web, territories, symbiosis, veins, and a two-food *tokyo rail* demo). The active preset stays highlighted until you nudge a slider, shuffle, or change species.

**Actions** — pause, reset, shuffle (randomize everything), **png** (full-resolution frame export), **rec** (WebM motion capture — an on-canvas `● REC` indicator shows while recording), hide/show panel.

**Keyboard**

| Key | Action |
|---|---|
| `space` | pause / play |
| `r` | reset |
| `s` | shuffle |
| `h` | hide / show panel |
| `1` `2` `3` | select paint tool (food / wall / erase) |

## Sharing & export

- **Shareable links** — the full parameter set and RNG seed are serialized into the URL hash on every change. Copy the URL to reproduce a state exactly. (Tampered or truncated links are validated and clamped on load, so a bad link can't kill the sim.)
- **PNG** — saves the current frame at full internal resolution to your Downloads folder.
- **WebM** — records a loop via `MediaRecorder` (falls back gracefully where unsupported).

## Credit

Based on Jeff Jones' diffusion-limited transport model of *Physarum polycephalum* (2010).

## License

MIT © Alex Wictor
