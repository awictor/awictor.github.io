# Lapidary

**Cut a seeded gemstone from a facet grammar and watch the light play across it.**

Lapidary is a single-file procedural gem-cutting studio. Pick a cut family, pick (or type) a seed, and it tessellates the correct facet pattern onto a girdle outline, then shades every facet with a fake-3D lighting + refraction model so the stone actually sparkles — table reflections, extinction zones, chromatic dispersion (fire), and seeded inclusions. Drag the stone to move the key light. Export the result as a crisp PNG or a true vector SVG. Every stone lives in the URL, so any gem you make is a shareable link.

## Why it's cool

Gem faceting looks organic but is pure geometry — radial rings and step tessellations — so a compact grammar produces astonishingly jewel-like results. Six cut families each tessellate an authentic facet layout, and they all flow through *one* shading routine: a per-facet normal derived from its position and ring depth, lit by a single movable key light with diffuse, specular, and dark "extinction" zones. Swap cut families or drag the elongation slider and the whole tessellation transforms live. No build step, no dependencies, no network calls — one HTML file, ~325 lines.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder statically:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

That's it. There is nothing to install or build.

## Controls

- **Gem gallery** — one-click presets (diamond, ruby, emerald, sapphire, amethyst, topaz), each mapping a named gem to a cut, color, and seed.
- **Cut family** — round brilliant, emerald (step), rose, marquise, cushion, princess. Each tessellates a different facet grammar.
- **Geometry** — Facets (density), Table %, Culet, Elongate, Roundness. These reshape the actual cut, not just the color. Controls a cut ignores are dimmed and disabled (e.g. Facets is fixed for the emerald step cut; Roundness has no effect on round or marquise).
- **Optics** — Hue, Saturation, Brilliance, Fire (dispersion intensity), Clarity (fewer inclusions = higher).
- **Studio** — Export PNG / Export SVG, Copy share link, an editable **seed** field (type your own and press Enter), and **Roll** for a random seed.
- **Drag the stone** to move the key light and sweep the highlights and extinction zones. When idle, the light drifts on its own so the gem twinkles.

## Sharing & reproducibility

The seed and every parameter are encoded in the URL hash and updated live as you tweak. Copy the link (or use **Copy share link**) and anyone who opens it sees the exact same stone. Malformed or out-of-range values in a hash are clamped or ignored, so a truncated link degrades gracefully to sensible defaults instead of rendering nothing.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
