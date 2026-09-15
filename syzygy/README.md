# Syzygy

**A single-file WebAudio polymeter sequencer where concentric Euclidean rings of coprime length drift out of phase and only realign at the syzygy.**

Five tracks are drawn as concentric rings, each with its **own** loop length (say 3, 4, 5, 7, 8 steps). One radial playhead sweeps at the shared tempo, striking each ring's slots as it passes — but because the rings hold different numbers of steps, they precess against one another and the composite pattern never repeats until every ring lands on step 0 together: the *syzygy*, at LCM(lengths) steps away.

## Why it's cool

It makes an abstract math fact audible and visible at once. Coprime loop lengths (3, 4, 5, 7…) produce a groove that stretches for hundreds of beats before it repeats, and you can literally watch the rings precess and hear the melody reshuffle until they slam back into unison. Each ring's hits are placed by a Euclidean (Bjorklund) fill so *k* pulses spread as evenly as possible over its length, and each ring is tuned to a degree of a shared scale — so the drifting rhythm is also an evolving melody. It's a toy, a teaching tool for polymeter and Euclidean rhythm, and a genuinely usable generative sequencer. No build, no dependencies, no network.

## Run it

Open `index.html` in any modern browser:

- **Double-click** the file, or
- Serve the folder and open it, e.g. `python3 -m http.server` then visit `http://localhost:8000`.

Click **Play** (or press **Space**) to start audio — WebAudio requires a user gesture, so nothing plays until you do.

> Tip: the **Share** button copies a link to your exact patch. Copying to the clipboard only works over `http(s)://` (a secure context). If you opened the file via `file://`, Share falls back to a prompt with the link so you can copy it manually — serve the folder over http for one-click copy.

## Controls

**Transport**
- **Play / Pause** (or **Space**) — pausing keeps the accumulated drift position; resuming continues from where you left off.
- **⏮** — stop and rewind to step 0.
- **Tempo** — BPM. Scroll the stepper or press-and-hold to repeat; **Shift** = ±10.
- **Root / Scale** — the shared root note and scale (major / minor / pentatonic / dorian) every ring is pitched to.
- **FX send** — global reverb + delay amount.

**Per ring**
- **M** — mute this ring. **S** — solo it (silences the others). You can also **click a ring on the stage** to solo it.
- **len** — steps in this ring's loop (2–16). Coprime lengths drift the longest.
- **fill** — Euclidean pulses spread as evenly as possible across the steps.
- **rot** — rotate the pattern around the ring.
- **pitch** — scale degree this ring plays.
- **tone / drum** — pitched synth voice vs. a percussive noise hit (good for anchoring a downbeat).
- **wave** — oscillator shape for the tone voice.

**Composition helpers**
- **Maximize drift** — auto-picks pairwise-coprime lengths `[16, 15, 13, 11, 7]` (LCM = 240240 steps) for the longest possible repeat period.
- **Syzygy meter** — shows the LCM of the active ring lengths as "next alignment in N steps / beats / bars" with a progress bar, and a full-screen bloom the moment every ring hits step 0 together.
- **Presets** — six curated one-click grooves. Every patch (tempo, root, scale, and each ring's length / fill / rotate / pitch / wave / timbre / mute / solo) round-trips through the URL hash, so any groove you find is a shareable link.

## Accessibility

Keyboard-focusable controls with visible focus rings, hover tooltips on every control, and `prefers-reduced-motion` support (the full-screen bloom and ripples are suppressed for motion-sensitive users). The layout stacks on narrow viewports.

## How it works

- **Timing** — a Web Audio lookahead scheduler (25 ms tick, ~100 ms schedule-ahead) fires notes at sample-accurate times; visuals derive smoothly from the audio clock via `requestAnimationFrame`, so the pulse stays tight.
- **Rhythm** — Bjorklund's algorithm generates each ring's Euclidean pattern from (k pulses, n steps), then rotates it.
- **Alignment** — the repeat period is LCM of the active ring lengths; the bloom fires on `step % period === 0`.

Everything lives in one ~450-line `index.html` — inline CSS and JS, zero dependencies.

## License

MIT © Alex Wictor
