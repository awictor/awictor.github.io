# Octoline

**A procedural transit-map generator that draws Beck-style octolinear subway diagrams for cities that never existed.**

Feed it a seed and it invents a metro system: colored lines routed on a grid, snapped to eight directions (0°/45°/90°, the visual grammar of the London Underground and NYC subway maps), with named stations, terminus caps, auto-detected interchanges, a river with labeled bridges, a legend, and a title cartouche. Reseed for a whole new city. One HTML file, zero dependencies, pure canvas.

## Why it's cool

Everyone can read a subway map, so watching a convincing one materialize from a random seed feels like magic. The interesting part is the routing: lines are grid-snapped biased random walks that heavily favor going straight, then a 45° turn, and rarely a 90° — which is what makes the output read as *designed* rather than noisy. Where lines share a corridor they're drawn as parallel offset strokes instead of stacked on top of each other, and any grid node shared by two or more lines is promoted to a white interchange ring. Every seed is a shareable "city" encoded in the URL hash.

## Features

- **Seeded generation** — a `mulberry32` RNG turns one integer into a full network. Same seed + settings always yields the same city.
- **Octolinear routing** — 4–8 lines as bias-constrained random walks locked to eight directions, with edge bounce so they stay on the map.
- **De-duplicated corridors** — co-running lines are offset perpendicular to their shared segment and drawn parallel, never overlapping.
- **Stations & interchanges** — tick-mark stops along each line, filled terminus caps at the ends, and auto-detected white interchange rings wherever lines meet.
- **Collision-avoiding labels** — station, interchange, and italic bridge names are placed by trying candidate offsets and skipping any that overlap an existing label or leave the canvas.
- **Procedural naming** — invented city name, line names, and station names, plus an "Est. \<year\>" cartouche and a color-swatch legend.
- **Geography** — a wavy procedural river/coastline, labeled bridges detected via line/river segment intersection, and faint concentric fare-zone rings.
- **Four palette themes** — London, New York, Tokyo (light) and Moscow (night, dark background), each colorblind-conscious.
- **Plan a journey** — click two stations and Octoline runs Dijkstra over (node, line) states with a line-change penalty, highlights the route, and reports stops + changes + which lines to ride.
- **Export & share** — download the map as a PNG poster, or copy the URL: the seed and all settings live in the `#hash`, so any link restores the exact city.

## Run it

No build step, no server, no network calls.

```
# clone or download, then:
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or just double-click `index.html`, or drag it into any modern browser tab.

## Controls

| Control | What it does |
|---|---|
| **↻ New City** | Reseed — generates a completely new network. |
| **Theme** | Switch palette (London / New York / Tokyo / Moscow night). |
| **Lines** | Number of transit lines (4–8). |
| **Grid size** | Routing-grid resolution — larger = sprawlier network. |
| **Station density** | How closely stops are spaced along each line. |
| **🧭 Plan a journey** | Toggle journey mode, then click a **start** station and a **destination**. Octoline routes between them and lists the stops, changes, and lines to ride. |
| **⬇ Export PNG poster** | Download the current map as a PNG. |
| **🔗 Copy share link** | Copy the current URL (seed + settings) to the clipboard. |

**Journey mode tips:** the cursor turns to a crosshair while active and to a pointer when you're hovering a valid station (shown by a faint ring). Click anywhere that isn't near a stop and the panel tells you so instead of failing silently. Sliders and the seed live in the URL `#hash` — copy it to share the exact map, or paste one back to reproduce it.

## License

MIT — see [LICENSE](LICENSE).
