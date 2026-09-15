# Freshet

**Watch rivers carve themselves into procedural terrain — then hover any point to light up its entire upstream watershed.**

Freshet generates a seeded fractal landscape, computes how water would flow across it, and lets you *interrogate* the result: move your cursor over the map and it floods the complete drainage basin that feeds through that exact spot — the set of cells whose rainfall would pass under your cursor on its way to the sea.

## Why it's cool

Everyone has seen a noise heightmap. Almost no toy lets you ask the water questions. The hover-to-reveal gesture turns an abstract GIS concept — flow accumulation and basin delineation, the math behind real river modeling — into something you feel by dragging a cursor across ridgelines. Lock one basin, hover a neighbor, and the contested drainage divide between them lights up. Every world is deterministic from a seed in the URL, so any landscape you find is a shareable link.

It's a single self-contained HTML file. No build step, no dependencies, no network calls.

## Features

- **Seeded terrain** — 5-octave value-noise fBm heightmap with a light erosion pass that carves valleys. Fully deterministic from the seed.
- **Real hydrology** — Barnes (2014) priority-flood depression filling with an epsilon drainage slope (so every cell drains), D8 flow directions, topologically sorted flow accumulation, and Strahler stream order.
- **Live watershed highlight** — hover (or tap) any cell to flood-fill its entire contributing basin; the panel prints basin area, downstream river length, elevation, and Strahler order.
- **Basin comparison** — click a river to lock its basin, then hover another to reveal the drainage divide between the two (with its length). Basins that share a trunk are correctly flagged as nested sub-basins rather than a false divide.
- **Downstream profile** — a live elevation chart from the cursor down to the sea.
- **Adjustable sea level** — a slider re-floods coastlines in real time, with a live meters readout.
- **Strahler & flow toggles** — recolor rivers by stream order, or turn the animated flow particles on/off.
- **Permalink sharing** — the seed lives in the URL hash; the copy-link button hands you a shareable link (with a manual-copy fallback if the clipboard is blocked).
- **Responsive & crisp** — the map scales down on narrow/mobile viewports and renders at native resolution on HiDPI / display-scaled screens.

## Run it

No install, no build. Open the file in any modern browser:

```
# Option A: just double-click
index.html

# Option B: serve the folder (any static server works)
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## Controls

| Action | What it does |
|---|---|
| **Hover / drag** the map | Flood the upstream watershed draining through that point |
| **Click** a point (tap on touch) | Lock that basin; click again to clear |
| Hover after locking | Reveal the drainage divide between the locked and hovered basins |
| **seed** field | Type any string to generate a specific world (Enter to apply) |
| **sea level** slider | Raise/lower the waterline; coastlines re-flood live |
| **↻ regenerate** | Roll a fresh random seed |
| **Strahler order** | Recolor rivers by stream order |
| **flow ✦** | Toggle animated flow particles |
| **copy link** | Copy a permalink to the current world |

The readout panel shows the basin area, the length of the river below your cursor, the elevation, the Strahler order, and a downstream elevation profile.

## License

MIT — see [LICENSE](LICENSE).
