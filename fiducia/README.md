# Fiducia

**A seeded generator for beautiful fictional printed circuit boards.**

Fiducia invents plausible PCBs as art. Pick a board archetype, drag a few sliders, and it grows the whole thing from a seed: the board outline and mounting holes, a placement of chips/resistors/caps/connectors/LEDs, copper traces threading between their pads with vias where routes cross, a hatched ground pour, and a full silkscreen layer with component outlines, auto-numbered reference designators (R1, C4, U2), a title block, arrows, and fiducial marks. It renders in the classic mask-and-gold look and exports to PNG or crisp SVG.

## Why it's cool

Everyone recognizes a circuit board; almost no one has seen one *generated as art*. Fiducia turns the visual language of PCB CAD — traces, pads, vias, ground pours, silkscreen designators — into an infinite, remixable poster. The whole board is a pure function of its seed, so the seed lives in the URL: copy the link and you've shared the exact board. Same geometry feeds both the canvas and the SVG emitter, so the vector export matches what you see, layer for layer.

## Features

- **5 board archetypes** — Retro through-hole, Dense SMD, RF, Breakout, and Ornamental. Each drives its own component mix, pad style, default routing angle, and silkscreen density.
- **Full procedural pipeline** — outline + rounded corners + mounting holes → component placement on a jittered grid (with mirror symmetry for Ornamental) → pad/footprint stamping → L-shaped (90°) or diagonal (45°) trace routing with union-find net assignment → vias at bends and crossings → hatched ground pour → silkscreen.
- **Auto-generated silkscreen** — component outlines, sequential reference designators (R#, C#, U#, J#, D#, TP#, L#), fake values, directional arrows, fiducial marks, and a title/version block.
- **Live sliders** — trace density, component count, pad size, silkscreen amount, board roundness, via frequency, and symmetry.
- **Six soldermask/finish presets** — green, blue, red, OSH purple, matte-black ENIG, white HASL, each with gold or silver pad finish and glowing LED/test-point accents.
- **Hover to trace a net** — hovering a part dims the rest of the board, lights up its net, and shows a tooltip with the ref designator, value, net id, and pad count. Tap works on touch devices too.
- **Shareable + exportable** — the seed and every setting ride in the URL hash (Copy link), plus PNG export, layered SVG export (named `soldermask` / `copper` / `silkscreen` / `drill` groups), and a Tile poster mode that renders a 3×3 grid of related boards to one PNG.

## Run it

Zero dependencies, zero build, zero network. Either:

- **Double-click `index.html`** to open it in any modern browser, or
- Serve the folder statically, e.g. `python3 -m http.server` then visit `http://localhost:8000/`.

Serving over `http://` (rather than `file://`) lets the **Copy link** button write to the clipboard directly; on `file://` some browsers block clipboard access, so Fiducia falls back to prompting you to copy from the address bar.

## Controls

| Control | What it does |
| --- | --- |
| **Board archetype** | Switches the whole generation style (placement, routing, silkscreen). |
| **Soldermask & finish** | Picks the board color and gold/silver pad finish. |
| **Routing angle** | Auto (per archetype), 90° L-shaped, or 45° diagonal traces. |
| **Sliders** | Trace density, component count, pad size, silkscreen amount, board roundness, via frequency, symmetry. |
| **Seed field** | Shows the current seed; type any number to reproduce a specific board. |
| **↻ New** | Rolls a fresh random seed. |
| **Export PNG / SVG** | Saves the current board as a raster or vector file. |
| **Tile poster** | Renders a 3×3 grid of seed-related boards to one PNG. |
| **Copy link** | Copies a permalink (seed + all settings live in the URL hash). |
| **Hover / tap a part** | Highlights that component's net and shows its details. |

## Notes

Fiducia is an *art* generator, not an EDA tool. Routing is an approximate L-shaped/45° heuristic with light jitter and vias at crossings — it reads as a real board without being electrically valid. That's the point.

## License

MIT — see [LICENSE](LICENSE).
