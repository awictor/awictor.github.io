# Cuneia

**Type anything and watch it become a whole writing system.**

Cuneia is a procedural asemic-script foundry in a single HTML file. Whatever you
type is transcribed live into a coherent invented alphabet on a warm vellum
manuscript page. Type your name, a date, a paragraph — it resolves into elegant,
self-consistent calligraphy that looks like a real language you could learn.

## Why it's cool

It feels like magic but is fully deterministic. Each character is hashed into a
glyph built from a tiny stroke grammar (lines, arcs, dots, crossbars on a small
anchor grid), and one global **language seed** governs the whole script's
personality — curviness, cursive joining, baseline drift, ink weight, and glyph
proportion. Same text + same seed always render identically, so a script behaves
like a genuine alphabet rather than random scribble. Shuffle the seed and you get
an entirely different civilization's hand. The Rosetta panel shows the full
a–z / 0–9 / punctuation alphabet for the current script, and the exact
`{text, seed, style}` packs into the URL hash so any language you stumble onto is
one link away for someone else.

## Run it

Zero dependencies, zero build, zero network calls.

- **Double-click `index.html`**, or drag it into any modern browser tab.
- Optional: serve it (`python -m http.server`, then open `http://localhost:8000`)
  if you want the one-click clipboard copy to use the native clipboard API — on a
  `file://` page it falls back to a manual copy prompt.

## Controls

- **Type** in the text box — the page transcribes as you go, animating the newly
  typed tail with a wet-ink stroke reveal. (Honors `prefers-reduced-motion`:
  renders static if you've asked the OS to reduce motion.)
- **Named scripts** — click a preset chip (Tidewater, Basalt, Vellum Court,
  Emberscript, Runemark, Meridian) to switch to a curated writing system.
- **Tune this language** — five sliders reshape the current script:
  - *Curviness* — how much strokes bow into arcs
  - *Cursive* — whether glyphs join into ligatures within a word
  - *Drift* — baseline jitter for a hand-written feel
  - *Ink weight* — stroke thickness
  - *Proportion* — glyph aspect ratio
- **Shuffle civilization** — generate a brand-new coherent script from a random seed.
- **Save PNG** — download the manuscript page plus the Rosetta alphabet and a
  seed caption, composited into one self-identifying image.
- **Copy link** — copies a URL encoding your exact text + seed + style so anyone
  who opens it sees the identical script.
- **Rosetta panel** — the lower page always shows the current script's complete
  alphabet as a labeled key.

## How it works

- **Hash + PRNG** — an FNV-1a string hash seeds a mulberry32 PRNG per character,
  so glyph topology is deterministic and cached.
- **Stroke grammar** — 2–4 strokes (plus an occasional crossbar) drawn between
  points on a 3×4 anchor grid, using straight lines, quadratic-bezier arcs, and dots.
- **Style vector** — the six style parameters are applied at render time, so
  tuning a slider restyles the whole alphabet without changing its identity.
- **Layout** — measured per-glyph advance widths drive word-wrapping and cursive
  baseline connectors; long text auto-scales to stay within the page.

## License

MIT — see [LICENSE](LICENSE).
