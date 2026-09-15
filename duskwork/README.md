# Duskwork

Procedurally generate a glowing night-city skyline, reflected in still water — from a seed, in a single HTML file.

## Why it's cool

Every scene is a fully deterministic city: parallax bands of silhouetted towers with randomized rooftops, thousands of individually lit windows, neon sign blooms, a graded dusk sky with a phased moon and thinning starfield, and a rippled harbor reflection. One reseed click yields a wholly new, plausible metropolis. The reflection + neon-bloom + haze-fade stack looks far heavier than the ~320 lines of vanilla canvas it actually is. Zero dependencies, zero build, no network — open the file and it runs.

## Features

- **Layered parallax skyline** — 3–5 depth bands with atmospheric haze fade; distant towers dim and desaturate toward the sky.
- **Tower architecture grammar** — seed-driven widths/heights plus rooftop features: water tanks, antenna masts, spires, stepped setbacks, billboard frames.
- **Window lighting field** — every tower gets a grid of windows lit by a tunable ratio, with warm-glow color jitter and rare colored "bloom" hot windows.
- **Neon sign blooms** — soft additive radial glow on select rooftops, tinting nearby sky and water.
- **Dusk sky system** — one continuous *time & weather* slider interpolates dusk → midnight → fog/rain across curated palettes, jointly driving haze, star count, moon brightness, lit-window ratio, and reflection clarity. Includes a phased moon with soft halo.
- **Rippled water reflection** — the skyline mirrored below the waterline with sinusoidal wobble, banding, and a harbor tint wash.
- **Living-city animation** (off by default) — deterministic window twinkle, water shimmer, drifting neon-tinted clouds, and a blinking aircraft beacon. Exports always render a crisp static frame.
- **Depth extras** — strong-parallax foreground crane/bridge silhouettes, and rare hero features (searchlight beam, radio-tower strobe) that fire only on some seeds.
- **Curated gallery** — eight preset seeds as live thumbnails that track your current settings; the active seed is highlighted.
- **High-res export** — 2× PNG and 3× "postcard" with an optional burned seed/caption bar.
- **Shareable** — seed and all settings serialize to the URL hash. Copy the address bar to share an exact city.

## Run it

No install, no build step. Either:

- Double-click `index.html`, or drag it into any modern browser tab, or
- Serve the folder and open it:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls

| Control | Does |
| --- | --- |
| **Seed** | Type any text; the whole scene derives from it. `↻` / **R** reseeds randomly. |
| **Time & weather** | Dusk → twilight → midnight → haze → fog/rain (drives palette, haze, stars, moon, reflection). |
| **City density** | Number of towers per layer. |
| **Depth layers** | 3–5 parallax bands. |
| **Max tower height** | Tallest-tower ceiling. |
| **Lit-window ratio** | Fraction of windows glowing. |
| **Moon phase** | New → waxing → full → waning. |
| **Living-city animation** | Toggle twinkle / shimmer / drifting clouds / beacon. |
| **Export PNG** | Save a 2× still. |
| **Postcard 3×** | Save a 3× still, optionally with a burned caption bar. |
| **Curated gallery** | Click a thumbnail to load that seed. |

**Keyboard:** `R` reseed · `←` / `→` density · `↑` / `↓` max height.

## License

MIT — see [LICENSE](LICENSE).
