# Versal

**Type a letter, get an illuminated manuscript initial.**

Versal is a single-file procedural generator for _versals_ — the big decorated
capital letters that open a chapter in a medieval codex. Type any letter and it
renders as a gilded initial seated in a jeweled panel over a gold-leaf ground,
wreathed in seeded acanthus scrollwork and fine pen-flourish filigree. Every
ornament is derived from a seed carried in the URL hash, so any initial you make
is a reproducible, shareable link.

## Why it's cool

The input is a single glyph anyone can try instantly; the output looks
hand-illuminated and feels bespoke on every reseed. Recursive acanthus vines
with foliate leaves and berry clusters, swirling filigree, and a procedural
diaper (lattice/crosshatch/dotted) ground give real generative depth — all from
one seeded PRNG, in one HTML file, with zero dependencies and zero network
calls.

## Features

- **Any A–Z initial** — type it or pick a letter; it's seated as a large gilded
  versal in a decorated panel.
- **Seeded acanthus scrollwork** — recursive branching vines with leaves and
  berries fill the border and corners, clipped to the panel.
- **Pen-flourish filigree** — spiraling hairline sprays emanate from the panel
  edges, classic manuscript penwork.
- **Gold-leaf diaper ground** — procedural lattice / crosshatch / dotted pattern
  behind the initial, with an animated specular sheen.
- **Four historical palettes** — Gothic (lapis & gold), Insular/Celtic,
  Romanesque (earth), Renaissance (floral).
- **Historiated mode** — fills the initial's center with a clipped medallion
  scene (sun, bird, or knotwork), tinted to the active palette.
- **Paragraph mode** — a drop-cap preview seating the versal beside period-serif
  text with a decorated gold margin bar.
- **Reproducible permalinks** — the full state lives in the URL hash; use
  **Copy Link** to share the exact initial you're looking at.
- **Gilding reveal animation** — vines and filigree draw on, gold fades in.
  Respects `prefers-reduced-motion` and only animates on load / reseed / random,
  so incremental edits snap in instantly.
- **Export** — download the current initial as **SVG** or **PNG**, or a tiled
  **contact sheet** PNG of a word or the full A–Z alphabet.

## Run it

No build, no install, no server required:

```
# just open the file
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or serve it statically if you prefer a local URL:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

Any modern browser works.

## Controls

| Control | What it does |
|---|---|
| **Letter** | The initial to draw (A–Z; other characters are rejected). |
| **Style** | Pick one of the four historical palettes. |
| **Reseed** | Reroll all ornament from a new random seed. |
| **Random Letter** | Pick a random letter and a new seed. |
| **Historiated** | Toggle the central medallion scene. |
| **Paragraph** | Toggle drop-cap preview mode. |
| **SVG / PNG** | Export the current initial (PNG renders at 1200px). |
| **Copy Link** | Copy the current permalink to the clipboard. |
| **Sheet + Contact Sheet** | Render a titled poster PNG of a typed word, or the full alphabet if the field is empty. |

## URL hash format

State is encoded as:

```
#<letter>-<style>-<seed>[-h][-p]
```

- `letter` — the capital (e.g. `Q`)
- `style` — `gothic` \| `celtic` \| `romanesque` \| `renaissance`
- `seed` — integer seed driving the PRNG
- `h` — present when historiated mode is on
- `p` — present when paragraph mode is on

Example: `#Q-celtic-8421-h` reproduces the same initial every time.

## How it works

A `mulberry32` PRNG is seeded from `letter | style | seed`, so identical hashes
always produce identical artwork. All ornament (acanthus recursion, filigree
spirals, diaper pattern, medallion motif) is generated as an SVG string;
PNG/contact-sheet exports rasterize that SVG onto a `<canvas>`. Everything —
layout, controls, generators, palettes, and export — lives inline in
`index.html`.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
