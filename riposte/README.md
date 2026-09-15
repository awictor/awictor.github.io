# Riposte

**A one-ring bullet-parry score-chaser: time the deflect, chain the reflections.**

You are a fixed point at the center of the arena. Bullets converge from every
edge. You can't move and you can't shoot — all you have is a short parry arc you
aim around yourself and *flick* at the right instant. Catch a bullet inside the
arc as it crosses the thin parry ring and it slams back outward at speed.

The twist: deflected bullets are lethal to other incoming bullets. One clean
parry can trigger a cascade of chain kills, so a defensive tap becomes an
offensive combo engine.

## Why it's cool

It inverts a bullet-hell. Survival is 100% read-and-flick — arc angle, timing
window, and greed-vs-safety. One ring, one button, instantly legible, with a
high skill ceiling. Nail a bullet *exactly* on the ring for a **Perfect**
(bonus points, white flash, and a beat of bullet-time). Whiff the flick or let a
bullet touch the core and your combo collapses.

## Features

- **Timed radial parry** — aim a short wedge around the core, flick to deflect
  any bullet inside the arc and crossing the ring that frame.
- **Chain reactions** — deflected bullets destroy incoming ones, so one parry
  can cascade into a multi-kill combo.
- **Perfect window** — bullets caught within a few px of the ring score double,
  flash white, and briefly slow time.
- **Combo multiplier** — climbs with consecutive parries and chains, hard-resets
  on a whiffed flick or a core hit.
- **Escalating wave director** — straight shots → spiral fans → zig-zag darts →
  faster mixed volleys, each archetype color-coded with a spawn-edge tell.
- **Seeded, shareable runs** — the URL hash (`#seed=...`) reproduces the exact
  wave sequence. On death the hash updates to `#seed=<seed>:<score>`; hit
  **Copy share link** to send a friend the same waves and your score to beat.
- **Daily Challenge** — open with no seed and you get a deterministic run keyed
  to the UTC date, the same for everyone that day.
- **Juice, zero deps** — screen shake, ring pulse, particle bursts, chromatic
  core flash, and WebAudio-only SFX, all in a single HTML file. Honors
  `prefers-reduced-motion` (shake, flash, and slow-mo are dampened).

## Run it

No build, no dependencies, no network.

```
# just open the file
open index.html            # macOS
xdg-open index.html        # Linux
start index.html           # Windows
```

Or double-click `index.html`. To serve it statically instead:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Controls

| Action | Input |
|--------|-------|
| Aim the arc | Move the mouse · nudge a gamepad stick · drag on touch |
| Parry (flick) | Click · tap (on release) · Space / Enter · any gamepad button |
| Aim 8-way | Arrow keys |
| Restart | `R`, or click / tap outside the Copy pill on the game-over screen |
| Copy share link | Click / tap the **Copy share link** pill (game-over screen) |

On touch, drag to line up the arc and lift your finger to fire — so you can aim
before committing.

## Sharing a run

- Play any run, then on the game-over screen tap **Copy share link**. The link
  encodes the seed and your score (`#seed=<seed>:<score>`).
- Whoever opens it gets the identical wave sequence and sees your score as a
  target to beat.
- Open the page with no hash for the **Daily Challenge** (seeded from today's
  UTC date).

## Tuning

All balance values live as constants at the top of the `<script>` in
`index.html` (ring radius, arc half-width, parry/Perfect tolerances, cooldown,
deflect speed, slow-mo duration) — tweak and reload.

## License

MIT — see [LICENSE](LICENSE).
