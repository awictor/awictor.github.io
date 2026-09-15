# Choirwire

**Speak into your mic and a synth choir speaks back in your chord — a real, live channel vocoder in one HTML file.**

Choirwire is a classic 16-band channel vocoder rebuilt as a single self-contained web instrument. Your voice (the *modulator*) is split by a bank of bandpass filters into per-band envelope followers; those envelopes are imprinted, band-for-band, onto an internal polyphonic synth (the *carrier*) that you play from your computer keyboard. Whatever you say comes out sung in the chord you're holding — the iconic robot-choir "talking synth."

## Why it's cool

It's the genuine DSP, not a gimmick effect: a filter bank plus envelope followers driving a matched carrier filter bank, wired with sample-accurate WebAudio `AudioParam` connections. No pitch shifting, no dependencies, no build step, no network calls — the whole thing is ~300 lines of vanilla JavaScript in one file. No microphone? A built-in synthesized "demo voice" (a formant-swept vowel loop with consonant hiss) drives the vocoder so the effect and the visuals work immediately.

## Features

- **16-band channel vocoder** — mic modulator through a bandpass bank + envelope followers, imprinted on an internal carrier synth.
- **Play the carrier with your keyboard** — polyphonic QWERTY play, plus **Latch** to sustain a chord hands-free while you talk.
- **Key / scale snapping** — mashing keys stays musical (major / minor / pentatonic); changing key or scale re-snaps a held chord live.
- **Sibilance path** — automatic voiced/unvoiced detection (zero-crossing rate + high-band energy) blends in a noise carrier so consonants (s, t, sh) stay intelligible.
- **Live 16-bar spectral wall** — each band glows with its envelope, showing your voice sculpting the synth.
- **Carrier controls** — waveform (saw / square / pulse), 8 / 16 / 32 bands, sensitivity, and a **Fat** supersaw + sub-oscillator mode.
- **Chord sequencer** — transposes the held chord through a scale-snapped progression at an adjustable tempo.
- **No-mic fallback** — the synthesized demo voice keeps everything fully playable without a microphone.
- **One-tap capture** — record the processed output to a downloadable audio file (container auto-selected per browser).
- **Shareable patches** — every setting plus the held chord serializes into the URL hash. "Copy link" hands someone the exact robot-choir patch.

## Run it

No build, no install, no server.

1. Download `index.html`.
2. Double-click it, or open it in any modern browser (Chrome, Edge, Firefox, Safari).
3. Click **Start (demo voice)** to hear the vocoder immediately with the built-in voice.
4. Hold a chord on the keyboard (or tap the on-screen keys) and listen.
5. Click **Use microphone** to drive it with your own voice. **Headphones recommended** — the mic is never routed to the speakers, but open speakers can still feed back into the mic.

Try the preset buttons (Daft-Punk / Kraftwerk / Robot Choir / Vintage) for instant patches.

## Controls

| Control | What it does |
|---|---|
| **Keyboard** `A W S E D F T G Y H U J K` | Play the carrier synth polyphonically (piano layout: white keys on the home row). |
| **Mini keyboard** | Click/tap notes to toggle them into the held chord. |
| **Latch** | Sustains the held chord hands-free. Turning it off releases any notes whose key is no longer pressed — like a sustain pedal. |
| **Sequencer** | Steps the held chord through a scale-snapped progression at **Tempo**. Tempo only applies while the sequencer is on. |
| **Clear chord** | Drops all held notes. |
| **Record / Stop** | Captures the processed output and downloads it. Shows elapsed time while recording. |
| **Copy link** | Copies a URL that reproduces the current patch and held chord. |
| **Carrier** | Oscillator waveform: saw, square, or pulse. |
| **Key / Scale** | Snaps every played note into the chosen key and scale (major / minor / pentatonic). Changing these re-snaps a held chord live. |
| **Bands** | Vocoder resolution: 8 (fewer, fatter formants), 16 (classic), or 32 (crisper). |
| **Sensitivity** | Envelope-follower gain — how strongly the voice opens the carrier bands. |
| **Fat (supersaw+sub)** | Adds two detuned oscillators plus a sub-octave sine to each note for a thicker carrier. |

Sibilance (s / sh / t) is detected automatically and mixed in through a noise carrier for clarity.

## How it works

```
mic / demo voice ──► [ bandpass_i ─► |x| ─► lowpass ] ──► envelope_i
                          (N bands)                          │
                                                             ▼ (drives gain)
keyboard synth ──► [ bandpass_i ─► gain_i ] ───────────────► sum ─► output
                          (N matched bands)
```

The modulator is split into N frequency bands; each band is rectified and low-pass smoothed into an envelope. That envelope is connected directly to the gain of a matched band of the carrier, so the carrier only sounds where — and as loudly as — your voice does in that band. A parallel unvoiced/high-frequency path mixes in filtered noise so consonants read clearly.

## License

MIT — see [LICENSE](LICENSE).
