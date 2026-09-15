# Gyreloom

**A spirograph orbit sequencer.** Glowing beads ride nested rotating rings and strike a comb of radial trigger spokes — geometry becomes an evolving polyrhythmic melody.

## Why it's cool

Each ring carries a whole number of evenly spaced beads and turns at an integer-ratio speed. Every time a bead sweeps past a spoke it plucks a note whose pitch comes from the ring's octave plus the spoke's scale degree. Because the bead counts and speeds are coprime, the hits interleave into shifting Euclidean-style rhythms that phase against each other and only realign after their least common multiple — so a handful of simple dials produce a long, genuinely musical loop that never feels random. It's locked to pentatonic/minor scales, so it always sounds good.

The entire pattern — ring count, beads per ring, speeds, scale, spoke positions, seed — lives in the URL hash. Any pattern you stumble into is a shareable permalink.

## Run it

No build step, no server, zero dependencies.

```
open index.html      # macOS
start index.html     # Windows
```

Or just double-click `index.html` in any modern browser (Chrome, Firefox, Safari).

Click once anywhere to start audio — browsers block sound until you interact, so the canvas shows a **click to play** prompt until then.

To share a pattern, hit **copy link** and paste it to anyone. Opening the link recreates the exact pattern.

## Controls

| Action | Mouse / keyboard | Touch |
| --- | --- | --- |
| Add a bead to a ring | click the ring | tap the ring |
| Remove a bead | Alt/⌘ + click | double-tap the ring |
| Mute a ring | right-click the ring | long-press the ring |
| Solo a ring | Shift + click | — |
| Change a ring's speed | scroll over the ring | — |
| Re-voice: move a spoke | drag the spoke handle | drag the spoke handle |
| Change scale | number keys `1`–`4` | tap the **scale** chip |
| Play / pause | `Space` | play button |

### Toolbar

- **randomize** — new seed, guaranteed coprime speeds so the loop uses its full LCM period.
- **space wash** — toggle the shared feedback-delay reverb.
- **copy link** — copy the current pattern's permalink to the clipboard.
- **loop length** — master loop period in seconds (longer = slower).
- **gallery chips** — curated starting patterns.

## How the sound is made

Three in-code WebAudio voices, chosen by ring octave, all fed to a shared feedback-delay space wash:

- **Low rings** — soft sine + triangle sub.
- **Mid rings** — detuned-saw plucked string through a fast lowpass-decay envelope.
- **High rings** — glassy FM bell.

Crossings are detected per frame by wrap-counting each ring's angle, with same-pitch dedupe so simultaneous hits fire one clean voice instead of clicking.

## Visuals

Comet-trail beads, spokes that flash and bloom a ripple on each trigger, per-octave hue tinting, and an outer arc that fills toward the loop period and flashes **REALIGN** when the rings snap back into phase.

## License

MIT — see [LICENSE](LICENSE).
