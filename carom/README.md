# Carom

**One ball, bouncing forever — watch a billiard table draw its own hidden order and chaos.**

Carom launches a single point-ball inside a mathematical table and lets it ricochet under perfect reflection, forever. Each chord is drawn as an accumulating luminous stroke, so the trajectory slowly paints the table's character: the bright caustic curve inside an ellipse, crisp closed star-polygons on a periodic orbit, and a smooth uniform gray fill once a stadium goes chaotic. Nudge the launch angle by a hair and an orderly rosette dissolves into ergodic mist.

## Why it's cool

Dynamical billiards is a real and beautiful corner of chaos theory (integrability, caustics, KAM, rotation numbers), but almost nobody gets to *play* with it. The same one-line bounce rule produces a razor-sharp caustic in an ellipse, a perfect five-pointed star in a pentagon, and total gray chaos in a stadium — and you flip between them by dragging a dot. Carom makes that tangible with nothing but a reflection rule and a canvas. Zero dependencies, one file.

## Features

- **Four exact table geometries** — circle, ellipse, Bunimovich stadium, and regular n-gon, each with correct analytic reflection off the boundary.
- **Forever-tracing engine** — chords accumulate as additive glowing strokes (hue-cycled by bounce order) on a persistence buffer, revealing caustics, periodic orbits, and ergodic fill.
- **Live orbit classification** — the HUD labels the orbit *periodic / quasiperiodic / ergodic*, shows the `(p, q)` rotation numbers for closed orbits, and reports fractional coverage of the table.
- **Twin-ball chaos mode** — a second ball offset by `1e-5` radians tracks the first, then diverges dramatically in the stadium while staying locked in integrable tables. A direct, visual demo of sensitive dependence on initial conditions.
- **Drag to explore** — grab the white dot to move the launch point, or the arrow tip to aim; the orbit recomputes and repaints instantly.
- **Eight built-in presets** — ellipse caustic, pentagon 5-star, heptagram {7/3}, stadium chaos, circle rosette, whispering ring, square diamond, Fagnano triangle.
- **Shareable orbits** — the full state (shape, params, start point, angle) is encoded in the URL hash, plus a one-click PNG export that composites the dark felt backdrop.

## Run it

No build, no dependencies, no network. Just open the file:

```
# double-click index.html, or:
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Any modern browser works. It loads the "Ellipse caustic" preset by default.

## Controls

| Control | What it does |
|---|---|
| **Table** | Switch geometry: circle / ellipse / stadium / polygon |
| **Sides** | Number of polygon sides (3–9; polygon only) |
| **Eccentricity** | Ellipse shape, 0 = circle up to 0.94 (ellipse only) |
| **Speed** | Bounces computed per animation frame |
| **Persistence** | Trail fade — higher keeps chords longer (`∞` never fades) |
| **Twin ball** | Add a near-identical second ball to visualize divergence |
| **Pause / Play** | Freeze or resume the simulation (or press **Space**) |
| **Clear** | Wipe the accumulated trail and coverage |
| **PNG** | Export the current frame as an image |
| **Presets** | Jump to a hand-tuned orbit; the active one is highlighted |
| **Drag** | White dot = move launch point · arrow tip = aim |

### HUD

- **Orbit** — current classification (tracing / periodic / quasiperiodic / ergodic).
- **Rotation (p, q)** — winding/return numbers of a detected closed orbit.
- **Coverage** — fraction of the table the trajectory has visited (greyed out unless the orbit is chaotic, where ergodic fill is the meaningful quantity).

## Notes on the math

Periodic-orbit detection is tolerance-based: when the ball returns near its start point with a matching direction, the orbit is labeled with heuristic `(p, q)` numbers — they are strongly suggestive, not formally proven. Reflection off the ellipse and stadium arcs uses robust ray–conic intersection with a small epsilon step past each hit point to avoid self-intersection stalls.

## License

MIT — see [LICENSE](LICENSE).
