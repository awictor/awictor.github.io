# Whorl

**Draw anything. Watch a chain of spinning circles redraw it from pure frequency.**

Whorl is a single-file, zero-dependency canvas toy. Sketch a closed curve; it runs a
Discrete Fourier Transform over the path and reconstructs your drawing as a nested chain
of rotating circles — the classic Ptolemaic "wheels within wheels." The vectors spin
smallest-to-largest and their tip drags a glowing comet trail that re-traces exactly what
you drew.

## Why it's cool

The Fourier-epicycle animation is one of the most hypnotic things in math. Whorl turns it
from a video you watch into a machine you drive with your own scribble — then hands you a
link that reproduces the identical animation on someone else's screen. No build step, no
server, no dependencies: one HTML file, a couple hundred lines of vanilla JS, one canvas.

## Features

- **Freehand draw** (mouse or touch) — on release the path auto-closes and resamples to 256 evenly-spaced complex points.
- **DFT engine** computes frequency, amplitude, and phase for every harmonic; whorls are sorted by amplitude so the big ones anchor and the small ones add detail. The transform runs once on release, so playback stays smooth.
- **Harmonics slider (1–256)** — live truncation of the series. Watch a rough blob sharpen into your exact curve as you drag.
- **Speed control** with reverse, freeze (0×), and a time-scrub slider to stop the machine at any phase.
- **Interactive spectrum strip** — a log-scaled bar readout of harmonic magnitudes. Click a bar to mute/unmute that whorl; hover to spotlight its circle. The comet trail is hue-colored by the currently-dominant harmonic.
- **Live fidelity readout** — active whorl count, a fidelity % that climbs with harmonics, and trace-completion %.
- **Presets**: heart, star, lightning, treble clef, spiral — plus **SVG path import** (paste a `d` attribute from a logo or letterform).
- **Shareable links** — your drawing is quantized, delta-encoded, and base64-packed into the URL hash, so a link reproduces the exact animated machine.
- **One-click export** — save a **PNG** snapshot or record an animated loop to **WebM** (falls back to MP4 on browsers like Safari that don't support WebM).
- **Toggles** for the circles, the radius vectors, and a dashed ghost outline of your original path.

## Run it

No build, no server. Open the file in any modern browser:

```
# from the project directory
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or just double-click `index.html`. That's the whole setup.

## Controls

| Control | What it does |
|---|---|
| Draw on the canvas | Freehand a closed shape (mouse or touch); releases into a reconstruction |
| **Preset** | Load a hand-tuned demo path |
| **Import SVG path** | Paste an SVG `d` attribute to trace a logo/letterform |
| **Clear** | Reset the canvas back to the empty state |
| **Share link** | Copy a URL that reproduces the current drawing |
| **PNG** | Download a snapshot of the current frame |
| **Record WebM** | Record one animation loop to a video file (WebM, or MP4 where WebM isn't supported) |
| **Harmonics** | Number of whorls used — low = blurry approximation, high = razor-sharp |
| **Speed** | Playback rate; negative reverses, `0×` freezes the machine |
| **Scrub** | Jog to any point in the loop |
| **Play / Pause** | Start or stop the animation |
| circles / vectors / ghost | Show or hide the epicycle circles, the radius vectors, and the original outline overlay |
| Spectrum bar (click) | Mute/unmute that individual whorl |
| Spectrum bar (hover) | Spotlight the matching circle on the canvas |

## How it works

Your path is treated as a sequence of complex numbers (`x + iy`). A naive O(n²) DFT over
256 samples yields one rotating vector per frequency: radius = amplitude, starting angle =
phase, angular speed = frequency. Summing them tip-to-tip and stepping time forward redraws
the curve. It's O(n²), but it runs once per drawing — not per frame — so 256 points is
trivial.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
