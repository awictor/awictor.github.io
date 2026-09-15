# Nodelace

**Drive a virtual plate, watch sand draw the hidden geometry of sound.**

Nodelace is a single-file, zero-dependency interactive toy and visual essay about
**cymatics** — the standing-wave patterns Ernst Chladni discovered in 1787 by
bowing sand-covered metal plates. Sweep a driving frequency and thousands of
simulated sand grains flee the vibrating antinodes and settle along the still
nodal lines, self-assembling into intricate, lace-like symmetric figures in real
time on an HTML canvas.

## Why it's cool

It turns an 18th-century physics demo — normally a metal plate, a violin bow, and
a fistful of sand — into something you run instantly in a browser tab. The output
is genuinely mesmerizing: delicate, symmetric lace forming out of chaos as you
scrub a slider. It doubles as a guided explainer (short scrollytelling panels teach
nodes, eigenmodes, resonance, and the (n,m) mode formula) with the live simulation
as the illustration. And because every parameter is written into the URL, any
pattern you find at 428 Hz is already a shareable link.

## Run it

Open `index.html` in any modern browser. That's it.

- Double-click the file, or
- `start index.html` (Windows) / `open index.html` (macOS) / `xdg-open index.html` (Linux)

No server, build step, install, or network access required. The optional tone and
microphone features are gesture-gated and activate on first click (browser
autoplay/permission rules).

## What's under the hood

- **Grain simulation** — up to 45,000 particles do a biased random walk down a
  precomputed amplitude field toward the nodal lines, with vibration-scaled jitter
  so grains shake loose at antinodes and settle at nodes.
- **Square plates** — a driven-damped superposition of true eigenmodes
  `cos(nπx)·cos(mπy) − cos(mπx)·cos(nπy)`; the driving frequency snaps to the
  nearest real mode via a resonance response model.
- **Round plates** — a Bessel-function variant (concentric rings crossed by radial
  spokes), using a real `besselJ` implementation and a Bessel-zero table.
- **Resonance hunt** — auto-sweeps the frequency and dwells on each mode it locks
  onto, so patterns bloom and dissolve like a slideshow.
- **URL-hash state** — shape, frequency, mode, damping, grain count, palette,
  depth, symmetry, and theme all serialize into the address bar.

## Controls

**Sliders & steppers** — frequency, damping, grain count, mode numbers (n,m for
squares; nₐ,k for discs), symmetry sign, palette, depth shading, light/dark theme.

**Sound** — a pure sine WebAudio tone at the current frequency, plus a
"sing to the sand" mic mode that detects your pitch (autocorrelation) and drives
the plate with it.

**Capture & share** — PNG snapshot, animated WebM loop (falls back to a built-in
GIF encoder where WebM isn't supported), and Copy link.

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `←` / `→` | Tune frequency (hold `Shift` for bigger steps) |
| `Space` | Pause / resume grains |
| `S` | Toggle plate shape (square / round) |
| `H` | Toggle resonance hunt |
| `T` | Toggle tone |
| `M` | Toggle mic |
| `P` | Save PNG |
| `G` | Save GIF loop |
| `R` | Reshuffle grains |

## Share format

State lives in the URL hash, e.g.
`#shape=square&f=440&z=0.045&g=14000&pal=neon&depth=1&sym=1&theme=dark&n=6&m=11`.
Copy the address bar (or hit **Copy link**) and whoever opens it lands on the exact
same figure. A gallery of curated presets ships in the controls panel.

## Accessibility

Nodelace honors `prefers-reduced-motion`: it disables decorative animations, makes
field transitions instant, settles the grains once, and starts paused so nothing
moves until you opt in with `Space`.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
