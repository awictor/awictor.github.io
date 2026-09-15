# Rootbloom

**Drag the roots and watch the basins bloom — a live Newton-fractal explorer in one HTML file.**

Newton fractals are the flower-like basin-of-attraction maps you get by iterating
`z ← z − a·p(z)/p'(z)` toward the roots of a complex polynomial. They're as beautiful
as the Mandelbrot set and mathematically deeper in places (their boundary is a *Wada*
frontier where every basin touches every other), yet almost nobody gets to play with one
interactively. Rootbloom fixes that: the polynomial is defined by its roots, so you can
literally **grab a root and drag it**, and the whole fractal reflows around your cursor at
interactive frame rates — the entire per-pixel Newton iteration runs on the GPU in a single
fragment shader.

Zero dependencies. Zero build step. No network calls. One file.

## Why it's cool

- The interaction is tactile — dragging a root feels like finger-painting an abstract idea
  from complex analysis.
- Add or remove roots to change the polynomial's degree on the fly.
- Spin the relaxation coefficient `a` around the unit circle and the basins spiral and breathe.
- Everything you see is a shareable link — the full state lives in the URL hash.

## Run it

Open `index.html` in any WebGL-capable browser — double-click it, or drag it into
Chrome / Firefox / Edge / Safari. That's it; `file://` works fine.

If you prefer a local server (optional, not required):

```sh
python -m http.server
# then open http://localhost:8000/
```

If your browser or GPU can't provide a WebGL context with float-precision fragment shaders,
Rootbloom shows a styled fallback message instead of a blank canvas.

## Controls

### Mouse & touch

| Gesture | Action |
| --- | --- |
| Drag a root handle | Reshape the polynomial live |
| Click empty space | Add a new root (raise the degree, max 12) |
| Alt-click / right-click a root | Remove that root (min 2) |
| Long-press a root (touch) | Remove that root |
| Drag the background | Pan across the complex plane |
| Mouse wheel | Zoom toward the cursor |
| Two-finger pinch (touch) | Zoom toward the pinch midpoint |
| Click with orbit trace on | Animate the Newton iteration path to its root |

### Keyboard

| Key | Action |
| --- | --- |
| `?` / `H` | Toggle help |
| `C` | Hide / show the control panel |
| `G` | Toggle the preset gallery |
| `O` | Toggle orbit-trace mode |
| `R` | Reset to the cubic z³ − 1 |
| `Space` | Play / stop the keyframe tour |
| `S` | Save a screen-resolution PNG |
| `+` / `−`, `]` / `[` | Zoom in / out on the center |

## Features

- **Live root editing** — drag, add, and remove roots; handles are drawn with basin-colored halos.
- **Four iteration schemes** — classic Newton, relaxed Newton (complex coefficient `a`),
  Halley's third-order method, and a Nova variant (adds a constant `c` each step).
- **Animated coefficient** — orbit `a` around the unit circle for continuous spiral morphs.
- **Smooth coloring** — hue by which root a pixel converges to, brightness from a continuous
  (fractional) iteration count, optional contour bands and boundary darkening, 8 palettes.
- **Deep pan & zoom** with an adjustable max-iteration budget and a live FPS / zoom HUD.
- **Preset gallery** — eight starting points rendered as live GPU thumbnails, each a clickable state.
- **Orbit trace** — click a point to watch the Newton iteration hop to its root.
- **Keyframe tour** — capture states and play an eased, looping fly-through (log-interpolated zoom).
- **PNG export** — screen resolution, or a supersampled tiled hi-res render at 2× / 4× / 6×.
- **Shareable URL state** — hit **Copy link** to grab a URL for the exact current bloom.

## URL-hash format

The full state is JSON, base64url-encoded, after the `#`. Fields:

| Key | Meaning |
| --- | --- |
| `r` | array of `[re, im]` root positions |
| `m` | method: `newton` / `relaxed` / `halley` / `nova` |
| `am`, `aa` | relaxation coefficient `a`: magnitude and angle (radians) |
| `cr`, `ci` | Nova constant `c`: real and imaginary parts |
| `it` | max iteration budget |
| `p` | palette index (0–7) |
| `ct` | contour bands on/off |
| `c` | view center `[re, im]` |
| `w` | view width across the canvas (complex units) |

## Requirements & limits

Any WebGL-capable browser with float-precision fragment shaders. If high precision isn't
available, Rootbloom falls back to `mediump` and warns you. Deep zoom is bounded by 32-bit
GPU float precision (roughly 10⁵×) — no double-emulation is attempted.

## License

MIT — see [LICENSE](LICENSE).
