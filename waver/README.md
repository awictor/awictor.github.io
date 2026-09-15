# Waver

A magnetic pendulum that can't make up its mind — drop the bob, then reveal the fractal it's trapped inside.

## Why it's cool

Waver is the classic magnetic-pendulum-over-N-magnets toy: an iron bob on an invisible spring, tugged by several colored magnets, damped by friction. Drop it anywhere and it traces a wandering, chaotic, ever-shrinking path until it finally parks over one magnet.

The twist: hit **Reveal basins** and Waver replays that exact simulation from *every pixel at once*, coloring each starting point by which magnet the bob would eventually settle over. What looks like a simple mechanical toy turns out to hide an infinitely intricate fractal boundary between the basins of attraction. Nudge a magnet or turn a knob and the whole fractal reorganizes.

It's a physics sandbox and a fractal explorer in one canvas — one file, no dependencies, full state in the URL.

## Run it

Open `index.html` in any modern browser. No server, no build, no install:

```
# just double-click the file, or:
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

It renders the basin fractal immediately.

## Controls

| Action | How |
|---|---|
| Drop the bob | **Click** anywhere on the plane — watch the damped-chaotic trail settle over a magnet |
| Reshape the fractal | **Drag** a magnet (cursor turns to a grab hand); the basins morph live and sharpen on release |
| Add / remove magnets | **+ / –** buttons (2–6 magnets) |
| Tune physics | **friction**, **spring**, **pull**, **height** sliders — each reshapes both the trail and the fractal |
| Change colors | **palette** dropdown (turbo / viridis / pastel) |
| Reveal basins | **Reveal basins** button or **R** |
| Clean view (hide UI) | **Clean view** button or **H** (a small "press H to show controls" chip stays visible) |
| Save a screenshot | **Save PNG** button or **P** |

The HUD shows the live bob's energy and which numbered magnet the current path is converging toward. Every magnet is numbered on the plane and in the panel so the readout maps to a specific magnet.

## Sharing

The full configuration — magnet positions, palette, and all physics parameters — is encoded in the URL hash. Copy the URL to reproduce or share any exact setup.

## How it works

- **Physics:** a softened semi-implicit integrator (a small "height" term keeps the pull finite near a magnet) with early-exit capture detection for stability and speed.
- **Basin render:** a coarse block pass fills the canvas fast, then an adaptive edge pass recomputes at full resolution *only* on pixels bordering a basin boundary. Both passes are time-budgeted across animation frames so the UI never locks up, with a progress bar along the bottom. Brightness is shaded by how long the bob took to settle, exposing fine fractal texture.

## License

MIT — see [LICENSE](LICENSE).
