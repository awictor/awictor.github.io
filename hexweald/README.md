# Hexweald

Seed a whole Civ-style hex kingdom in one screen — biomes, rivers, towns, roads.

Hexweald is a single, dependency-free HTML file that turns one text seed into a printed-boardgame fantasy realm: a flat-top hex map with quantized biomes, downhill-traced rivers, habitability-scored towns with procedural names, and least-cost roads wiring them together. Same seed, same world — every result is a portable artifact you can share as a URL.

## Why it's cool

- **Deterministic and shareable.** The seed plus every setting is encoded in the URL hash. Copy the address bar, send it, and the recipient opens the exact same realm — down to the last river.
- **A real generation pipeline, not a texture.** Two layers of value noise (elevation + moisture) with a radial island falloff feed biome classification, a distance-to-water BFS, steepest-descent river routing, flood-filled provinces, habitability-scored settlement placement, and A\* road pathing that fords rivers and avoids mountains.
- **Reads like a printed atlas.** Neighbor-gradient hillshading, antialiased coastlines, per-biome texture glyphs, dashed province borders, tapering rivers, capital stars, a compass rose, a biome legend, and a cartouche title with a generated realm name.
- **One file, ~300 lines of vanilla JS.** No build step, no packages. Fork it and reskin it in an afternoon.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. There is no build step, no server, and no dependencies.

If you prefer a local server (optional):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

## Controls

| Control | What it does |
|---|---|
| **⟳ Reseed** | Generates a fresh realm with a new pronounceable seed. |
| **Seed** | Type any text and press Enter to regenerate. The same seed always yields the same map. |
| **Size** | Map dimensions, 0–5 (larger = more hexes). |
| **Sea level** | Percentage of the elevation range that is underwater; drag to drown or raise land. |
| **Theme** | Parchment, Atlas, or Satellite Night palette. |
| **PNG** | Downloads the current map as a raster image. |
| **SVG** | Downloads a vector version (biomes, region tints, coastlines, rivers, roads, towns, and frame). |

**Hover** any hex (or tap on touch devices) for a readout: biome, axial coordinates, elevation, moisture, distance to water, on-road flag, and the nearest settlement with its distance.

**Sharing:** the URL hash updates as you change settings — just copy the address to share the exact realm. Opening a Hexweald URL restores the seed, size, sea level, and theme automatically.

## How it works

1. **Noise fields** — a seeded PRNG drives two contrast-stretched value-noise fields (elevation and moisture) over a flat-top, odd-q hex grid, with a radial falloff that pushes land toward the center into island continents.
2. **Biomes** — elevation and moisture are quantized into 7 biomes: deep ocean, coast, grassland, forest, desert, mountain, snow.
3. **Rivers** — traced by steepest descent from high, wet peaks down to the sea, terminating at water or an existing river, drawn as tapering polylines.
4. **Regions** — landmasses are flood-filled into tinted provinces, each given a capital.
5. **Settlements** — 3–6 towns placed by a habitability score (coastal / river-adjacent lowland grassland wins) with procedurally assembled names.
6. **Roads** — A\* least-cost pathing connects each town to its nearest neighbor, cheap over grass and costly over mountains/water, forded at rivers.

## License

MIT — see [LICENSE](LICENSE).
