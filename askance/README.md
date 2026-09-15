# Askance

**A static image that only moves when you look away from it.**

Askance is a single-file, zero-dependency lab for the *peripheral-drift* illusion —
the Fraser–Wilcox / "Rotating Snakes" family made famous by Akiyoshi Kitaoka. It
procedurally draws a field of repeating four-tone patches whose pixels never change,
yet the parts you are *not* directly looking at appear to rotate and crawl. Stare at
the crosshair and the motion stops exactly where your eye lands; glance away and it
starts up again in your periphery.

## Why it's cool

Most people have only ever seen this illusion as a fixed JPEG. Here every parameter is
a live knob: drag the contrast slider and watch the motion strengthen or die, flip the
drift direction, swap geometries, and change palettes — all rendered on the fly. It is
provably honest, too: press **Prove it's frozen** and the field is held perfectly still
so you can confirm nothing on screen ever actually moves. The whole thing is one HTML
file with no build step and no network calls.

## How it works

Each ring (or tile, or spiral arm) repeats an asymmetric four-tone luminance ramp:
**black → dark → white → light**. In your periphery — where vision is coarse and your
eyes jitter constantly — that asymmetric brightness step is misread as directional
motion. Involuntary microsaccades and blinks keep refreshing the signal, so the
"rotation" only lives outside your fovea. The field is rendered once to an offscreen
canvas per parameter change and then blitted, so the animation loop (used only for the
optional 1px microsaccade nudge and the gaze tour) never touches the pattern itself.

## Run it

No install, no build, no server needed.

- **Double-click `index.html`** to open it in any modern browser, **or**
- serve the folder statically, e.g. `python3 -m http.server` then open
  <http://localhost:8000>.

Requires a browser from ~2023 or newer (Chrome 111+, Firefox 113+, Safari 16.2+) for
the translucent panel; older engines fall back to a solid panel and still work.

## Controls

| Control | What it does |
|---|---|
| **Contrast** | Strength of the luminance ramp. Higher = stronger drift. |
| **Rings / turns** | Number of concentric rings (or spiral turns). |
| **Spatial frequency** | Patches per ring / cell size — the texture's fineness. |
| **Geometry** | `Rings` (concentric), `Carpet` (tiled), or `Spiral`. |
| **Palette** | `Kitaoka` high-punch 4-tone, or `Gray` grayscale. |
| **Drift dir** | `CW` / `CCW` — reverses the illusory rotation. |
| **Gaze tour** | Auto-sweeps the crosshair along a looping path so the drift visibly switches on in the periphery / off at the fovea. |
| **Microsaccade** | Slow 1px whole-canvas nudge that amplifies the apparent motion. |
| **Prove it's frozen** | Press and hold to freeze everything and show the field is truly static. |
| **Randomize seed** | New random patch phasing. |
| **Copy share link** | Copies the current configuration as a URL. |
| **Export PNG** | Saves the static field as a PNG. |
| **Presets** | `Classic`, `High punch`, `Grayscale` starting points. |

**Tips**
- Click anywhere on the field to move your fixation crosshair (disabled while the gaze tour runs).
- Press **H** for a clean, panel-free view; press it again — or click the corner button — to bring the panel back.
- Don't stare — the effect is peripheral by design. Let your gaze wander around the field.

## Sharing

Every setting is serialized into the URL hash, so any link reproduces an exact
configuration. Parameters:

`#c=<contrast>&r=<rings>&f=<freq>&g=<rings|carpet|spiral>&p=<kitaoka|gray>&d=<1|-1>&s=<seed>`

Add `#hidepanel` to open straight into the clean, panel-free view.

## Accessibility

`prefers-reduced-motion` is honored: the microsaccade jitter and the gaze tour are both
suppressed and the field stays a true still image, with an on-screen note. Every pixel
of the illusion is static regardless of settings.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Alex Wictor.
