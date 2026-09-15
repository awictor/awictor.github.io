# Swivet

**One key. You orbit a pulsing core. Reverse to survive.**

Swivet is a one-button orbital score-chaser in a single HTML file. You're a spark
locked to a fixed ring around a breathing neon core, always sweeping around it.
Rotating hazard arms scythe across that same ring at different speeds and directions.
Your only move is **reverse** — one key instantly flips your orbital direction so you
thread the gaps and dodge the blades.

## Why it's cool

The whole arcade loop reduces to a single verb: *flip*. Committing to a direction while
blades close in from both sides is instantly readable but never runs out of depth. The
hazard director keeps adding arms and counter-rotating "bait" sweeps as your score climbs,
so it densifies without ever walling you in — a gap is always guaranteed, so every death is
a misread, not a cheap shot. The run pattern is seeded from the URL hash, so a link *is* the
challenge: send it and someone plays the exact same ring you did, racing the ghost of your
best run.

## Run it

No build, no dependencies, no network. Either:

- **Double-click `index.html`** to open it in any modern browser, or
- Serve the folder statically and open it, e.g.:
  ```sh
  python3 -m http.server 8000   # then visit http://localhost:8000
  ```

That's it — one file.

## Controls

| Input | Action |
|-------|--------|
| **Space** / **click** / **tap** | Reverse orbital direction (also starts the game from the title) |
| **R** | Restart |

- Sweep through **embers** on the ring to score and build a combo multiplier — it decays if
  you go too long without a pickup, so tight, aggressive threading pays.
- Near-misses give you bonus points; the closer you shave a blade, the more juice.

## The seed / challenge-link trick

The run's hazard pattern is derived from a seed stored in the URL hash (`#s=...`), using a
seeded RNG so the same seed always produces the same ring — independent of browser or refresh
rate.

- **✦ new seed** rolls a fresh pattern and updates the URL.
- **⟳ copy challenge link** copies the current URL (with your score if you've died) so a friend
  can play the identical ring and beat it.
- Your best run per seed is saved to `localStorage` and replayed as a faint **ghost** spark you
  race on your next attempt at that seed.

## Accessibility

Swivet honors `prefers-reduced-motion`: with it enabled, the camera shake and the strobing
chromatic ring-flash are suppressed, while color, pulse, and combo feedback stay.

## License

MIT — see [LICENSE](LICENSE).
