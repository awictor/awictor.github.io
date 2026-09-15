# Foldover

**Watch a spinning wheel run backwards — and finally understand why.** An interactive aliasing & Nyquist explainer in a single HTML file.

## Why it's cool

Everyone has seen the "wagon-wheel effect": a spoked wheel on film appears to slow, freeze, or spin backwards. Almost nobody can explain it precisely. Foldover shows the intuition and the rigor on one screen, in perfect sync:

- **The real motion** — a wheel spinning at the true frequency, and its true sine wave.
- **The samples** — a strobe grabs discrete snapshots at the sample rate you set.
- **The alias** — the lower-frequency signal those samples actually reconstruct. As the true frequency crosses the Nyquist line (`fs/2`), the reconstructed wheel visibly slows, stops, and reverses.

A companion **fold diagram** renders the frequency axis literally folding at Nyquist like an accordion, mapping the true frequency onto its alias so you *see* where the phantom motion comes from — with the fold formula shown live.

Drag two sliders and the whole system re-derives instantly. Every configuration is captured in the URL hash, so any state is one link away.

## Run it

Zero dependencies, no build step, no network calls.

```
Open index.html in any modern browser — double-click it, or drag it into a tab.
```

Optionally append a preset hash, e.g. `index.html#f=9&fs=10&spd=0.2` for the classic reversal.

## Controls

| Control | What it does |
|---|---|
| **signal freq** slider | The true frequency of the wheel/signal, in Hz. Soft-snaps to critical (`fs/2`). |
| **sample rate** slider | Strobe / sampling rate in Hz. The `fs/2` marker shows the Nyquist limit. |
| **time speed** slider | Animation playback speed (does not affect the math). |
| **❚❚ pause / ▶ play** | Freeze or resume the animation. `Space` toggles it too. |
| **↗ sweep** | Auto-ramp the signal frequency up past Nyquist and back for a hands-free deceleration/reversal demo. |
| **⊓ hold** | Overlay the zero-order-hold staircase reconstruction on the time strip. |
| **♪ sound** | Play the true vs. alias pitch as two oscillators (starts muted; opt-in WebAudio). |
| **⧉ copy link** | Copy a shareable URL that restores the exact current state. |
| **presets** | Jump to classic cases: faithful, critically sampled, reversal, standstill, strobe-matched. |

Keyboard: sliders and buttons are focusable with a visible focus ring; presets respond to `Enter`/`Space`. Respects `prefers-reduced-motion` by starting paused.

## The concept in three sentences

A continuous signal sampled at rate `fs` can only be faithfully reconstructed if its frequency is below the Nyquist limit `fs/2`. Above that, the frequency "folds" back across Nyquist onto a lower **alias**: `f_alias = |f − round(f/fs)·fs|`. The sign of the residual sets the *direction* of apparent rotation — which is why the wheel can appear to spin backwards.

## Hash parameters

| Key | Meaning | Range |
|---|---|---|
| `f`   | signal frequency (Hz) | 0.1–20 |
| `fs`  | sample rate (Hz)      | 0.4–20 |
| `spd` | animation speed       | 0.02–0.6 |
| `zoh` | zero-order-hold overlay | `0` / `1` |

Example: `#f=12&fs=6&spd=0.25&zoh=1`

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
