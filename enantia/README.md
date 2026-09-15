# Enantia

**One hand, two ghosts, a mirror that keeps turning.**

A single-screen arcade score-chaser built on one fresh idea: you steer **two ships with a single input**, but the second ship is a live mirror image of the first. Thread *both* twins through a downward-scrolling gauntlet of gates. The twist is that the **mirror plane itself rotates as you survive** — starting as a simple left/right reflection, then flipping to vertical, then point (180°), then arbitrary diagonal axes — so your muscle memory betrays you exactly when the difficulty climbs.

Zero dependencies. One HTML file. Canvas + WebAudio.

## Why it's cool

Mirror-control dodgers exist. Making the mirror *plane* rotate through horizontal → vertical → point → diagonal reflections mid-run turns a familiar symmetry gimmick into an escalating brain-rewiring challenge. Every gate is checked for solvability before it spawns (and re-checked when the axis flips), so a death is always your read, never the game's fault.

## Features

- **Single-input twin control** — arrows / A–D / drag move ship A; ship B is its live reflection across the current axis.
- **Rotating mirror plane** — the core escalation: horizontal → vertical → point → diagonal → arbitrary seeded axes, telegraphed with a sweeping preview line, a rising audio cue, and a brief slow-mo on the flip.
- **Fairness guarantee** — each gate is validated (and in-flight gates are re-validated on every axis flip) so a single ship-A position always exists that clears both twins.
- **Combo + graze scoring** — double-clean passes grow a multiplier; shaving a gate edge banks a graze bonus at the risk of a crash; a "resonance" double-graze fires a bloom, an arpeggio, and a combo surge.
- **Per-axis palettes** — each mirror mode gets its own HSL color act and background gradient.
- **Deterministic seeds** — every run is reproducible from its `#seed=` URL hash. Hand a friend the exact same gauntlet.
- **Daily challenge** — one shared seed per day (`D`, or the on-screen button).
- **Shareable run card** — on death, a canvas card (seed, score, longest clean streak, combo peak, axes cleared, and a **NEW BEST** badge) you can copy or download.
- **Accessibility** — respects `prefers-reduced-motion` (damps shake, flash, chromatic split, and slow-mo). Fully playable by touch, including all share/daily controls.

## Run it

No build, no server, no dependencies.

- **Double-click `index.html`**, or drag it into any modern browser tab.

For the clipboard share features to copy directly (rather than fall back to a download / manual copy), serve it over `http(s)`/`localhost` instead of `file://`:

```bash
cd enantia
python -m http.server 8000
# then open http://localhost:8000
```

> Note: challenge links point at the current page URL. A `file://` link only opens on the same machine — to share cross-machine, host the page (or just give your friend the **seed** shown on the run card; typing it in reproduces the run).

## Controls

| Input | Action |
|-------|--------|
| `←` / `→`, `A` / `D`, or drag | Steer ship A (twin B mirrors it) |
| Tap / any key | Launch from the menu |
| `R` | Restart |
| `D` | Load the daily-challenge seed (from menu or death screen) |
| `C` | Copy the share card (death screen) |
| `L` | Copy the challenge link |

On touch devices, the death screen shows tappable **Copy card**, **Copy link**, and **Daily** buttons, tapping the card copies it, and the menu has a **Daily challenge** button — no keyboard required.

## Goal

Thread both twins through every gate. A clean pass on both banks your combo; a graze adds heat but risks a crash; missing a gate with either ship ends the run. Survive long enough and the mirror axis shifts — re-wire your reflexes and keep going.

## License

MIT — see [LICENSE](LICENSE).
