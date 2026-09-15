# Squelchbox

A TB-303-style acid bassline synth that fits in one HTML file.

Squelchbox is a self-contained, zero-dependency acid synth built on the Web Audio API. It pairs a 16-step 303-style sequencer with the three knobs that made the machine legendary — **cutoff, resonance, and env-mod** — plus per-step **accent** and **slide** (glide) for that rubbery, squelching swagger. A live oscilloscope shows the filtered waveform ripping as it plays, and every knob, note, and step encodes into the URL, so a pattern is just a link you can paste to a friend.

## Why it's cool

- **One file, no build, no deps, no network.** ~400 lines of HTML/CSS/JS. Open it and play.
- **A real 303 voice, not a toy.** Single oscillator into a resonant lowpass with a decaying env-mod sweep. Accent boosts volume, filter top, and resonance snap. Slide does *true* portamento — pitch glides between held steps and the amp envelope doesn't retrigger, so notes play legato instead of clicking.
- **Tight timing.** A look-ahead scheduler pumps events onto the audio clock (25 ms tick, 120 ms horizon) instead of naive `setInterval`, so the groove doesn't jitter. Swing delays the odd 16ths.
- **Patterns are links.** The full patch — knobs, waveform, tempo, swing, and all 16 steps — serializes to the URL hash (with `localStorage` autosave). Copy Link and share.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder statically (e.g. `python -m http.server`). Click **Play** (or press <kbd>Space</kbd>); audio initializes on that first gesture, per Web Audio autoplay rules. No install, no build step.

## Controls

**Grid**
- Click a cell to place a note; click it again to toggle it off.
- Red **Accent** row: louder, brighter, resonant snap.
- Blue **Slide** row: portamento glide into that step.

**Knobs** (drag vertically, scroll, or double-click to center; keyboard-focusable — arrows/Home/End adjust)
- **Tempo, Swing** — groove.
- **Cutoff, Reso, Env-Mod** — the three signature filter controls.
- **Decay, Tune, Drive** — envelope length, pitch, soft-clip overdrive.
- **Squelch** (green macro) — links cutoff + reso + env-mod in one gesture.
- **Volume** — master.

**Transport**
- **Play / Stop**, **Wave** (saw/square).
- **Mutate** — nudges the current pattern's notes, accents, slides, and gates for endless variations.
- **Randomize** — a fresh seeded pattern (minor-pentatonic, so it stays musical).
- **Presets** — Classic Acid, Rolling Bassline, Techno Stab, Deep Squelch.
- **Copy Link** — puts the whole patch in the URL.

**Keyboard**
- <kbd>Space</kbd> play/stop
- <kbd>◀</kbd> / <kbd>▶</kbd> select step (the column highlights)
- <kbd>▲</kbd> / <kbd>▼</kbd> move the selected step's pitch

## How sharing works

State is base64-encoded JSON in the URL hash. Autosave writes it back (debounced) as you tweak, and it's also mirrored to `localStorage`, so reloading restores your last patch. A malformed or truncated link falls back to the Classic Acid preset instead of breaking.

## License

MIT — see [LICENSE](LICENSE).
