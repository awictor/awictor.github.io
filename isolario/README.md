# Isolario

**Seed a fantasy island and watch it drawn as a page from a Renaissance book of islands.**

Isolario is a single-file, zero-dependency procedural island generator that renders every landmass as a hand-inked antique sea chart — parchment, stippled coasts, a compass rose, a cartouche title, and sea serpents warning *HIC SVNT DRACONES*. Reseed for a new world, flood or drain it with a slider, and share the exact map with a link.

## Why it's cool

Most procedural terrain generators output a flat game-map look. Isolario commits to an aesthetic instead: the algorithm's raw heightfield comes out looking like a genuine 16th-century engraved *isolario* page — the printed atlases that were literally "books of islands." Each reseed produces a shareable artifact you'd actually want to screenshot. Under the hood it's real worldgen (value-noise fBm, radial masking, downhill hydrology with flow accumulation, NW hill-shading) in one HTML file with no build step and no network calls.

## How it works

1. **Seed → noise.** A hashed seed drives a small PRNG that feeds a shared value-noise fBm used for both elevation and moisture.
2. **Mask.** Elevation is multiplied by a radial falloff so land gathers into a believable continent surrounded by sea, then lightly box-smoothed to tame local minima.
3. **Biomes.** Elevation + moisture map to eight antique-inked biomes: deep ocean, shallows, beach, grassland, forest, highland, mountain rock, snowcap.
4. **Rivers.** Steepest-descent flow plus flow accumulation traces water downhill; channels widen downstream, and unresolved basins are inked as small stippled lakes.
5. **Ink.** NW hill-shading, a stippled coastline, a graticule, a portolan rhumb-line network, ocean marginalia (waves, soundings, a caravel, sea serpents), a multi-point compass rose, an ornamental double-rule border, and a grammar-generated place-name in a titled cartouche with a legend.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. No dependencies, no build, fully offline.

Optionally serve it over HTTP:

```
python3 -m http.server
# then visit http://localhost:8000
```

## Controls

| Action | How |
| --- | --- |
| New world | **Reseed** button, or press `R` |
| Flood / drain | drag the **Sea level** slider (live re-threshold; readout shows % sea + depth word) |
| Change ink | **Palette** select — Sepia Vellum, Nautical Indigo, Verdant Survey |
| Export image | **Export PNG** button, or press `P` |
| Inspect a cell | hover the chart for biome + elevation + island name |
| Share a map | copy the URL — the seed lives in the `#hash`, so the link reproduces the exact island |

## Etymology

An *isolario* ("book of islands") is a Renaissance genre of illustrated atlases devoted entirely to islands, each page pairing a map with a description. This project is a procedural one.

## License

MIT © 2026 Alex Wictor
