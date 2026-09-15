# Piecework

**A procedural patchwork-quilt-top generator that pieces named traditional blocks into a full, coherent quilt.**

Piecework composes complete quilt tops the way a quilter actually assembles them: it draws real pieced blocks from a parametric grammar, tiles them across a grid with sashing strips, cornerstones, and mitered borders, and colors the whole thing with a seeded, harmonized palette carrying a faint fabric-like speckle so each patch reads as cloth rather than flat fill.

## Why it's cool

Everyone recognizes a quilt, so the results are instantly legible and shareable — but the output is driven by a genuine construction grammar (pieced blocks + sashing + borders), not noise, so it produces things that look hand-designed. Every quilt is fully deterministic from a seed in the URL hash, so any quilt you like is one link away from being reproduced exactly. Zero dependencies, one file, no build step.

## Features

- **Parametric block library** — 10 traditional pieced blocks drawn procedurally in a unit cell: half-square triangle, pinwheel, flying geese, sawtooth star, Ohio star, nine-patch, log cabin, courthouse steps, bear's paw, and Dresden fan, each with random rotation/reflection per placement.
- **Three layout grammars** — *Uniform* (one block repeated with rotation variety), *Sampler* (assorted blocks per cell), and *Medallion* (a central feature block framed by radiating pieced rings).
- **Eight palettes** — four seeded HSL harmonies (analogous, complementary, triadic, scrappy) plus four curated historical collections (Amish Solids, Gee's Bend, 1930s Feedsack, Civil-War Repro).
- **Real quilt-top anatomy** — sashing strips between blocks, contrasting accent cornerstones at every intersection, and two mitered borders. Dark seam outlines and white dashed stitching along every edge, plus a woven thread-grain + speckle texture for fabric realism.
- **Deterministic** — a `mulberry32` PRNG keyed off a URL-hash seed. The same seed always reproduces the exact quilt; **Copy link** shares it.
- **Pattern card** — a generated quilt name plus block list, palette, layout, piece count, finished size (inches), and seed. Exportable as its own printable image.
- **PNG export** — 3× high-resolution export with the seed in the filename.
- **Animated reveal** — a block-by-block diagonal-wave piecing animation on each generation (respects `prefers-reduced-motion`).

## Run it

No server, build step, or dependencies. Open the file in any modern browser:

```
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

Or just double-click `index.html`.

## Controls

| Key | Button | Action |
|-----|--------|--------|
| `Space` | New quilt | Fresh random seed |
| `← → ↑ ↓` | Grid − / Grid + | Resize the grid (3×3 to 8×8) |
| `L` | Layout | Cycle Uniform → Sampler → Medallion |
| `P` | Palette | Cycle the eight palette families |
| `C` | Pattern card | Toggle the pattern-card overlay |
| `S` | Export PNG ×3 | Save a 3× PNG |
| — | Copy link | Copy the shareable URL |
| — | Export card | Save the pattern card as an image |

Clicking the quilt also generates a new one. The seed and all settings live in the URL hash, so any quilt is reproducible — and shareable — by link.

## License

MIT © 2026 Alex Wictor
