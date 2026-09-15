# Nib

**Draw a squiggle, hear its Fourier series play as a synth.**

Nib is a zero-dependency, single-file hand-drawn wavetable synthesizer and additive-synthesis explainer. Sketch one cycle of a waveform on a canvas; Nib runs a real-time discrete Fourier transform, builds a Web Audio `PeriodicWave` from the harmonic coefficients, and plays it polyphonically from your keyboard. A live spectrum shows exactly which sine partials your doodle contains — a random scribble becomes a visible, playable music-theory demo.

## Why it's cool

It collapses a lecture on Fourier series into a toy: doodle a shape and you instantly *hear* and *see* it decomposed into its sine partials. Editing is bidirectional — drag the spectrum bars and the waveform redraws itself via the inverse transform. An epicycle animation reconstructs the curve from its summed rotating phasors. And every sound you make encodes into the URL, so a patch is just a link you can paste to someone.

## Features

- **Draw-to-sound canvas** — sketch one cycle (256 samples) with mouse or touch; optional smoothing brush and horizontal mirror mode for symmetric harmonics.
- **Real-time DFT** — up to 32 harmonics, converted to a Web Audio `createPeriodicWave` so the browser band-limits it (no aliasing) across the keyboard range.
- **Live harmonic spectrum** — bar chart of the Fourier decomposition; **drag the bars** to sculpt partials and the waveform inverse-transforms in place. Hovering highlights the bar under the pointer and shows its harmonic index + amplitude.
- **Epicycle view** — rotating phasors sum to redraw the curve (respects `prefers-reduced-motion`; phasors freeze into a static reconstruction when reduced motion is requested).
- **Polyphonic voices** with an adjustable ADSR envelope (live numeric readouts), unison detune, and a feedback delay.
- **Playable** from clickable on-screen keys or the QWERTY row (labels stamped on the keys). Space toggles sustain.
- **Output scope + limiter** — oscilloscope of the summed output with an RMS meter and a `DynamicsCompressor` reduction readout.
- **Presets** — one-tap sine, saw, square, triangle, and a fresh random *doodle* on every click.
- **Record to WAV** and **shareable URL** — full state (256 quantized wave samples + ADSR) serializes into the URL hash.

## Run it

No build, no dependencies, no network calls.

- **Easiest:** double-click `index.html` to open it in any modern browser.
- **Or serve it statically** (some browsers restrict clipboard/`file://` features):
  ```sh
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

Click once to start audio (browsers require a gesture before sound), then start drawing.

## Controls

| Action | How |
| --- | --- |
| Draw a wave | Drag on the left **Waveform** canvas |
| Sculpt partials | Drag bars on the **Harmonic spectrum** canvas |
| Play notes | Click on-screen keys, or type the QWERTY row `A W S E D F T G Y H U J K` (mapped by physical key position, so it works on non-QWERTY layouts) |
| Sustain | `Space`, or the **sustain** button |
| Presets | **sine / saw / square / triangle / doodle** buttons |
| Smoothing / mirror | **smooth** and **mirror** toggle buttons |
| ADSR / detune / delay | Sliders under the visualizers (with live value readouts) |
| Record audio | **record wav** → **stop** downloads a `.wav` |
| Share a patch | **copy share link** copies a URL that reloads your exact sound |

## How it works

`analyzeWave()` computes the DFT of the 256-sample cycle into 32 harmonic coefficients; `rebuild()` feeds them to `AudioContext.createPeriodicWave` for band-limited playback. Editing the spectrum runs `reconstruct()` (the inverse sum) to redraw the canvas, keeping the two views in sync from either direction. Everything is inline HTML/CSS/JS in `index.html`.

## License

MIT — see [LICENSE](LICENSE).
