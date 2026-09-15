# Mullion

**Seeded gothic rose-window & stained-glass tracery generator — one HTML file, zero dependencies.**

Mullion procedurally draws gothic rose windows from a real architectural grammar: a central oculus multifoil, concentric rings of cusped lights (trefoil / quatrefoil / cinquefoil / sexfoil), stone tracery bars and radial mullions, jewel-tone glass panes with lead-came outlines, and a diapered grisaille ground inside a circular stone frame. Commit to a symmetry order and ring structure; the seed fills in the foliation and glazing. Sliders reshape everything live.

## Why it's cool

Rose windows are instantly recognizable, but almost nobody has seen one *generated* from actual tracery vocabulary rather than a kaleidoscope filter. A radial-symmetry engine keeps the code tiny while producing dense, cathedral-grade detail, and every glass pane uses an offset radial gradient so it reads as backlit rather than flat-filled. One shared scene builder emits a single path-list that feeds **both** the animated canvas and the SVG exporter, so the crisp vector export is byte-for-byte the window you were looking at. The full state lives in the URL hash, so any window is a shareable link.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. No build step, no server, no network calls.

```
# optional: serve it (any static server works)
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Controls

**Structure**
- **Symmetry** — radial order: 6 / 8 / 12 / 16 / 24-fold
- **Rings** — number of concentric rings of cusped lights (1–5)
- **Cusp depth** — how pointed the foils are
- **Bar weight** — thickness of the stone tracery bars

**Glazing**
- **Palette** — cobalt, ruby, emerald, amber, amethyst, jewel-mix, or grisaille
- **Lead came** — thickness of the lead outlines between panes
- **Saturation** — glass color intensity

**Time of day** — Dawn / Noon / Dusk / Candlelit retints stone, came, ground, glass, background, and the bloom.

**Motion** — pause or play the orbiting "sunlight" sweep. Defaults to off when your OS requests reduced motion.

**Seed** — the window is deterministic from its seed. Type your own or hit the ↻ button to randomize.

**Export**
- **PNG** — 1520×1520 raster, cropped to the circular frame
- **SVG** — crisp vector, identical geometry to the on-screen window
- **Copy shareable link** — full seed + parameter state encoded in the URL hash; opening the link reproduces the exact window

**Archetypes** — four curated presets (Chartres, Notre-Dame, Sainte-Chapelle, Grisaille Cloister) with live thumbnails. Keyboard-accessible.

## How it works

- A seeded `mulberry32` PRNG (from an FNV-1a hash of `seed | order | rings`) drives foil-type and glass-color choices, so the same inputs always yield the same window.
- `buildScene(state)` returns one array of drawing primitives (`rect` / `circle` / `line` / `bloom`). The canvas renderer and the SVG exporter both consume that same array, which is what guarantees export fidelity.
- Malformed or hand-edited hashes degrade gracefully: numeric params are validated, clamped to their slider ranges (or the allowed symmetry orders), and fall back to defaults when non-finite.

## License

MIT — see [LICENSE](LICENSE).
