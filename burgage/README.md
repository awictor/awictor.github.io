# Burgage

**Grow a plausible old town from a seed — roads, river, wards, and hand-drawn burgage plots — in clean cartographic ink.**

Burgage is a single-file, zero-dependency procedural town-plan generator. From a text seed it grows a whole believable settlement and draws it in a map-like ink style on an aged-paper background, then lets you export a PNG or a crisp vector SVG.

## Why it's cool

Most procedural city generators stop at roads and blocks and end up looking like generic Voronoi mush. Burgage nails the one detail that makes antique town maps instantly recognizable: the comb of long, thin **burgage plots** peeling off every street frontage — the real medieval property strips that give historic town maps their distinctive texture. Add a wandering river with bridges where roads cross, a defensive wall with named gates, invented place-names, and cartographic furniture (compass rose, scale bar, cartouche), and each seed reads like a place with history. Because the seed lives in the URL hash, any town you like is a shareable permalink.

## Features

- **Seeded and reproducible** — a mulberry32 PRNG means a given seed always regrows the identical town. The seed is written to the URL hash, so the address bar *is* the share link.
- **River with bridges** — a value-noise-perturbed polyline wanders across the canvas with hatched banks; wherever a road crosses it, a bridge is placed automatically.
- **Hybrid road network** — straight primary radials and a high street from the market square, an organic tangle of lanes in the walled core, and a tidier grid in the outer wards (a warped quad-grid).
- **Burgage-plot subdivision** — each built block's frontage is split into long narrow perpendicular strips, each holding a footprint building pushed to the street with a rear yard behind it.
- **Named wards** — Market, Cathedral Close, Docks, Weavers' Row, Artisans' Quarter, The Shambles, and the Common bias plot width, building depth, and density.
- **Wall, towers, and gates** — a noisy defensive wall rings the old town; "port" seeds swap one side for a hatched coastline.
- **Procedural place-names** — assembled from morpheme tables (e.g. *Marlmarket-on-Stour*, *Eldminster*, *Greyfen*), with ward, gate, and river labels.
- **Three era styles** — Medieval ink, Regency engraving, and Modern blueprint restyle the palette, linework, and label fonts.
- **Animated growth reveal** and **PNG / SVG export**.

## Run it

No build step, no server, no dependencies. Open the file in any modern browser:

```
# from the project directory
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or just double-click `index.html`.

## Controls

| Control | What it does |
|---|---|
| **Seed** | Type any text and press Enter to regenerate that exact town. |
| **Reseed** | Generate a new random town. |
| **Copy link** | Copy the current town's shareable permalink to the clipboard. |
| **Era** | Restyle the palette, linework, and label fonts. |
| **Grow** | Replay the animated reveal. |
| **Skip animation** | Appears during a reveal; jumps straight to the finished map. |
| **Export PNG** | Download the map as a PNG image. |
| **Export SVG** | Download the map as a crisp vector SVG. |

### Sharing a town

Every town's seed is stored in the URL hash (e.g. `index.html#greyfen`). Copy the address — or click **Copy link** — and anyone who opens it gets the identical town. Editing the hash (or the Seed field) regenerates on the spot.

## License

MIT — see [LICENSE](LICENSE).
