# Gloaming

**Snake, but you can't see your own body.** A single-screen arcade game played almost entirely in the dark.

You pilot a bioluminescent serpent whose head casts a small pool of light. The arena, the walls, and — critically — your own coiled body are invisible beyond that radius. Distant pellets shimmer faintly like far-off lanterns so you can orient toward food, but the moment your tail leaves the light it vanishes into black. Survival becomes a memory game layered on top of reflex: remember where your coils lie, or loop straight back into them.

## Why it's cool

The most familiar arcade game on the planet, rebuilt around one tight idea — you can't see yourself. That turns pure reflex Snake into a tense memory-plus-reflex experience. It's instantly legible ("Snake, but dark"), and every run is seeded: the seed lives in the URL hash, so any run is reproducible and shareable as a head-to-head challenge ("beat my seed").

Zero dependencies, zero build step, zero network calls. The whole thing is one ~400-line HTML file.

## Features

- **Radial light mask** — a soft glow around the head reveals the grid; everything past the radius is pure black, including your own body. Rendered with a canvas radial-gradient composited over a dark arena.
- **Lantern-oil economy** — your light shrinks a little with every move and refuels when you eat, tracked on an oil meter. Eating flares the light outward for a heartbeat ("a gulp of light") before it fades.
- **Distant-pellet glow** — the current food shows as a dim halo you can steer toward, giving direction without revealing the board.
- **Memory ping** — spend one of three regenerating charges to strobe your whole outline for a moment and re-orient when panic sets in.
- **Seeded runs** — a tiny mulberry32 RNG drives pellet placement; the seed is encoded in the URL hash, so runs are reproducible and shareable. Click the seed URL on the game-over screen to copy it.
- **Daily challenge** — a shared UTC seed with its own high score. Same board for everyone that day.
- **Afterglow ghost** — a purple ribbon replays your best run on the same seed so you can race yourself.
- **WebAudio sixth-sense** — a low drone swells and pans stereo toward your nearest unseen coil as you approach it, plus a rising chime on eat and a death sweep. (Silently skipped if audio is unavailable.)
- **Escalating speed**, faint glowing wall borders, score + `localStorage` best, screen-shake and particle burst on death, mobile swipe/tap controls, and full `prefers-reduced-motion` support.

## Run it

No install, no build. Open the file in any modern browser:

```
# just double-click index.html, or:
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or serve it statically (handy so `localStorage` and clean share URLs behave):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls

| Input | Action |
|-------|--------|
| Arrow keys / WASD | Steer |
| Space | Memory ping (strobe your outline) |
| R | Restart |
| Any key / Enter | Begin from the intro or game-over screen |
| Swipe (touch) | Steer |
| Tap (touch) | Memory ping |

The game stays paused on the intro screen until you make your first move, so take a second to read.

## Sharing a run

- Every run's seed is written to the URL hash as `#s=<seed>`. Copy the URL (or click the "beat my seed" line on game over) and send it — the recipient gets the exact same pellet sequence.
- Add `#daily` to the URL to load the current UTC daily challenge.

## License

MIT © Alex Wictor
