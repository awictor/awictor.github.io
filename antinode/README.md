# Antinode

**Draw with two decaying pendulums — a harmonograph you can share as a URL.**

Antinode is a single-file, zero-dependency harmonograph studio. It simulates the
classic Victorian drawing machine: a pen driven by decaying sinusoidal oscillators —
one pair swinging the paper (x), one pair swinging the pen (y). As the virtual
pendulums lose energy, their intersecting swings trace the intricate, self-similar
lacework figures harmonographs are famous for.

## Why it's cool

- **Every figure lives in the URL.** The entire machine state is encoded in the hash,
  so any figure you land on is deterministic and shareable as a plain link.
- **You watch the pen decay.** The nib traces in real time and lays down a
  time-keyed color gradient, so the curve visibly reads its own loss of energy.
- **It exports for real fabrication.** Save a raster PNG, or a true single-`<path>`
  SVG (near-collinear points downsampled) that a pen plotter or laser cutter can run.
- **Harmonic snap.** Lock frequency pairs to small-integer musical ratios (2:1, 3:2,
  5:4 …) and any doodle collapses into a clean, closed, symmetric figure.

## Run it

No build, no install, no network.

- **Double-click `index.html`**, or drag it into any modern browser tab.
- Or serve it: `python -m http.server` then open `http://localhost:8000/index.html`.

`file://` works fully — including Copy link (it falls back to a manual-copy path
where the Clipboard API is unavailable).

## Controls

**Oscillators** — four boxes (X primary/overtone, Y primary/overtone), each with
sliders for frequency `f`, phase `p`, amplitude `a`, and damping `d`. Changes apply
live without restarting the drawing.

**Studio**
- Palette — six time-keyed color gradients.
- Harmonic snap — quantize frequencies to musical ratios for guaranteed closed figures.
- Afterglow / persistence — glow trail instead of a crisp line.
- Sonify interval — play the locked frequency ratio as a four-tone chord.
- Ink & paper preview — light "paper" theme with darkened ink, true to PNG output.
- Speed — trace speed of the live pen.

**Actions**
- Play / Pause — animate the pen; when a figure finishes the button becomes **Replay**.
- Randomize — new figure from a seed (respects harmonic snap if on).
- Copy link — copy the current figure's shareable URL.
- PNG — export the raster canvas.
- SVG (single path) — export one `<path>` for plotting/fabrication.

**Keyboard**
- `Space` — play / pause
- `R` — randomize
- `S` — save PNG

## The model

`x(t)` and `y(t)` are each the sum of two decaying sinusoids:

```
x(t) = A1·sin(f1·t + p1)·e^(−d1·t) + A2·sin(f2·t + p2)·e^(−d2·t)
y(t) = A3·sin(f3·t + p3)·e^(−d3·t) + A4·sin(f4·t + p4)·e^(−d4·t)
```

integrated over a fixed number of steps and fit to the canvas. That's the whole
machine — everything else is UI around it.

## License

MIT © Alex Wictor
