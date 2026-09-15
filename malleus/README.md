# Malleus

**Strike physically-modeled resonators — bells, bars, glass, and drumheads — built from decaying modal sinusoids you can see and shape.**

Malleus is a single-file, zero-dependency WebAudio percussion instrument. Every sound is synthesized as a bank of exponentially-decaying sine partials — one per vibrational mode of a real struck object — with per-mode frequency ratio, amplitude, and decay time taken from the physics of the material.

## Why it's cool

You don't just pick a preset and hit a key. You drag across a 2D strike pad where **X sets the pitch** and **Y sets *where* on the resonator you strike it**. The mallet position physically re-weights each mode (`|sin(n·π·pos)|`), so a mode with a node under the mallet barely rings — a single material spans from dark thunk (center strike) to bright ping (edge strike) as you move your hand. Meanwhile a live log-frequency spectrum shows the actual partials lighting up and decaying, so you literally watch the physics you're hearing.

The material presets are real modal data, not EQ curves: bells have inharmonic partials, ideal free bars follow 1 : 2.76 : 5.4, drumheads follow Bessel-mode ratios.

## Features

- **Modal synthesis engine** — each strike spawns a polyphony-capped voice (10 voices, oldest-stolen) of up to ~10 sine oscillators, each with its own frequency ratio, gain, and exponential decay envelope. Oscillators are stopped after their envelope ends to avoid leaks and clicks.
- **2D strike pad** — X = scale-quantized pitch (minor pentatonic, 3 octaves), Y = mallet strike position, which reshapes the timbre by re-weighting each mode.
- **Mallet hardness** — shapes the excitation spectrum and attack time: soft = few low modes with a slow attack, hard = full bright spectrum struck sharply.
- **Six physically-grounded materials** — Bronze Bell, Rosewood Marimba, Wine Glass, Tuned Drumhead, Tubular Chime, Steel Tongue.
- **Material morphing + Forge** — continuously morph between two presets, or hit *Forge* to generate a new stable inharmonic partial set.
- **Live log-frequency spectrum** — real decaying partials rendered via `getFloatFrequencyData`, one draw per animation frame.
- **Inharmonicity, damping, sustain, and reverb** sliders — reshape the physics and add a synthesized-IR convolution space with a feedback-delay bloom.
- **Record → loop sequencer** — capture a free performance (pitch + strike position + hardness per hit) and loop it.
- **Shareable presets** — the full patch (material, morph, all knobs, forged partials, and the recorded sequence) serializes into the URL hash and restores on load.

## Run it

No build, no dependencies. Open the file in any modern browser:

```
# just open it
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# or serve it (any static server works)
python3 -m http.server 8000   # then visit http://localhost:8000
```

Audio unlocks on your first click, drag, or key press (browser autoplay policy) — the visuals render immediately before that.

## Controls

- **Strike pad** — click or drag to play. Left↔right = pitch, top (edge) ↔ bottom (center) = strike position. Drag to re-strike as you move.
- **Keyboard** — `A S D F G H J K L` play pitches across the pad.
- **Materials** — click a material chip to load it; **⚒ Forge** invents a new inharmonic material.
- **Sliders** — Mallet hardness, Inharmonicity, Damping, Sustain/ring, Reverb, and Morph (with a target-material dropdown).
- **● Record** — start/stop capturing hits. **▶ Loop** — play the captured loop (enabled once something is recorded). **Clear** — discard the recording.
- **🔗 Copy shareable link** — copies a URL that restores the exact patch.

## Shareable preset links

Append one of these hashes to the page URL (e.g. `index.html#...`) to load the patch:

**Cathedral Bell** — soft-struck bronze bell drenched in reverb:

```
#%7B%22m%22%3A%22Bronze%20Bell%22%2C%22b%22%3A%22Wine%20Glass%22%2C%22mo%22%3A0%2C%22h%22%3A0.45%2C%22i%22%3A0.3%2C%22d%22%3A0.08%2C%22de%22%3A1.7%2C%22w%22%3A0.78%7D
```

**Dry Hard Marimba** — bright, tight rosewood bar, almost no space:

```
#%7B%22m%22%3A%22Rosewood%20Marimba%22%2C%22b%22%3A%22Steel%20Tongue%22%2C%22mo%22%3A0%2C%22h%22%3A0.95%2C%22i%22%3A0%2C%22d%22%3A0.35%2C%22de%22%3A0.7%2C%22w%22%3A0.08%7D
```

## License

MIT — see [LICENSE](LICENSE).
