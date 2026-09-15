# Eigenweave

**Watch order ripple out of chaos — a Wave Function Collapse tile weaver you can step through, cell by cell.**

Most Wave Function Collapse demos show you the finished mosaic. Eigenweave shows you the *algorithm*: every cell starts as a superposition of all possible tiles, and you watch the solver repeatedly pick the lowest-entropy cell, collapse it to one tile, and propagate the adjacency constraints outward as a visible wavefront. Hit a dead end and it backtracks in front of you, flashing and rewinding instead of silently failing.

It's one HTML file. No build, no dependencies, no network. Every tile is drawn procedurally on a canvas, every run is deterministic from a seed, and the entire composition (tileset, grid size, seed, wrap, and any constraints you painted) lives in the URL hash — so any weave you make is one paste away from being reproduced.

## Why it's cool

- **The algorithm is the spectacle.** Uncollapsed cells render as ghosted stacks of their still-possible tiles over an entropy heatmap, so you literally see certainty crystallize. The propagation wave, contradictions, and backtracks are all color-coded ripples on the grid.
- **You can steer it.** Pin or forbid a tile in any cell; constraints propagate live and travel in the share link, so a URL can be a deliberate composition, not just a random seed.
- **It narrates itself.** A synchronized log records every observe / collapse / propagation-depth / contradiction / backtrack event — each entry clickable to highlight the exact region it touched, each tile shown as an inline swatch.
- **It's reproducible.** Same seed → same weave, every time. Determinism is the whole point of the shareable hash.

## Run it

Open `index.html` in any modern browser. That's it.

```
# from the project directory
open index.html            # macOS
xdg-open index.html        # Linux
start index.html           # Windows

# or just double-click the file
```

Chrome or Edge are recommended if you want to use **Record process** (WebM capture of the live solve); the clipboard "Copy share link" button also has a fallback for `file://` origins.

## Controls

**Transport**

| Key | Action |
|-----|--------|
| `Space` | Run / pause |
| `S` | Single step (one observe + propagate cycle) |
| `R` | Reset and re-solve |

The **Speed** slider ranges from sub-frame (watch one cell at a time) to hundreds of steps per frame (the render auto-simplifies at high speed to stay smooth).

**Weave (left panel)**

- **Tileset** — Circuit board, Pipes, Truchet knots, Terrain coastlines, Zellij, or your own Custom set.
- **Grid W × H** — 4–48 per side.
- **Seed** — any text or number; the same seed always produces the same weave.
- **Toroidal wrap** — edges connect, producing seamless / tileable patterns.

**View**

- **Entropy heatmap** — color each uncollapsed cell by how much uncertainty remains.
- **Ghost superpositions** — overlay the still-possible tiles inside each cell.
- **Propagation ripples** — animate the wavefront (auto-off when your OS requests reduced motion).
- **Cell grid lines**.

**Paint constraints**

1. Set **Mode** to *Pin tile* or *Forbid tile*.
2. Pick a tile from the palette that appears under the grid.
3. Click (or drag) on cells to pin/forbid. Constraints propagate immediately and are encoded into the URL. Pinned/forbidden cells are honored even across the solver's internal restarts.

**Export**

- **PNG** — the finished weave, upscaled.
- **Record process** — a WebM clip of the animated solve.
- **Copy share link** — the current URL, which fully encodes the weave.

## Tileset editor

Click **Tileset editor** to paint your own small pixel tiles (3×3 – 6×6) with an editable palette. Adjacency is derived automatically: two tiles may sit side by side only when the pixels along their shared edge match exactly. Optionally auto-generate the four rotations of each tile. The whole custom set is base64-encoded into the share link, so custom weaves are shareable too.

Tip: keep large flat areas the same color and put detail near the edges so tiles connect. A blank tile plus a few connectors goes a long way.

## How the visualizer maps to WFC

- **Observe** — the solver selects the uncollapsed cell with the lowest Shannon entropy (weighted by tile frequency) and collapses it to a single tile, chosen by weighted random draw from a seeded PRNG.
- **Propagate** — an arc-consistency propagator (support counting, mxgmn-style) removes now-impossible tiles from neighbors, cascading outward until stable. The set of cells it touched is the "propagation depth" shown in the stats and log.
- **Contradiction / backtrack** — if a cell runs out of options, the solver rewinds to the last decision and tries a different tile. If it exhausts the local search it performs a bounded deterministic restart (re-applying your painted constraints) before giving up.

The stats readout tracks cells collapsed, observations, backtracks, restarts, last propagation depth, and total remaining superpositions.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
