# Chordfield

**Walk the Tonnetz. Every triad is a tile, every chord change is a step.**

Chordfield is a single-screen, zero-dependency interactive [Tonnetz](https://en.wikipedia.org/wiki/Tonnetz) — the tonal lattice where the 12 pitch classes tile a hexagonal grid and every major/minor triad is a triangle. You navigate harmony as *space*: click a triangle to hear its chord, then glide to neighbors using the three neo-Riemannian moves (**P**, **L**, **R**), which are exactly the three triangles sharing an edge with the one you're on.

## Why it's cool

The Tonnetz is a diagram composers and math-music folks love but rarely get to *touch*. Chordfield turns it into a place you can walk around: harmony motion becomes physical motion, and the three ways a chord can transform are just the three edges of a triangle. Each move keeps two common tones lit and animates the single voice that changes — so the geometry teaches the voice-leading for free. Discover a progression, hit play, and share it as a link.

All P/L/R adjacencies are derived from the lattice geometry (fifth / major-third / minor-third axes = 7 / 4 / 3 semitones), not hardcoded — so the chords are always correct.

## Features

- **Hexagonal Tonnetz on canvas** — upward triangles are major triads, downward are minor; nodes are labeled with their pitch class. A smoothly tracking camera keeps your current chord centered.
- **Click to sound** any triad through a soft WebAudio synth (detuned triangle oscillators, gentle ADSR, convolution reverb). No samples, no network.
- **Neo-Riemannian navigation** — P (parallel), L (leading-tone exchange), R (relative) via buttons or the P/L/R keys. Each move animates the moving voice while the two common tones stay put.
- **Progression building** — every visited triad joins a glowing trail on the lattice plus a scrollable chip list you can pop, clear, or click to rewind.
- **Playback** — loop the walk as block chords or arpeggio, with a tempo slider and a playhead that highlights the current chord.
- **Key / mode overlay** — pick a tonic and mode (Ionian, Aeolian, Dorian, Mixolydian, Lydian, Phrygian, or off) to shade the diatonic triangles.
- **MIDI export** — download the progression as a standard `.mid` file, written byte-by-byte in-page.
- **Shareable state** — the whole walk (key, mode, and progression) is serialized into the URL hash and restored on load.

## Run it

No build, no install, no server:

```
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or just double-click `index.html`. Any modern browser (Chrome, Firefox, Safari, Edge) works. Audio starts on your first click, per browser autoplay rules.

## Controls

| Action | How |
|---|---|
| Hear a triad | Click its triangle (hover shows the chord name) |
| Add a chord to the walk | Click a different triangle |
| Neo-Riemannian move | `P` / `L` / `R` keys, or the P / L / R buttons |
| Play / stop | `Space`, or the Play button |
| Tempo | Tempo slider |
| Arpeggio vs. block chords | Arp toggle |
| Add 7ths | 7th toggle |
| Set key overlay | Key + mode dropdowns |
| Undo last chord | Undo |
| Reset the walk | Clear |
| Rewind to a chord | Click its chip |
| Export MIDI | ↓ MIDI |
| Share | 🔗 Share (copies a link with the walk encoded in the URL) |

Chordfield respects `prefers-reduced-motion`: with it enabled, the camera snaps instead of easing and the moving-voice tween is skipped.

## License

MIT — see [LICENSE](LICENSE).
