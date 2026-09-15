# Boomlathe

**An 808 + 303 acid groovebox in one HTML file — every jam is a link.**

Boomlathe is a zero-dependency, single-file WebAudio groovebox in the TR-808 / TB-303
spirit. Every sound is synthesized in code (no samples): punchy 808-style drum voices and
a squelchy, self-oscillation-capable 303-style acid-bass monosynth. Program a step grid,
drop an acid line with real cutoff/resonance/env-mod/accent/slide, chain patterns into a
song, and glue it all with a master filter and soft-clip drive.

## Why it's cool

- **It actually grooves, with no samples and no dependencies.** All drum and bass timbres
  are built live from oscillators, filters, and noise — the whole thing is one `index.html`.
- **Every jam is a URL.** The entire session (patterns, p-locks, knob values, song chain,
  tempo) bit-packs into the URL hash. Copy the link to share the exact groove; open the link
  to load it. No backend, no accounts — a typical groove is ~350 characters.
- **Real acid character.** Tied adjacent bass steps portamento the pitch and hold the filter
  open, reproducing the classic 303 legato squelch, plus Elektron-style per-step cutoff
  parameter locks for patterns that evolve on their own.
- **Bounce to WAV.** One click renders the current loop (or full song chain) offline to a
  downloadable 16-bit PCM `.wav`, reusing the exact same voice functions as live playback.

## Run it

No build, no install.

- **Easiest:** open `index.html` directly in any modern browser (`file://` works).
- **Or serve statically**, e.g.:
  ```sh
  python3 -m http.server 8000
  # then open http://localhost:8000/index.html
  ```

Browsers only start audio after a user gesture, so click a groove chip or press **Space** /
**Play** to begin. Web MIDI (optional) is used automatically if your browser exposes it.

## Controls

**Transport**
- **Space** or **▶ Play** — play/stop
- **Tempo / Swing / Steps (16/32/64) / Drive / Master Cut** — global sliders
- **A / B / C / D** — pattern banks (a dot marks banks that contain data)
- **Song** — play the song chain instead of the single edit pattern
- **● Rec** — arm live-record; QWERTY/MIDI hits are quantized into the current pattern
- **🔗 Copy Groove Link** — copy the shareable URL for the current state
- **💾 Bounce .wav** — render the loop (or song chain, if Song is on) to a WAV file

**Grid — drums**
- Click a step to toggle it
- **Shift**+click = accent
- **Alt**+click = cycle per-step probability (100% → 75% → 50% → 25%)

**Grid — 303 bass**
- Click a step to toggle it
- Scroll an **active** step to change its note (click to enable first, so casual page
  scrolling never edits the lane)
- **Shift**+click = accent · **Alt**+click = slide/tie into the step
- **Ctrl**+scroll on an active step = per-step cutoff parameter lock
- Click any lane name to clear that lane

**303 synth / FX**
- Waveform (saw/square), Cutoff, Resonance, Env Mod, Decay, Accent
- Bass→Delay, Hats→Delay, Bass→Reverb, Reverb Size
- **🎲 Seed Acid Line** generates a fresh seeded bassline; **Clear Pattern** wipes the pattern

**Play live (QWERTY / MIDI)**
- Bass notes: `Q 2 W 3 E R 5 T 6 Y 7 U I 9 O 0 P` (hold **Shift** for slide/tie)
- Drums: `Z` kick · `X` snare · `C` hat · `V` open hat · `B` clap · `N` rim · `M` tom
- A connected MIDI keyboard plays the bass voice automatically

**Song chain**
- `+A/+B/+C/+D` append a pattern to the chain; click a slot to remove it
- Enable **Song** in the transport to play the chain; **Bounce .wav** respects Song mode

## How the share link works

State is serialized with a versioned, bit-packed encoder (nibble-per-step flags, quantized
knob values) into a base64url string stored in `location.hash`. A version byte at the front
allows forward-compatible format changes, and corrupt or truncated hashes degrade gracefully
(values are clamped on decode) instead of breaking audio.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
