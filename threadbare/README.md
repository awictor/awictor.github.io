# Threadbare

**Turn any photo into nail-and-thread art you can actually build.**

Threadbare reverse-engineers a photograph into computational string art: the portrait
that emerges when a single continuous thread is wound between hundreds of nails
pinned around a loom. Drop in an image, watch a greedy solver weave the picture
line by line, then export it — as a PNG/SVG, or as the numbered nail-by-nail
sequence you follow to string the same piece with real nails and thread.

One file. No build step. No dependencies. No network calls — your photo never
leaves your device.

## Why it's cool

String art sits at the intersection of algorithm and craft. The solver is a
satisfying greedy-optimization problem: precompute every possible chord's pixel
path, then repeatedly pick the line that best darkens where the image is dark,
subtracting it from a residual buffer. The output is genuinely striking —
recognizable faces built from nothing but straight lines — and the "export
instructions to build it for real" mode turns a browser toy into a bridge to the
physical maker world.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder
statically:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

On first load it auto-solves a built-in sample portrait, so there's something to
look at immediately.

## The algorithm

1. **Preprocess** — the source is cover-cropped to a square working buffer
   (320px), converted to a darkness map with contrast / gamma / edge-boost /
   invert applied. Pixels outside a circular loom are ignored.
2. **Place nails** — `N` nails are spaced evenly around a circular or
   rectangular loom.
3. **Precompute chords** — every nail-to-nail line's pixel indices are rasterized
   once (Bresenham) and cached per geometry.
4. **Greedy weave** — starting from a seed nail, each step scores every legal
   next chord by the mean residual darkness along it, picks the best, subtracts
   the thread's weight from those pixels, and moves to that nail. A minimum gap
   and edge-reuse guard keep it from degenerate short hops, and a stall guard
   terminates cleanly if no candidate remains.

The solve is chunked with `setTimeout` yields behind a progress bar so the UI
stays responsive.

## Controls

**Image source** — drag-drop, paste, or click to load any photo (stays local),
or pick one of six built-in procedural samples.

**Preset looks** — five one-click starting points (Classic Portrait, Fine Detail,
Bold & Fast, Rect Frame, CMY Color).

**Loom & thread**
- *Loom shape* — circular or rectangular
- *Loom diameter* — real-world size, drives the thread-length and build-time readouts
- *Nails* — count around the loom
- *Total lines* — how many chords to draw
- *Thread opacity* — per-line darkness on screen
- *Thread darkness (solver)* — how aggressively each line subtracts from the residual
- *Palette* — single thread, or experimental CMY three-pass color

**Preprocess** — contrast, gamma (brightness), edge boost, invert tones.

**Timeline** — play/pause the weave animation or scrub to any line count. Live
readouts show lines drawn, nail count, thread length (meters) and estimated
hand-build time.

## Build it for real

- **Build sequence** tab — a paginated, tickable list of steps: start at the
  listed nail, then wrap around each numbered nail in order. Printable.
- **Nail template** tab — a printable SVG of your loom at real millimeter size,
  with every nail as a numbered dot. Print it, mount it on your board, and hammer
  a nail through each dot.
- **Sequence CSV** — the full `thread, step, from_nail, to_nail` path for
  scripting or a spreadsheet.

## Sharing

Every parameter — sample, nails, lines, opacity, weight, contrast, gamma, edge,
invert, loom shape, palette, seed, diameter — is encoded in the URL hash, so any
result is a reproducible, shareable link. Photos you load yourself stay on your
device and are not encoded in the link.

## License

MIT — see [LICENSE](LICENSE).
