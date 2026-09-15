# Whiptail

**Steer the comet, whip its tail through the gems, keep everything clear of the mines.**

A one-screen arcade score-chaser built around a single inverted-control twist: you fly a
constant-speed comet and steer only left/right — but you don't score with the head. You score
by whipping the comet's long, lagging tail across floating gems. The tail trails the head with
real momentum, so the only way to sweep it wide through a cluster is to carve a hard turn. Scoring
becomes a matter of reading where your tail *will* be, not where you are.

## Why it's cool

The whole game fits in one sentence, yet the skill ceiling is deep. Because mines are lethal to
*both* the head and the tail, every aggressive combo arc flirts with self-collision — you learn to
pre-load turns so the tail lashes exactly through a gem cluster while threading the mines. No
slingshot, no wall-jump, no lane-dodge; it's a genuinely different control feel. And it's a single
self-contained HTML file: no build, no dependencies, no network.

## Features

- **Momentum tail** — a 42-segment Verlet chain that whips outward on sharp turns.
- **Inverted scoring** — only the trailing tail collects gems, so hard carving arcs are how you score.
- **Combo multiplier** — climbs as the tail sweeps multiple gems in one arc, decays after ~1.6s idle
  (with an on-screen timer bar).
- **Bullet-time reward** — when the tail whips dangerously close to the head mid-combo, time slows and
  the screen gets a chromatic pulse.
- **Escalating waves** — more gems, faster/denser mines, and a slowly shrinking playfield ring.
- **Juice** — gem-burst particles, screen shake, a tail that shifts cool→hot with combo, WebAudio blips.
- **Ghost racer** — your best run for a seed is recorded and replayed as a faint ghost comet to race.
- **Shareable seeds** — the `#hash` in the URL seeds the gem/mine layout, so a copied link reproduces
  the exact run for a fair race. Copy link / copy image straight from the end card.
- **Accessibility** — Okabe-Ito colorblind-safe palette toggle (gems and mines also differ by shape),
  plus screen-shake and ghost toggles. All settings persist.
- **Persistent high score** and one-key restart.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into Chrome, Edge, or Firefox.
No build step, no server, zero dependencies.

## Controls

| Action  | Keys                                   |
|---------|----------------------------------------|
| Steer   | `←` / `→` or `A` / `D` (touch: tap the left/right half of the screen) |
| Restart | `R` or `Space`                         |

On your first run, a short overlay explains the tail-scoring twist; press left or right to begin.

## Sharing a run

The URL hash is the seed. Copy the address bar (or hit **Copy link** on the end card) and whoever
opens it gets the identical gem and mine layout — same run, fair comparison. **Copy image** grabs a
PNG of your end card (or downloads it if the clipboard image API isn't available).

## License

MIT — see [LICENSE](LICENSE).
