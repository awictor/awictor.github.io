# Skein

**A single-file multiscale Truchet weave studio — reseed endless flowing tile patterns and export crisp SVG.**

Skein drops a grid of connective arc tiles (Smith quarter-circles that always meet at their edges), then lets cells recursively subdivide into a quadtree so the same weave flows across several scales at once. Every random layout resolves into unbroken, maze-like ribbons. It's one HTML file: no build, no dependencies, no server.

## Why it's cool

Multiscale Truchet tiling (Carlson, 2018) makes genuinely mesmerizing, poster-worthy patterns, but it's almost always something you *watch*, not something you *edit*. Skein turns it into a playable, exportable studio:

- Every reseed is a new piece; the seed lives in the URL, so any pattern is a shareable permalink.
- The trick that most demos skip — keeping arcs connected where a subdivided cell borders a coarser one — is handled by a 2:1-balanced quadtree with an edge-port contract, so strands stay unbroken across nested scales.
- Canvas (for interaction) and SVG (for export) are generated from **one** shared list of path commands, so the vector file matches the screen exactly. That makes the output actually useful: wallpapers, textures, plotter/laser art, print.

## Run it

Open `index.html` in any modern browser (double-click it, or drag it onto a browser window). That's the whole install. No network access is used.

To serve it instead (optional):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls

| Action | How |
|---|---|
| Rotate a tile | Click it |
| Sweep-rotate many tiles | Drag across the canvas |
| Recolor a tile | Right-click (requires **Two-tone** on) |
| Highlight a tile | Hover |
| Reseed | Press <kbd>Space</kbd>, or click the ⟳ dice |
| Close the gallery | <kbd>Esc</kbd> |

Everything is keyboard-reachable (Tab + Enter/Space), and animations respect `prefers-reduced-motion`.

### Sidebar

- **Grid resolution** — base grid size (3–40).
- **Subdivision chance** — probability a cell splits into a finer quadtree node.
- **Max depth** — how many times cells may recursively subdivide (0–4).
- **Strand weight** — stroke thickness of the ribbons.
- **Tile family** — *Arcs* (guaranteed-connective quarter-circles), *Diagonals*, or *Triangles*.
- **Palette** — 8 curated two-color palettes with a rope "casing" underlay.
- **Two-tone** — over/under weave coloring that reads like woven cord.
- **Seamless** — pins the border ring coarse so opposite edges line up; the pattern tiles.
- **Shimmer** — a slow animation that morphs random tile orientations.
- **No background** — export with a transparent background (preview shows a checkerboard).
- **Seed** — type your own, or reseed randomly.

### Export

- **SVG** — crisp vector, matches the canvas exactly.
- **PNG** — 1×/2× (and 4×, auto-clamped to stay within browser canvas limits).
- **Copy permalink** — copies the current URL; the full parameter set lives in the hash.
- **Open gallery** — 12 curated presets, each a live mini-preview and a one-click permalink.

## How it works (short version)

Each cell exposes **ports** on its edges — one at the midpoint, or two at the quarter-points when a neighbour is one level finer. A 2:1 balance pass guarantees adjacent cells never differ by more than one subdivision level, so those ports always line up. Within a cell, ports are joined by a randomly chosen **non-crossing perfect matching** (the two classic Smith orientations generalize to Catalan-many arrangements for cells with more ports). Seamless mode grades subdivision depth by distance from the border so the outer ring stays coarse and every outer edge is a single midpoint port — which is what lets tiled copies align.

## License

MIT — see [LICENSE](LICENSE).
