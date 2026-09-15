# Deadwax

**Ride the stylus. Dodge the scratches. Don't let the record shatter.**

A single-screen arcade score-chaser that plays out on a spinning vinyl record. You *are* the stylus, pinned to the 6 o'clock line of the disc, riding one of five concentric grooves. The record spins (ever faster), and scratches, dust, and skips are baked into the wax at fixed positions — as the platter rotates they sweep toward your needle. Your only control is radial: hop in or out to be on a clean groove when a defect crosses the line.

## Why it's cool

Almost nothing looks like this. The vinyl theme maps cleanly onto polar coordinates: the grooves are your lanes, the timing pressure *is* the platter's rotation, and the fail state — a record cracking then shattering on your third strike — is exactly as satisfying as it sounds. One input, a readable skill ceiling, zero dependencies, and the whole record is seeded from the URL so any run is shareable and replayable.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder:

```
python3 -m http.server   # then visit http://localhost:8000
```

No build step, no dependencies, no network calls. Everything (render loop, audio, seeded record) is inline in the single HTML file.

## Controls

| Key | Action |
| --- | --- |
| `W` / `↑` | Hop one groove inward |
| `S` / `↓` | Hop one groove outward |
| `Space` / `Enter` | Drop the needle (start) |
| `R` | Restart the current record |
| tap top / bottom half | Hop in / out (touch) |

Tap or press `Space` to start; on game over, `Space` / tap spins a fresh cut.

## How to play

- Every hop changes your groove and builds a **combo** — clean groove-changes and on-beat **note** pickups raise a score multiplier.
- Be on a **clean** groove when a defect reaches the 6 o'clock line:
  - **scratch** (red X) and **skip** (purple bolt) cost you a strike.
  - **dust** (yellow dots) breaks your combo.
  - **note** (a small pinwheel) scores if you're sitting on it.
- **Graze bonus:** sit exactly *one* groove away from a scratch/skip as it passes and you get slow-motion plus a risk bonus. It's the core skill move.
- Three strikes crack, then shatter, the record — game over. RPM ramps up over time, and defect density climbs with it.

## Seeds & sharing

The record's defect layout, center-label art, and bassline are all generated deterministically from the seed in the URL hash (e.g. `index.html#deadwax`). Same seed → same record, every time, so you can hand a link to a friend and race the exact same cut. The **share** button copies the current link; **re-seed** cuts a new random record. Your best run per seed is saved and replays as a faint ghost needle, and your high score persists via `localStorage`.

## Accessibility

Defects use distinct shapes (not just colors), so the layout stays readable without color vision. If your system requests reduced motion (`prefers-reduced-motion`), the screen-flash, shake, and shatter jump are automatically damped.

## License

MIT — see [LICENSE](LICENSE).
