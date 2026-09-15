# Timbrel

**Draw the overtones, morph two spectra, play the timbre on your keyboard.**

Timbrel is a zero-dependency additive synthesizer you play by *drawing sound* instead of tweaking knobs. Drag a row of 24 partial bars up and down to sculpt a harmonic spectrum directly — bar 1 is the fundamental, bar 2 the octave, bar 3 the fifth above, and so on. Every edit rebuilds a WebAudio `PeriodicWave` in real time, so the tone you see is exactly the tone you hear.

## Why it's cool

Most browser synth toys hand you an oscillator-type dropdown and a filter knob. Timbrel lets you literally paint the Fourier series and hear additive synthesis the way textbooks describe it but never let you touch. You keep **two** drawn spectra (A and B) and a morph slider crossfades between them, so timbre becomes a continuous, gestural thing you can perform — a hollow flute blooming into a bright reed as you sweep. And because the entire patch lives in the URL hash, any sound you make is a shareable link.

It's genuinely educational (you build intuition for harmonics, odd vs. even partials, spectral tilt) while being immediately fun to jam on.

## Features

- **Draggable 24-bar harmonic editor** (mouse + touch) that rebuilds a WebAudio `PeriodicWave` live from the amplitude coefficients you draw.
- **Dual spectra A/B** with a morph slider that interpolates the two amplitude sets in real time for continuous timbre sweeps.
- **Auto-morph LFO** — a checkbox with rate/depth controls that sine-sweeps the morph on its own to make evolving pads (the morph slider disables while it drives).
- **Polyphonic QWERTY keyboard** — two rows mapped chromatically like a piano, with per-voice ADSR gain envelopes, a 12-voice pool with oldest-voice stealing, and click-to-play on-screen keys.
- **Live viz** — an oscilloscope from an `AnalyserNode`, plus the bar editor doubling as a running spectrum display that pulses with the sounding note's harmonics.
- **Sound shaping** — attack, release, spectral tilt (harmonic rolloff), unison detune spread, sub-octave, and a synthesized-impulse convolver reverb with wet/dry mix.
- **Eight instant presets** — organ, bell, glass, brass, reed, saw, square, vox.
- **Shareable patches** — the full patch (both spectra + all params) serializes into the URL hash. Copy the link, send it, done.

## Run it

No build step, no server, no network calls.

```
Open index.html in any modern browser (Chrome, Firefox, Safari, Edge).
```

Browsers require a user gesture before they'll make sound, so **click a bar, a preset, or a key first** to unlock audio, then play.

## Controls

**Keyboard (play like a piano):**

| Keys | What |
|------|------|
| `A S D F G H J K L ;` | lower (white-key) row |
| `W E · T Y U · O P` | upper (black-key) row |
| `Z` / `X` | octave down / up |
| `Space` (hold) | sustain pedal |

You can also click the on-screen keys.

**Editing the sound:**

- **A / B** buttons pick which spectrum your drawing edits.
- **Drag on the bar grid** to draw the harmonic amplitudes (bar 1 = fundamental, bar 2 = octave, …). Drag flat to the floor and you'll get silence — an on-canvas hint reminds you to draw some overtones.
- **Morph slider** crossfades A ↔ B. The cyan outline over the bars shows the blend you actually hear.
- **auto-morph** sweeps the morph automatically; **rate** and **depth** shape the sweep.
- **attack / release / tilt / detune / sub-oct / reverb** sliders shape the voice.
- **presets** load a starting spectrum into whichever of A/B you're editing.
- **mutate** nudges the current bars randomly for happy accidents.
- **copy link** puts the shareable URL on your clipboard.

## Share format

The patch is encoded in the URL hash as dot-separated fields:

```
#<A>.<B>.<atk>.<rel>.<tilt>.<det>.<sub>.<rev>.<lfo>.<lrate>.<ldepth>.<morph>
```

`<A>` and `<B>` are each 24 base-36 characters (one per partial, amplitude quantized to 0–35); the rest are the numeric control values. Loading a URL with a hash restores the exact patch on boot.

## License

MIT — see [LICENSE](LICENSE).
