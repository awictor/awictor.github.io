# Scree

**A gravity-fed music box — drop marbles down a tuned peg field and let physics play the tune.**

Scree is a physics-driven generative instrument in a single HTML file. Marbles fall through a hexagonal lattice of pegs under gravity; every marble-vs-peg collision fires a synthesized "ping" whose pitch is set by the peg's position on a musical scale, whose brightness and decay track impact speed, and whose stereo pan follows the marble across the field. Nothing is step-sequenced — **the timing is the physics**. Change gravity, bounciness, spawn rate or peg spacing and the rhythm and density reshape live. A Galton board turned into a self-playing kalimba.

## Why it's cool

You set the terrain and the gravity, then watch music fall out of it. Because the collision stream *is* the sequencer, the piece is different every pour but always in key — endlessly fiddle-able, and genuinely fun to watch and listen to.

## Features

- **Physics is the sequencer** — real-time 2D marble physics (gravity, wall/peg elastic collisions, restitution, a removal floor). Each collision triggers a note; there is no lookahead scheduler.
- **Synthesized mallet voice** — stacked decaying sine partials + a touch of FM shimmer + a noise-transient click. Impact velocity scales amplitude, brightness (partial count) and decay.
- **Scale-quantized pitch** — peg row/column maps onto a selectable scale (pentatonic minor, major, dorian, whole-tone, hirajoshi) with root-note and octave-span controls, so every cascade stays musical.
- **Stereo space** — pan tracks marble x-position; a feedback-delay + shimmer reverb send adds depth. A soft-clip waveshaper and a limiter keep dense cascades from clipping.
- **Carve your own terrain** — click or drag on the canvas to toggle individual pegs on/off and sculpt melodic paths. Funnel and Staircase shape helpers included.
- **5 presets** — Rainstorm, Music Box, Avalanche, Glass, Sparse (plus a Funnel preset).
- **Shareable state** — the full setup (physics, scale/root/octaves, seed, and your painted peg mask) serializes into the URL hash. Copy the link to reshare an exact field. A seeded spawn jitter makes pours reproducible-but-organic.
- **Record to WAV** — one-click stereo capture of the master bus, downloaded as a real 16-bit PCM `.wav`. The button shows elapsed time while recording.
- **Responsive & crisp** — the canvas tracks its container at device-pixel-ratio, so pegs stay circular and text stays sharp on any window size or HiDPI display.
- **Respects `prefers-reduced-motion`** — ripple rings and marble trails are suppressed when the OS requests reduced motion.
- **Zero dependencies** — one self-contained `index.html`, pure WebAudio + Canvas. No build step, no server, no network calls.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into Chrome, Firefox, or Edge. No server or build step required.

Audio starts on your first click of **Play**, **Pour**, or **Record** (browsers require a user gesture before playing sound).

## Controls & usage

| Control | What it does |
|---|---|
| **Play / Pause** | Start/stop the continuous spawn + simulation. |
| **Pour** | Drop a one-shot burst of marbles (seeded, so it's repeatable). |
| **Clear** | Remove all marbles currently in the field. |
| **Scale / Root / Octave span** | Choose the scale, its root note, and how many octaves the pegs span. |
| **Gravity / Bounce / Spawn / Marble size** | Reshape the rhythm and density in real time. |
| **Peg rows / Peg spacing** | Rebuild the lattice geometry (your painted on/off mask is preserved). |
| **Note decay / Reverb mix** | Shape the timbre and space of each ping. |
| **Presets** | Rainstorm, Music Box, Avalanche, Glass, Sparse, Funnel. |
| **All pegs on / Staircase** | Reset the field, or lay down a staircase pattern. |
| **Copy share link** | Serialize the current state into the URL and copy it to the clipboard. |
| **Record WAV** | Toggle stereo recording; stopping downloads a `.wav`. |

**Carving paths:** click or drag on empty canvas to toggle pegs. Turning pegs off opens channels that funnel marbles into specific note clusters — this is where the composing happens. Pitch rises left→right; brightness and decay follow impact speed; pan follows horizontal position.

## Notes

- The recording tap uses the deprecated `ScriptProcessorNode` deliberately — it needs no separate module file, which keeps Scree a true single-file, zero-build, `file://`-runnable page. If browsers ever drop it, migrate the tap to an `AudioWorkletNode`.

## License

MIT — see [LICENSE](LICENSE).
