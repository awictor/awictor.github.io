# Rasterisk

**A demoscene in a textbox — write one math formula, get animated ASCII.**

Rasterisk is a text-mode shader playground. You type a tiny expression `f(x,y,t)`
that returns a number; it's evaluated once per character cell, every frame, and
mapped through a glyph density ramp to produce a live animated ASCII/text-art
field. It's the pixel-shader mental model — a per-cell function of position and
time — rendered entirely in monospace glyphs, with retro phosphor color modes and
one-click sharing of any creation via the URL hash.

The name is *raster* + *asterisk*: the whole screen is a raster you paint with
`. : - = + * # % @`.

## Why it's cool

- If you've written a fragment shader, the model clicks instantly: same
  `f(position, time)` idea, but the "framebuffer" is a grid of characters.
- Every creation is just a URL. The full state (expression, ramp, color mode,
  gain/bias/contrast/speed, seed) round-trips through the hash, so any field you
  make is a link you can paste to someone.
- Learn by remixing: load a preset, tweak a constant, hit **mutate**, share it.
- Zero dependencies, zero build, one HTML file. Double-click and go.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
That's the whole setup. No install, no build step, no network calls.

If you prefer a local server (optional; not required):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

On first load (empty URL hash) it opens in **attract mode**, auto-morphing through
presets and color modes so there's motion within about a second.

## Controls

- **Expression** — the textarea. Type any JS expression that returns a number;
  it recompiles as you type. Bad input shows an inline error and never crashes the
  animation.
- **mutate** — perturbs the numeric constants in the current expression.
- **random** — reseeds and mutates a random preset.
- **attract** — toggle the auto-morphing screensaver. It also re-arms itself after
  ~45s of no interaction.
- **Helpers** — click a chip to insert that function at the cursor.
- **Presets** — load one of 10 classics (plasma, ripple, tunnel, spiral,
  metaballs, checker, interference, clouds, marble, flow). The active preset is
  highlighted; it clears once you diverge from it.
- **Color** — green phosphor, amber CRT, mono, value→hue, or two-tone.
- **Density** — cell/font size (bigger = coarser grid).
- **Ramp** — the dark→light glyph string; editable, with an **invert** button.
- **Gain / Bias / Contrast** — remap the raw value before it's quantized to a
  glyph.
- **Speed** — time multiplier.
- **pause** — freezes time (`t` stops advancing).
- **glow / scan** — toggle the phosphor bloom and the CRT scanline+vignette overlay.
- **text / PNG / loop** — copy the current frame as plain text, save it as a PNG,
  or record a 4-second WebM loop (browser support permitting).
- **copy share link** — copy a URL that reproduces the exact current field.

## Expression reference

Your expression is compiled as `f(x, y, t, h)` and evaluated per cell:

- `x`, `y` — cell position. `y` is `[-1, 1]`. `x` is scaled by the aspect ratio,
  so `|x|` can exceed 1 on wide screens (keeps circles round). If you need a strict
  `[-1, 1]`, divide `x` by its max or use `hypot(x, y)` which behaves either way.
- `t` — time in seconds (scaled by the Speed control; frozen when paused).
- `h` — the helper library, exposed directly (no `h.` prefix needed):
  - everything on `Math` — `sin`, `cos`, `tan`, `hypot`, `atan2`, `abs`, `sqrt`,
    `exp`, `pow`, `min`, `max`, `sign`, `floor`, `PI`, …
  - extras: `fract`, `clamp`, `mix`, `step`, `smoothstep`, `hash`, `noise`,
    `fbm`, `warp` (seeded 3D value noise and domain warp).

The return value is normalized (`value * gain + bias`, then contrast around 0.5,
clamped to `[0, 1]`) and quantized into the glyph ramp.

### Try these

```js
sin(hypot(x,y)*12 - t*4)                 // ripple
fbm(x*3+t*.1, y*3, t*.2)                 // drifting clouds
sin(7/(hypot(x,y)+0.12) + atan2(y,x)*4 + t*2)   // tunnel
sin(atan2(y,x)*6 + hypot(x,y)*11 - t*3)  // spiral
```

## Notes

- Everything runs client-side. You are running your own expression in your own
  browser; there's no server and nothing is sent anywhere. Eval is wrapped in
  try/catch so typos surface as an error message instead of freezing the frame.
- Performance is bounded: colors are precomputed into a 64-entry palette,
  same-color runs are batched into single `fillText` calls, the monospace cell is
  measured once, and the grid is capped (~13k cells) by shrinking the grid rather
  than the font.

## License

MIT — see [LICENSE](LICENSE).
