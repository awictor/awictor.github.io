# Sikku

**Sculpt a grid of arcs and watch a single unbroken thread weave itself into a kolam.**

Sikku is a zero-dependency, single-file kolam pad. Kolam is a South Indian threshold art in which one continuous looping line is drawn weaving around a lattice of dots. Sikku renders it with the classic Truchet-tile method: the board is a grid of diamond cells, each holding one of two quarter-arc pairs. Where arcs meet at cell edges they join smoothly, so the whole grid resolves into a set of closed, interlaced loops that curve around the dots between them.

## Why it's cool

Most generative-art toys are noise you tweak sliders on. Sikku is a real cultural algorithm you can touch. The magic moment is flipping one tile and seeing two separate loops merge into a single unbroken thread — the deep property of sikku kolam (ideally *one* continuous line) becomes a puzzle you can chase by hand. It looks like heirloom art, runs in a single HTML file, and every design you make is a shareable link.

## Features

- **Truchet-tile kolam engine** — a grid of diamond cells, each an NE–SW or NW–SE arc pair, joining into continuous closed loops around a dot (pulli) lattice. The weave is emergent, not hand-drawn.
- **Click-to-flip editing** — tap any cell to toggle its arc orientation and watch the surrounding loops re-thread live.
- **Symmetry lock** — 1 / 2 / 4-fold mirror so a handful of clicks fan out into a balanced mandala.
- **Single-thread challenge** — a live thread counter (via union-find loop detection); each distinct loop is tinted its own hue. Reduce the design to one thread for a perfect kolam.
- **Hint** — trials every possible move under the active symmetry and highlights the flip that merges the most threads. The prediction matches exactly what happens on click.
- **Presets & theming** — a gallery of four rendered thumbnails (Lotus, Festival, Ink Knot, Star), three palettes, and square / diamond framing.
- **Animated draw-in** — the thread traces itself on load and on replay (respects `prefers-reduced-motion`).
- **Shareable links & export** — the full board state packs into the URL hash, plus PNG and SVG export (SVG emits one continuous `<path>` per loop — a genuine single path when the design resolves to one thread).

## Run

No build, no dependencies, no network calls. Either:

- **Double-click `index.html`** to open it in any modern browser, or
- **Serve it statically** (recommended so clipboard "Copy link" works, since `navigator.clipboard` needs a secure context):

  ```sh
  cd sikku
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## Controls

- **Tap a diamond** — flip that cell's arc (and its mirror images under the active symmetry).
- **Randomize / Clear** — fill the board randomly (symmetry-folded) or wipe it.
- **Hint** — highlight the single move that merges the most threads.
- **Replay trace** — re-run the draw-in animation.
- **Sym / Grid / Theme / Frame** — click (or focus and press Enter/Space) to cycle: mirror symmetry (None / Mirror / 4-fold), grid size (6–16), palette, and framing.
- **Copy link** — write the current design's URL to the clipboard (falls back to the address bar in insecure contexts).
- **PNG / SVG** — export the finished kolam.

## Goal

Reduce the design to a **single continuous thread** — the ideal of sikku kolam. The counter reads "Single thread!" and the board glows when you get there.

## License

MIT — see [LICENSE](LICENSE).
