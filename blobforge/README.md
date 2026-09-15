# Blobforge

**Draw any closed loop and it drops into the world as a jiggling, pressure-filled soft-body blob you can poke, sling, slice, and stack.**

Blobforge is a single-file, zero-dependency soft-body physics sandbox. You scribble an outline with the mouse or a finger, let go, and it becomes a living jelly: a verlet ring of point masses stitched with springs and inflated by an ideal-gas pressure model. It squishes, wobbles, bounces off walls and other blobs, and springs back to shape. Grab it and it deforms under your cursor; flick it and it tumbles; pin two edge points and it becomes a trampoline or a gooey bridge.

## Why it's cool

- **Draw-to-simulate.** No shape presets. Scribble a heart, a star, or a wobbly potato and it flops into the tank as a real pressure soft-body.
- **The satisfying-to-poke kind of physics.** Ideal-gas inflation + verlet substepping means blobs genuinely squish and recover instead of faking it with a sprite.
- **Emergent play.** The same primitive becomes a trampoline, a bridge, or a slime creature depending on where you pin and how hard you inflate it.
- **One file, no build.** Everything — markup, CSS, and the whole engine — lives in `index.html`. Open it and it runs.
- **Shareable.** The full scene (seed, gravity, every drawn body and pin) round-trips through the URL hash, so any creation is just a link.

## Run it

No build step, no dependencies, no network calls.

- **Easiest:** double-click `index.html` to open it in any modern browser.
- **Or serve the folder** (nicer for the Copy-link / share flow, since links carry the origin):

  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

  or with Node:

  ```bash
  npx serve .
  ```

## Controls

Pick a tool from the top bar (number keys switch tools), tune physics in the side panel.

| Tool | Key | What it does |
|------|-----|--------------|
| ✏️ Draw | `1` | Draw a closed loop; release to forge a blob |
| ✋ Grab | `2` | Grab the nearest membrane point and sling the blob |
| 🔪 Slice | `3` | Drag a cut line through a blob to split it into two sealed halves |
| 📌 Pin | `4` | Click a membrane point to pin/unpin it (right-drag paints pins) |
| 💥 Pop | `5` | Click a blob to pop it |

| Shortcut | Action |
|----------|--------|
| `Space` | Pause / resume |
| `R` | Reset to the seeded starter scene |
| `C` | Clear all blobs |
| `G` | Flip gravity |

**Side panel**

- **Material** — Jelly / Balloon / Water-bag / Rubber presets (stiffness, pressure, drag, and color in one click).
- **Physics** — Gravity magnitude, Stiffness, Pressure (deflate to a limp bag or over-inflate to a taut balloon), Air drag, Speed.
- **Toys** — Flip-G (invert gravity), Eyes (googly eyes so blobs read as creatures), Weld (fuse blobs that rest against each other).
- **Share** — Copy link (packs the scene into the URL hash), Clip (records a ~6 s WebM of the canvas; click again to stop early).

Touch works too: draw, grab, slice, and pin all respond to a single finger.

## How the physics works

Each blob is a closed ring of point masses integrated with **verlet integration** (position + previous position, no explicit velocity). Points are connected by two spring sets solved Gauss–Seidel style: **perimeter springs** between neighbors and **bending springs** that skip one neighbor for shape stability.

Inflation uses an **area-target (ideal-gas-style) pressure solve**: each step compares the polygon's current signed area to its rest area scaled by the pressure setting, then nudges every point along the centroid direction to push the blob back toward its target "volume." Deflate the pressure and it sags like a bag; crank it and it goes taut.

Stability comes from a **fixed-timestep accumulator** (never the raw `requestAnimationFrame` delta) running **8 substeps per step**, plus per-substep displacement clamps and spring damping so blobs don't explode. Collisions use a **uniform spatial hash** for broadphase, then point-vs-point repulsion with wall friction and restitution — cheap enough to keep many blobs interacting.

Idle blobs "breathe" and wander via a small muscle oscillation driven by a per-body phase, and googly eyes track velocity and gravity so they read as creatures.

## Determinism & the share hash

A seeded [`mulberry32`](https://github.com/bryc/code/blob/master/jshash/PRNG.md) PRNG plus the fixed timestep make the starter menagerie reproducible: the same seed spawns the same scene on any machine.

**Copy link** serializes the scene to `location.hash` as base64url-encoded JSON:

- `s` — seed
- `g` — `[gravity, gravDir]`
- `k` — `[stiffness, pressure, drag×1000, eyesOn, weldOn]`
- `b` — array of bodies, each `{ h: hue, r: restArea, v: [x0,y0,x1,y1,…], p: [pinnedIndices…] }` with coordinates quantized to integers to keep links short

Opening a URL with a hash restores that exact scene. A malformed or hand-edited hash falls back to the seeded scene instead of failing.

## Browser support

Runs on current Chrome, Firefox, Edge, and Safari (desktop and mobile). Clip recording relies on `MediaRecorder` + `canvas.captureStream`; where those aren't available the recorder shows a notice and everything else still works.

## License

MIT — see [LICENSE](LICENSE).
