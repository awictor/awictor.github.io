# Driftfield

A self-composing ambient music engine where every seed grows a piece that never repeats — and you watch it flow.

Type a word. Driftfield hashes it into a seeded random number generator that drives an endless, evolving ambient composition: layered drones, a warm pad, a probabilistic arp, glassy bells and a granular texture bed. The same seed also drives a flow-field visualizer, so every note you hear releases a particle of light that drifts across the screen. What you see *is* the piece.

One HTML file, zero dependencies, no build step, no network. Open it and listen.

## Why it's cool

Most generative-music toys bolt a scope onto the audio. Driftfield derives the music **and** the visuals from the same seeded noise field, so the two are genuinely coupled — notes become particles advected through the currents you're looking at. And because everything (seed plus every setting) lives in the URL hash, any piece you stumble into is a permanent, shareable link: send it and a friend hears the exact same evolving composition. It's tuned to hold up left running for hours.

## Features

- **Deterministic seeds** — a string seed is hashed (xmur3) into a mulberry32 PRNG; all musical and visual randomness derives from it, so pieces are perfectly reproducible.
- **Shareable permalinks** — seed, key, scale, mood, density, tempo, tension, brightness, reverb, volume and visual mode are serialized into the URL hash on every change. Web Share on mobile, copy-to-clipboard on desktop.
- **Generative composition** — 7 scales/modes (Aeolian, Dorian, Lydian, Phrygian, major/minor pentatonic, Hirajoshi), a weighted Markov chord-progression walker with a tension control and voice-leading, and per-voice Euclidean rhythms with humanized timing and rests.
- **Six synth voices** — sub drone, detuned-saw warm pad, triangle bass, plucked arp, FM-ish glassy bells, and a granular noise texture bed, each in its own register and envelope.
- **Long-form evolution** — several very slow LFOs plus an ~8-minute "day arc" macro breathe density, brightness, tension, stereo motion and reverb send over minutes, so it keeps drifting instead of looping.
- **Zero-file signal chain** — a procedurally generated convolution reverb (baked at runtime, no external impulse file), a tempo-synced stereo feedback delay, and a master compressor plus soft limiter so it stays clean over long runs.
- **Five mood presets** — Nocturne, Meadow, Glacier, Rainfall, Deep remap synthesis and generative character in one tap.
- **Flow-field visualizer** — full-screen canvas with three modes (Flow / Ripple / Nebula) and an analyser-driven bloom coupled to the audio.
- **Ambient/screensaver mode** — fullscreen, auto-hiding controls, hidden-tab throttling, and a particle budget that scales to screen size and pixel density.
- **Capture** — save a PNG snapshot of the field or record an audio clip (WebM/OGG via MediaRecorder).

## Run it

Double-click **`index.html`**, or open it in any modern browser (Chrome, Firefox, Safari, Edge). There is no build, no server, and no network dependency.

Because browsers block autoplay, audio starts on your first interaction — click **Begin listening** (or a gallery card) to start.

To serve it as a live demo on GitHub Pages, push the repo and enable Pages; the included `.nojekyll` file lets it serve as-is.

## Controls

**On screen**

- **Play/pause** — center transport button.
- **Volume** and **Density** — sliders in the transport bar.
- **Evolve** — gently mutate the current seed (keeps the character, shifts the details).
- **Random** — jump to a fresh random seed.
- **Rec** — start/stop an audio recording (downloads a clip when you stop).
- **PNG** — save a snapshot of the current field.
- **Share** — copy a permalink to the exact current piece.
- **Fullscreen** — ambient mode; controls auto-hide after a few idle seconds.
- **Composition panel** — key, scale/mode, mood, tempo, tension, brightness, reverb, and visual mode, plus the seed input.

**Keyboard**

| Key | Action |
|-----|--------|
| `Space` | Play / pause |
| `F` | Fullscreen ambient mode |
| `R` | Random seed |
| `E` | Evolve current seed |
| `Esc` | Close the composition panel |

## Sharing format

State lives entirely in the URL hash, e.g.:

```
index.html#s=petrichor&k=4&sc=minpenta&m=rainfall&d=72&t=84&te=30&b=52&r=60&v=72&vz=flow
```

| Param | Meaning | Range |
|-------|---------|-------|
| `s`  | seed string | any text |
| `k`  | key | 0–11 (C…B) |
| `sc` | scale/mode | `aeolian` `dorian` `lydian` `phrygian` `majpenta` `minpenta` `hirajoshi` |
| `m`  | mood | `nocturne` `meadow` `glacier` `rainfall` `deep` |
| `d`  | density | 0–100 |
| `t`  | tempo | 40–120 bpm |
| `te` | tension | 0–100 |
| `b`  | brightness | 0–100 |
| `r`  | reverb | 0–100 |
| `v`  | volume | 0–100 |
| `vz` | visual mode | `flow` `ripple` `nebula` |

The **Share** button builds this link for you; you don't need to hand-edit it.

## Curated seeds

The start screen has a gallery of six hand-picked pieces — Midnight Tide, Glass Meadow, Blue Glacier, Petrichor, Abyssal, Hanami — each with a live seeded thumbnail. Click one to drop straight in.

## License

MIT — see [LICENSE](LICENSE).
