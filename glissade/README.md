# Glissade

**Hear your arrays sort themselves.** Two sorting algorithms race on identical shuffled data, hard-panned left and right, while every comparison and swap pings a tone whose pitch maps to the value being touched. A running sort becomes an audible glissando that collapses from noise into a clean rising sweep at the finish.

Zero dependencies, one file, no build, no network. Open it and press Play.

## Why it's cool

The "sound of sorting" is a whole genre of video, but you usually just watch it. Glissade makes it interactive: pick two algorithms, hit go, and *hear* quicksort's frantic chirping outrun bubble sort's slow warble — in stereo, left ear vs. right ear. Because pitch tracks value, you can literally hear order emerging as scattered tones resolve into a smooth ascending scale. Any race is reproducible from its URL, so a specific matchup is one shareable link.

## Features

- **8 sorts** — bubble, insertion, selection, quicksort, merge, heap, radix (LSD), shell — each written as a resumable step-generator, so playback pauses, resumes, and single-steps cleanly.
- **Sonification** — every compare/swap/write emits a short WebAudio tone; compares tick softly on a triangle wave, swaps/writes hit harder in your chosen timbre, so the two op types separate by ear. A hard 14-voice cap and quick ADSR envelopes keep high-speed runs from clicking.
- **Race mode** — both lanes are driven off one shared clock at matched ops/sec on the same seeded data, drawn in split panes and hard-panned L/R. A banner calls the winner on first finish.
- **Glissando finale** — on completion, each array sweeps left→right playing every bar's pitch in order while bars light green as they verify.
- **Value-mapped color** — bar hue moves with value (and therefore pitch); the active compare/swap indices flash white.
- **Live counters per lane** — comparisons, swaps/writes, array accesses, and running milliseconds (paused time is not counted).
- **5 data distributions** — random, nearly-sorted, reversed, few-unique, and sawtooth, each with a recognizably different soundscape.
- **Shareable state** — the URL hash encodes `{algoA, algoB, N, speed, distribution, seed, scale, timbre}`, so a link reproduces the exact race. Malformed hashes fall back to defaults instead of breaking.
- **Record** — capture the canvas + audio to a downloadable WebM clip (where the browser supports `MediaRecorder`).

## Run it

Open `index.html` in any modern browser (Chrome, Edge, or Firefox). No server, no install.

The **first click on Play** unlocks audio — browsers block sound until a user gesture, so the very first interaction is what arms the tone engine.

You can also open it from `file://` directly. Note that on `file://` the clipboard API is unavailable, so **Copy link** will tell you the shareable URL is in your address bar rather than silently failing.

## Controls

| Action | Mouse | Keyboard |
|--------|-------|----------|
| Play / pause | ▶ Play | `Space` |
| Advance one op per lane | ⏭ Step | `→` or `.` |
| Reset (reshuffle from seed) | ↺ Reset | `R` |
| Mute / unmute | 🔊 Mute | `M` |

Other controls: pick the **Left (A)** and **Right (B)** algorithms, a **distribution**, **size N** (16–512), **speed** (ops/sec), a **seed**, a musical **scale** (chromatic or pentatonic), a **timbre** (sine/triangle/square/sawtooth), and **volume**. **New seed** rolls a fresh shuffle, **Copy link** puts the current race on your clipboard, and **Record** captures a clip. When a race finishes, pressing Play again starts a fresh run.

## How to read a race

- **Left ear = Lane A, right ear = Lane B.** The faster algorithm falls quiet first — that's your winner, confirmed by the banner.
- **Pitch = value.** Low bars are low notes. As a lane sorts, its tones drift from chaos toward a rising scale; the tidy left-to-right sweep at the end is the sorted array being verified.
- **Timbre tells op type.** Soft triangle ticks are comparisons; the punchier tones in your chosen waveform are swaps/writes.
- **Counters make it quantitative.** Watch comparisons and swaps/writes diverge — e.g. selection sort does few writes but many compares, while bubble sort does both in bulk.

## Implementation notes

Everything lives in `index.html`: a Canvas render loop, a WebAudio tone engine with a stereo panner, the eight sort generators, a seeded PRNG (mulberry32), the control UI, and URL-hash serialization. Rendering idles when nothing is animating to avoid needless battery drain, and `prefers-reduced-motion` is honored for the banner and progress transitions.

## License

MIT — see [LICENSE](LICENSE).
