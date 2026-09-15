# Heddle

**Weave a clan out of a seed — procedural Scottish tartans with real twill-blended threads.**

Heddle turns a number into a plausible Scottish tartan. From a seed it builds a
mirror-symmetric *sett* (the thread-count blueprint every real tartan is defined
by), then renders it as an actual **2/2 twill weave** on a canvas — not flat
stripes. At each crossing the visible color is a blend of the warp thread over
the weft thread, which is the detail naive plaid generators miss: a red warp
over a green weft reads as muddy olive, exactly like woven cloth. The result
gets an invented clan name and formal sett notation, and the whole state lives
in the URL hash, so a link always reproduces the same tartan.

## Why it's cool

Tartans look decorative but are secretly a strict little algorithm: a pivoted,
mirrored thread-count sequence rendered through a twill interlacement. Heddle
exposes that grammar and nails the one rule that makes plaid look *woven* rather
than printed — per-crossing color blending in the weave. Deterministic seeds
plus shareable URLs make it a "find your tartan" toy you can link to someone.

## Features

- **Seeded sett synthesis** — a small PRNG builds a palette and a mirror-symmetric
  thread-count sequence, so every seed is distinct but structurally valid.
- **Real twill weave** — warp and weft are interleaved on canvas; the color at
  each crossing is a 72/28 blend of the two threads (blended per thread-band and
  memoized, never per-pixel, so it stays fast and crisp).
- **Four traditions** — Ancient (muted vegetable-dye), Modern (saturated),
  Hunting (greens/browns), Dress (light ground); each constrains color logic.
- **Weave structures** — 2/2 twill, 2/1 twill, plain, and herringbone.
- **Lock and reshuffle** — separate palette and sett seeds, so you can reshuffle
  the colors without changing the pattern (or vice versa), plus an aged/weathered
  fade filter.
- **Auto-named + notated** — each tartan gets an invented clan name and its formal
  sett notation (e.g. `K40 G32 K16 R12 ...`), copyable in one click.
- **Crisp on HiDPI** — the canvas renders at the display's device-pixel ratio, so
  the sheen and blends stay sharp on Retina/2x screens.
- **Export** — copy the sett notation or a CSS `repeating-linear-gradient`
  snippet, download a seamless-tileable PNG (phase-aligned so every weave tiles
  without a seam) or an SVG `<pattern>`, and copy a share link.

## Run it

No build, no dependencies, no network calls. Just open the file:

```
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

Or drag `index.html` into any modern browser tab. Share the URL — including its
`#hash` — to reproduce the exact same tartan on someone else's screen.

## Controls

| Control | What it does |
| --- | --- |
| **Tradition** | Palette family: Ancient / Modern / Hunting / Dress. |
| **Weave structure** | 2/2 twill, 2/1 twill, plain, or herringbone. |
| **Thread scale** | Size of each thread band in pixels (4–12); live value shown. |
| **Aged / weathered fade** | Applies a faded vegetable-dye filter. |
| **Randomize tartan** | New palette *and* new pattern. |
| **Reshuffle threads** | New sett (pattern), same palette. |
| **Reshuffle colors** | New palette, same pattern structure. |
| **Copy sett / Copy CSS** | Copy the notation string or a CSS gradient snippet. |
| **Download PNG / SVG** | Save a seamless-tileable image of the cloth. |
| **Copy share link** | Copy the current URL (state is encoded in the hash). |

All state (tradition, weave, scale, aged, both seeds) is encoded in the URL hash,
so bookmarking or sharing the link is enough to save a tartan.

## License

MIT — see [LICENSE](LICENSE).
