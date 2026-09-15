# Twine

**A one-tap braid-weaver: ride one of two crossing rails, switch at the twist to thread the gaps.**

Your bead is always magnetized to *one* of two guide-rails that weave down the screen, twisting past each other on a rhythm. A single input — tap, click, or Space — springs the bead across to the other rail. Grab glowing nodes to build a combo multiplier; the rails also carry break-gaps and spikes that end the run on contact. Because the two rails braid over and under each other, the game is a read-ahead puzzle: decide *which* rail to be on and switch right at the twist, not blind flipping.

## Why it's cool

One mechanic, deep skill ceiling. You are not dodging up/down — you are choosing which of two crossing threads to inhabit and timing the switch to the crossing point. It reads instantly and looks hypnotic in motion. Zero dependencies, zero build, one HTML file.

## Features

- **One-input rail toggle** — tap/click/Space snaps the bead between two braiding rails with a springy lerp.
- **Read-ahead braid** — two sinusoidal rails cross on a fixed rhythm, with an upcoming-twist telegraph (pulsing ring) and a safe-rail chevron so you can plan the switch.
- **Combo scoring** — collect nodes to raise a multiplier; break-gaps and spikes are instant death. Threading a gap right after switching off it pays a slow-mo near-miss bonus.
- **Escalating pressure** — scroll speed and hazard density climb the longer you survive (speed is capped so collisions stay fair).
- **Full juice** — bead comet trail, screen-shake on switch, particle bursts, chromatic pulse locked to the twist beat, and a WebAudio arpeggio that climbs as your combo grows.
- **Deterministic & shareable** — a daily seed (or a seed from the URL hash) drives spawning. Your best run is saved to `localStorage` and encoded into the URL as a translucent **ghost** you can race and share head-to-head.
- **Colorblind-friendly cue** — the safe-rail hint pairs color with a directional chevron.
- **Crisp on HiDPI** — the canvas backing store scales to `devicePixelRatio`.

## Run it

No server, no build, no install.

- **Fastest:** double-click `index.html` to open it in any modern browser.
- **Or serve the folder** (recommended if your browser blocks `localStorage`/audio on `file://`):

  ```sh
  # from the twine/ directory, pick one:
  python3 -m http.server 8000
  npx serve .
  ```

  then open <http://localhost:8000>.

## Controls

| Action | Input |
|--------|-------|
| Switch rail | Tap · Click · Space · Up arrow · `W` |
| Restart after a wipeout | Any key · tap · click |

**Goal:** stay on a rail, switch at each twist to line up glowing nodes, and thread the red break-gaps. Chain nodes to raise your combo multiplier. Touch a spike or fall into a gap and the run ends.

## Sharing runs

Set a new best and the URL updates to `#s=<seed>&g=<ghost>`. Copy that URL and send it — whoever opens it plays the exact same seeded layout and races your ghost.

## Tech

Single self-contained `index.html`: seeded `mulberry32` RNG, canvas 2D render loop, two-rail braid generator, spring-based bead physics, node/hazard collision, combo/score, WebAudio blip synth, particle + shake juice, and `localStorage` persistence. No external requests.

## License

MIT — see [LICENSE](LICENSE).
