# Spandrel

An infinite-foam Apollonian gasket lab — recursive circle packing that fills every curved gap it finds, using exact Descartes-circle math.

## Why it's cool

An [Apollonian gasket](https://en.wikipedia.org/wiki/Apollonian_gasket) is what you get when you keep inscribing the one circle that fits snugly into each curved triangular gap between three mutually tangent circles — forever. Most casual attempts fake the placement; Spandrel does the real math. It uses the **Descartes Circle Theorem** for the curvature of each new circle

```
k4 = k1 + k2 + k3 ± 2·√(k1·k2 + k2·k3 + k3·k1)
```

and its **complex form** for the exact center, so every tangency is correct at every scale. Grab a seed circle and drag it, and the entire packing re-derives itself live. When the seed curvatures happen to be integers (the default `r1 = 0.5` gives the classic `-1, 2, 2, 3` gasket), the whole gasket stays integer-valued and each circle is labelled with its curvature.

Zero dependencies, no build step, no network — one self-contained HTML file.

## Run it

Open `index.html` in any modern browser. That's it.

```
# macOS
open index.html
# Linux
xdg-open index.html
# Windows
start index.html
```

Or just double-click the file.

## Controls

| Input | Action |
|-------|--------|
| **drag a seed circle's edge** | pull it to re-solve the whole gasket (near baseline zoom) |
| **scroll / pinch** | zoom into a gap — deeper foam is derived on demand |
| **drag background** | pan |
| `p` | cycle palette (Ember, Ice, Neon, Verdant, Mono, Sunset) |
| `c` | coloring mode (by generation / by log-curvature / mono ink / duotone) |
| `w` | wireframe vs filled |
| `l` | integer-curvature labels (when the gasket is integral) |
| `+` / `-` | max recursion depth |
| `space` | replay the generational bloom |
| `s` | export PNG (at device resolution) |
| `v` | export SVG (vector) |
| `b` | record the bloom as a numbered PNG frame sequence |
| `0` | reset view and seed |
| `h` | show / hide the controls panel |

The cursor turns into a resize arrow when hovering a draggable seed edge. On touch devices, pan with one finger and pinch to zoom.

## Shareable permalinks

Every meaningful bit of state — seed radius, palette, coloring mode, depth, wireframe/label toggles, and the current zoom/pan — is encoded into the URL hash and updated live. Copy the address bar (or use the **copy link** button in the HUD) and anyone opening that link sees the exact same bloom. A malformed link falls back to defaults rather than breaking.

Hash format:

```
#s=<seed r1>&p=<palette>&c=<coloring>&d=<maxDepth>&w=<0|1>&l=<0|1>&z=<scale>&x=<panX>&y=<panY>
```

## How it works

- **Seed**: a unit boundary circle (curvature `-1`) plus two collinear inner circles with `r1 + r2 = 1` (guaranteeing tangency), and an analytically placed inscribed third circle.
- **Recursion**: each curvilinear gap is filled by reflecting one circle of a tangent quadruple through the other three (`k' = 2(ka + kb + kc) − kd`, and the same relation on `k·z` for the center), always choosing the inscribed root.
- **Lazy depth**: zooming in unlocks deeper generations, and off-screen branches are culled so only the visible foam is computed. A minimum-radius/curvature cutoff and finiteness guards keep floating-point drift from producing degenerate circles.
- **Bloom**: circles ease in generation by generation so you watch the packing fill itself in.

## License

MIT — see [LICENSE](LICENSE).
