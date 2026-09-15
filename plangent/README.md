# Plangent

A canvas of plucked strings that ring for each other — Karplus-Strong physical modeling with sympathetic resonance, in one file.

## Why it's cool

Sympathetic resonance is the thing that makes real acoustic instruments feel alive — pluck one string on a sitar or piano and its undamped neighbors quietly bloom on their own. Almost nobody lets you *play* with that idea. Plangent does: pluck one string and watch three others across the rack come to life because they're a fifth and an octave away, each glowing and vibrating with its own damped standing wave. It's real Karplus-Strong synthesis (a filtered, decaying delay line — a genuine plucked-string timbre, not a sample) plus a coupling engine, all in one dependency-free HTML file.

## Run

No build, no dependencies, no network. Either:

- **Double-click `index.html`** to open it in any modern browser, or
- Serve it statically: `python3 -m http.server` then open `http://localhost:8000`.

Audio starts on your first interaction (browsers require a user gesture). Click a preset to hear it immediately.

## How it works

- **Karplus-Strong strings.** On each pluck, a short noise burst is fed through a tuned, low-pass-damped delay line and rendered offline into an `AudioBuffer`, then played. The result is an authentic decaying twang whose pitch is the delay length and whose brightness/decay track the controls.
- **Sympathetic resonance.** When you pluck string A, every other string B is also excited by a weight derived from the harmonic-interval overlap between their pitches. Unisons, octaves, fifths, and thirds ring loudest; dissonant intervals gate to silence. Turn *coupling* to 0 for isolated notes, or up for a shimmering drone.
- **Live visuals.** Each ringing string draws a damped standing wave whose overtone shape and glow reflect how hard it was driven. Faint arcs (the "resonance web") trace from the plucked string to each neighbor it woke, with opacity proportional to coupling strength.
- **Shareable patches.** The full state (scale, per-string tuning, decay, brightness, coupling) is serialized into the URL hash, so any patch is just a link — copy it with **share** or from the address bar.

## Controls

| Control | What it does |
|---|---|
| **Drag / click** across the rack | Pluck strings (a drag glissandos across them) |
| **Keys** `q w e r t y u i o p [ ]` | Pluck the 12 strings left-to-right |
| **Shift-drag** a string up/down | Retune it (±7 semitones); release commits it to the shareable link |
| **scale** | Switch the whole rack: just intonation, equal-tempered major/minor, or pentatonic |
| **decay** | String decay time (how long notes ring) |
| **bright** | Pluck brightness (excitation + loop-filter tone) |
| **coupling** | Sympathetic-resonance strength (0 = isolated notes, high = drone) |
| **presets** | Curated patches (Sitar Drone / Piano / JI Shimmer / Penta Pluck); clicking one fires a short demo arpeggio so the resonance is instantly audible |
| **bow / hold** | Toggle drone mode: plucked strings stay held and re-excite themselves for a sustained pad |
| **record** | Capture the live mix (dry + reverb) and download it as a `.wav` |
| **share** | Copy a link to the current patch to the clipboard |

## Accessibility notes

The viewport allows pinch-zoom, and the animation honors `prefers-reduced-motion` (glow and pulsing are damped while functional pluck feedback is kept). Recording is feature-detected and hidden where the browser can't support it.

## License

MIT — see [LICENSE](LICENSE).
