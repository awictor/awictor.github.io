# Beatwell

**Drag an interval across the octave and hear — and watch — why some intervals feel smooth and others grind.**

Beatwell is a single-file, zero-dependency WebAudio toy for *sensory dissonance*: the physical "roughness" you feel when two tones' overtones beat against each other. It plots that roughness as a live curve across every interval from unison to the octave — a landscape of **wells**. The deep valleys sit almost exactly on the simple integer ratios (3:2 fifth, 4:3 fourth, 5:4 major third…), so you get an audible, from-scratch derivation of *why consonance exists* — no music theory assumed.

## Why it's cool

Consonance usually gets explained with hand-wavy talk about "simple ratios." Beatwell shows you the mechanism instead: two complex tones, the roughness between every pair of their partials summed up, drawn as a curve you can grab. Then it subverts the whole thing — switch the **timbre** from a harmonic overtone stack to a stretched or bell-like spectrum and the consonance valleys visibly slide off the familiar ratios. That's Sethares' insight rendered in one gesture: consonance is a property of *timbre*, not just number.

## Run it

No build, no dependencies, no network calls.

```
# just open it
open index.html            # macOS
xdg-open index.html        # Linux
start index.html           # Windows

# or serve statically (any static server works)
python3 -m http.server 8000   # then visit http://localhost:8000
```

Click **Play**, then drag the cursor along the curve. Audio needs the click first (browsers require a user gesture to start WebAudio).

## Controls

- **Drag on the canvas** — pick any interval; you hear both tones and their beating instantly.
- **Arrow keys** (canvas focused) — nudge the interval by 0.002; hold **Shift** for a coarser step; **Home/End** jump to unison/octave. Keyboard-accessible.
- **Play** — start/stop additive synthesis of the root tone plus the movable partner.
- **Timbre** — harmonic / stretched (inharmonic) / bell-gamelan / odd-only (clarinet). Reshapes the whole curve; a dashed **ghost** shows the harmonic reference so you can see the valleys move.
- **Partials** (2–12) and **Root pitch** (110–440 Hz) — rebuild the spectrum in real time.
- **Snap to just ratios** — locks the cursor onto the nearest simple ratio.
- **Presets** — one-click configurations, each a full shareable hash.
- **Copy link** — copies the current URL. Everything (root, partials, timbre, interval, snap) lives in the URL hash, so the link *is* the setup.

## The math (~ in brief)

Each tone is a stack of partials with amplitudes `1/k`. For every pair of partials `(f1, f2)` the roughness follows the Plomp–Levelt / Sethares model:

```
d(f1, f2) = a1·a2·( e^(-b1·s·Δf) − e^(-b2·s·Δf) )
s = 0.24 / (0.0207·fmin + 18.96),   b1 = 3.5,   b2 = 5.75,   Δf = |f2 − f1|
```

The curve is the sum of `d` over all partial pairs of the two tones, sampled across ratios 1.0 → 2.1. Those constants are what place the wells on the just ratios; the smoke test confirms the harmonic-timbre minima land on 3:2, 4:3 and 2:1 within a fraction of a cent.

## License

MIT — see [LICENSE](LICENSE).
