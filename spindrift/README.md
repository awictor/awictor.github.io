# Spindrift

A pocket particle-fluid you can tilt, stir, and morph from splashy water to wobbly slime — one HTML file, zero dependencies.

## Why it's cool

Water and slime are the *same* solver at different points in parameter space. Drag one slider and a splashing puddle stiffens into a quivering blob that holds its shape and slowly slumps back down. Grab the gravity dial and the liquid pours and sloshes against the jar walls like it's a real object in your hand. It's the [Clavet (2005)](#physics) double-density relaxation fluid — real published physics — squeezed into a single dependency-free page rendered as glowing, speed-tinted metaballs.

## Run it

Open `index.html` in any modern browser. Double-click the file, or serve the folder and visit it:

```sh
# either just open the file...
open index.html          # macOS
start index.html         # Windows

# ...or serve it (needed for the phone Tilt feature — see below)
python3 -m http.server 8000   # then visit http://localhost:8000
```

No build step, no install, no network calls.

## Controls

| Action | Gesture |
|---|---|
| Add liquid | Tap / click an empty spot |
| Stir & fling | Drag across the fluid |
| Remove liquid | Right-click, or long-press (touch) |
| Tip & pour | Drag the **gravity dial** (bottom-left) |
| Add a peg | **+ Peg**, then drag it anywhere |
| Remove a peg | Double-click it |
| Reset the scene | **Reset** (restores Water + 480 drops, clears pegs) |
| Share the scene | **Share** (copies the current URL to your clipboard) |
| Record a clip | **● Clip** to start, **■ Stop** to download a `.webm`/`.mp4` |
| Tilt to slosh (phone) | **Tilt: motion** — see notes below |

The three sliders morph the **same** particles:

- **Viscosity** — internal drag. Low = splashy water, high = slow honey.
- **Elasticity** — spring bonds between neighbors. High = jiggly, shape-holding slime.
- **Plasticity** — how fast those bonds forget their rest length and let the blob relax back into a puddle.

## Presets

| Preset | Feel | Viscosity / Elasticity / Plasticity |
|---|---|---|
| **Water** | thin, splashy | 0.14 / 0.00 / 0.92 |
| **Honey** | slow, syrupy | 0.78 / 0.16 / 0.86 |
| **Slime** | wobbly, shape-holding | 0.42 / 0.82 / 0.12 |
| **Mercury** | dense, metallic sheen | 0.10 / 0.06 / 0.90 |

Moving a slider by hand keeps the fluid but deselects the preset chip, since you've left the preset.

## Shareable links

The full scene round-trips through the URL hash, so any state you land on is a link. Hit **Share** to copy it. Hash keys:

```
#p=slime&n=480&gx=0.000&gy=1.000&v=0.42&e=0.82&l=0.12&o=0.50,0.40,26;0.70,0.55,30
```

| Key | Meaning |
|---|---|
| `p` | preset name |
| `n` | particle count (0–720) |
| `gx`, `gy` | gravity vector, as fractions of default gravity |
| `v`, `e`, `l` | viscosity / elasticity / plasticity |
| `o` | pegs, as `x,y,radius` triples (x/y are fractions of the viewport), `;`-separated |

## Physics

Spindrift implements Simon Clavet, Philippe Beaudoin & Pierre Poulin, *"Particle-based Viscoelastic Fluid Simulation"* (SCA 2005):

- **Double-density relaxation** for incompressibility — each particle accumulates a density and a *near*-density from its neighbors, and the resulting pressure and near-pressure push overlapping particles apart. The near term is clamped for stability.
- **Viscoelastic springs** between close neighbors give elasticity; their rest length creeps under a plastic yield rule so shapes slowly relax. Orphaned springs are pruned each step so the bond map can't grow unbounded.
- A **spatial-hash grid** keeps neighbor search near-linear; the count is capped (720) and the loop runs on a fixed 16 ms substep for stable, ~60fps behavior.

Rendering is cheap: additive radial-gradient blobs tinted by particle speed (calm → hot), pushed through an SVG goo filter for the metaball isosurface, plus a per-preset specular sheen. No marching squares.

## Browser notes

- **Goo isosurface** uses a `url()` reference in the 2D-canvas `filter`. It works in Chrome, Edge, Firefox, and Safari 16.4+. On older Safari the filter is ignored and the fluid renders as soft additive blobs (no merged surface) — it still runs, it just looks less gooey.
- **Tilt** needs a device with motion sensors (phone/tablet) *and* a secure context. Opened from `file://` or plain `http://` the button reads **Tilt: needs https** / **Tilt: n/a** and stays disabled — serve the page over HTTPS (or `localhost`) on a phone to enable it. iOS additionally prompts for motion permission on first tap.
- **Clip** needs `MediaRecorder` + `canvas.captureStream`. Where they're missing the button reads **Clip n/a**. Output is WebM where supported, otherwise MP4.

## License

MIT — see [LICENSE](LICENSE).
