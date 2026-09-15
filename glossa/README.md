# Glossa

**Drag across the vowel space and hear a human voice morph through ee · ih · eh · ah · oh · oo — a source-filter speech toy in one file.**

Glossa turns the source-filter theory of speech into something you can play. Drag a point around a 2D vowel chart and a synthetic voice vowels back at you in real time, while a live spectrum and scrolling spectrogram show *why* "ee" and "oo" look and sound different. No build step, no libraries, no audio samples — one HTML file.

## Why it's cool

Everyone has heard of formants; almost nobody has *felt* them. Here the abstract acoustics are tactile: move your finger and the formant peaks slide across the spectrogram as the timbre changes. You can also drop vowels into a "word strip" and hit play to make the synth glide between them and speak a pseudo-word — then copy a link that reproduces the exact sound for someone else.

## How it works

A glottal buzz (a Rosenberg-style glottal-pulse `PeriodicWave`, not a plain sawtooth) is blended with filtered breath noise and fed through a parallel bank of five bandpass formant filters. The vowel pad maps your pointer to the first two formants — **F1 on the vertical axis** (mouth openness, 250–850 Hz) and **F2 on the horizontal axis** (tongue front↔back, 600–2500 Hz, reversed so *ee* sits top-left). F3 is interpolated from the cardinal-vowel anchors; F4/F5 are fixed. Formant targets are slew-limited so glides sound coarticulated rather than stepped.

## Run it

Open `index.html` in any modern browser (Chrome, Edge, Firefox, or Safari):

```
# just double-click the file, or from a shell:
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

Web Audio requires a user gesture, so tap the **"Tap to give it a voice"** overlay first. No server or build step is needed; it also works over `file://`.

## Controls

- **Vowel pad** — drag to voice; the point follows your pointer and phonates only while pressed. The fading trail shows the articulatory path.
- **Keys `a s d f g h`** — trigger the cardinal vowels ee / ih / eh / ah / oh / oo (hold to voice).
- **Pitch** — fundamental frequency (~80–330 Hz), with a touch of vibrato.
- **Breathiness** — mixes breath noise against the glottal buzz.
- **Voice register** — soprano / alto / tenor / bass scale the whole formant table and pitch together.
- **Vowel buttons** — append a vowel to the word strip.
- **Presets** — one click loads and plays a cardinal vowel or a pseudo-word (yeah / hello / wow / see / yes).

## Word strip

Build a little utterance: add vowels (buttons or keys) or load a preset, then press **▶ Play** to glide the formants and pitch between the keyframes. Click any chip to remove it. **Loop** repeats the sequence; **Clear** empties it. Consonant onsets in presets fire short noise transients (`/s/` sibilant, `/t/` plosive, `/h/` aspiration) at step boundaries.

## Share links

The full state — vowel sequence, pitch, breathiness, register, and loop setting — serializes into the URL hash. Hit **Copy share link** and send it; opening that URL reproduces the same voice and word strip. (If clipboard access is unavailable, the button tells you to copy from the address bar instead of falsely claiming success.)

## License

MIT — see [LICENSE](LICENSE). Zero dependencies, zero network, one file.
