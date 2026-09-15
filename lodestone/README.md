# Lodestone

**Drop magnets, watch iron filings snap into field lines — the grade-school demo, made interactive.**

Lodestone is a single HTML file (no build, no dependencies, no network) that turns your
browser into a pane of glass with iron filings sprinkled over it. Drop bar magnets and point
poles onto a dark canvas and a live field of filings re-forms around them in real time. Grab a
magnet and the whole field re-flows under your cursor; flip its polarity and the lines reroute;
add a second magnet and attraction, repulsion, and neutral points appear on their own.

## Why it's cool

The filings aren't a texture or a lookup table — they're real streamlines integrated through an
actual superposed magnetic field. So the classic textbook patterns (dipole loops, the double-cusp
of like poles, X-shaped neutral points) *emerge from the physics* rather than being drawn in. It
reads as instantly legible — "oh, that's a magnet" — while being correct under the hood.

## The physics

- Each **bar magnet** is modeled as two opposite magnetic point charges (poles) at its ends; each
  **point pole** is a single charge. This is cheap and accurate enough for the 2D picture — far
  cheaper than a full solenoid integral.
- The field at any point is the **superposition** `B = Σ q·r̂ / r²` over every pole, with the
  `1/r²` singularity clamped near the poles so dragging stays smooth.
- **Filings** are short streamlines: seed points on a jittered grid, integrated both directions
  along the local field with a 2-step **RK2** tracer. Brightness and length scale with `|B|`
  (weaker field → longer, fainter whiskers), and jitter is deterministic so the pattern stays put
  frame-to-frame instead of shimmering while you drag.
- **Neutral points** (where `B → 0`) are found by a grid scan for local minima and marked with an
  accent X, with extra field lines seeded around each to show the separatrix geometry.

## Run it

Open `index.html` in any modern browser. Double-click the file, or:

```
# optional — only if your browser blocks file:// features you want to test
python3 -m http.server 8000   # then visit http://localhost:8000
```

No install, no build step, works offline.

## Controls

| Action | How |
|---|---|
| Reposition a magnet | Drag it |
| Flip polarity | Double-click (desktop) or double-tap (touch) a magnet |
| Rotate a bar magnet | Scroll the mouse wheel while hovering over it |
| Remove a magnet | Right-click (desktop) or long-press (touch) |
| Add magnets/poles | **+ Bar magnet**, **+ N pole**, **+ S pole** in the toolbar |
| Load a layout | **Presets…** (single bar, dipole, like poles, horseshoe, quadrupole) |
| Filings density | **Filings** slider (sparse whiskers → dense carpet) |
| Compass overlay | **Compass grid** — a lattice of needles that point along the field |
| Share a layout | **Copy link** — the exact scene is encoded in the URL hash |
| Export | **Save PNG** — saves the current field as a wallpaper |
| Start over | **Clear** |

## Sharing

Every layout serializes into the URL hash (positions normalized to the canvas), so a link
reproduces the exact arrangement. Just add magnets, hit **Copy link**, and send it.

## License

MIT — see [LICENSE](LICENSE).
