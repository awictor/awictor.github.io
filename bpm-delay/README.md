# BpmDelay

**BPM → delay time & note duration calculator** — enter a tempo and get millisecond delay times for every note value (straight, dotted, triplet), plus the matching LFO frequency in Hz. One offline HTML file, no signup, no tracking.

👉 **[Open BpmDelay](https://awictor.github.io/bpm-delay/)**

## Features
- Delay/note durations for whole → thirty-second notes
- Straight, dotted (×1.5) and triplet (×2⁄3) columns
- Hz column for syncing LFOs, tremolo, and auto-pan to tempo
- BPM slider + input; dark mode; 100% client-side

## Why
Producers set delay and reverb times, and LFO rates, to match the tempo — but the math (60000 ÷ BPM, dotted, triplet) is tedious to do by hand mid-session. BpmDelay lays out the whole grid instantly and offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`msPerBeat`, `durationMs`, `hz`) are covered by headless tests — the 60000/BPM base, quarter-note = one beat, note-value scaling, dotted and triplet modifiers, the Hz reciprocal, tempo monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
