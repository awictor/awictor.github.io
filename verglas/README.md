# Verglas

**Watch frost grow, one wandering particle at a time.**

Verglas is a zero-dependency, single-file diffusion-limited aggregation (DLA) sandbox that grows crystalline frost, coral, and lightning dendrites in your browser. Random walkers drift across the canvas and freeze the instant they touch the growing structure, accreting into branching, self-similar patterns.

## Why it's cool

DLA is the same physics that etches real frost on a windowpane and forks lightning across the sky — a fractal precipitating out of pure noise. Verglas makes two things visible that most DLA demos throw away:

- **Growth history as color.** Every frozen cell is tinted by the tick it stuck, so the crystal reads as a gradient of radiating rings from seed-core to frontier — you can literally see the order it grew in.
- **Symmetry.** Mirror each stick through an n-fold rotational group and a single walk paints a perfect snowflake.

Every run is deterministic from a seed stored in the URL hash, so any frost you like is a shareable link, and one click exports the canvas to PNG.

## Run it

No build, no dependencies, no server required.

```
# Just open the file
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or double-click `index.html`. It runs from `file://` — no fetch, modules, or external assets. To serve it statically instead:

```
python3 -m http.server 8000    # then visit http://localhost:8000
```

Works in any modern browser (Chrome, Firefox, Safari, Edge).

## Controls

| Control | What it does |
|---|---|
| **Seed geometry** | `Point` — radial coral/dendrite from a center core. `Pane` — hoarfrost climbing a windowpane from the bottom edge (symmetry off). `Click` — blank canvas; click to drop your own nuclei. |
| **Palette** | Four curated ramps: frost, ember, aurora, copper. Recolors the live crystal instantly. |
| **Symmetry arms** | 1–12 rotational copies of every stuck particle (6 = a classic snowflake). Disabled in Pane mode. |
| **Mirror** | Adds a reflected copy per arm for true snowflake symmetry. Disabled in Pane mode. |
| **Stickiness** | Probability a walker freezes on contact (vs. bounces). High = dense/compact, low = wispy fractal ferns. |
| **Growth speed** | Walker steps processed per frame. |
| **Pause / Reset** | Freeze the animation, or restart the current seed. |
| **Randomize** | Roll a new seed and rewrite the shareable URL. |
| **PNG** | Export the current canvas to a PNG file. |
| **seed chip** | Click it to copy the shareable link to your clipboard. |

The aggregate auto-regrows: once a crystal fills the frame it pauses briefly, then reseeds with a fresh random seed (the URL and seed chip update to match, so the link always reproduces what's on screen).

### Science readout

The stats panel shows a live **box-counting fractal dimension (D)**, the **particle count**, and the number of **branch tips**. D tends toward ~1.9 for compact high-stickiness growth and drops toward ~1.6 for wispy, exploratory ferns.

## How it works

- A 224×224 occupancy grid, 3px per cell.
- Walkers spawn on a ring just outside the current aggregate radius and random-walk one cell per step; a kill radius respawns strays so they don't wander the empty plane forever.
- On contact with an occupied neighbor, a stickiness roll decides whether the walker freezes. Frozen cells are replicated through the active rotational (+ optional mirror) symmetry group.
- Only newly frozen cells are drawn each frame (plus a short-lived additive glow on the frontier), so it stays smooth as the structure grows.
- RNG is a seeded `mulberry32`; all parameters are serialized to the URL hash for reproducible, shareable results.

Everything lives in one ~390-line `index.html`.

## License

MIT — see [LICENSE](LICENSE).
