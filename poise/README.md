# Poise

**A magnetic-pendulum basin-of-attraction fractal explorer — grab the magnets and watch the fractal reorganize in real time.**

Poise renders the chaotic basins of a friction-damped pendulum swinging over a field of point magnets. Every pixel is one release point: the simulation integrates a tiny pendulum from there and colors the pixel by which magnet it finally settles on, shaded by how long it took to come to rest. The result is a shimmering, infinitely intricate fractal — and it recomputes live as you drag magnets around and retune the physics.

## Why it's cool

Basin-of-attraction fractals are gorgeous and instantly legible ("this pixel = where the pendulum ends up"), yet almost nobody ships an *interactive* one where you can grab the magnets and see the boundaries reshuffle. Click anywhere to drop a real pendulum and watch its glowing, decaying spiral thread through the very basins it helped define — the abstract map and the concrete swing, side by side. It's deterministic, so any image you make is fully reproducible from its settings alone.

## The physics

Each release point is integrated with a semi-implicit (Euler–Cromer) step. The pendulum bob feels:

- an inverse-cube pull toward each magnet, softened by a drop-height term so it never blows up directly over a magnet,
- a linear center pull (gravity / restoring spring toward the origin), and
- linear friction that bleeds off energy until the bob settles.

When the bob's speed and distance-to-nearest-magnet both fall below threshold, that magnet wins the pixel. The pixel's brightness encodes settle time, so basin boundaries — where neighboring release points diverge to different magnets — light up as fractal filigree.

## Run it

No build, no server, no dependencies, no network. Open `index.html` in any modern browser:

- **Double-click** `index.html`, or drag it into a browser tab.
- (Optional) serve it — `python -m http.server` then visit `http://localhost:8000/index.html` — if you want the whole URL, not just the `#hash`, to be shareable across machines.

## Controls

| Action | How |
|---|---|
| Move a magnet | Drag its glowing disc |
| Add a magnet (up to 6) | Shift-click empty canvas, or **+ Magnet** |
| Remove a magnet (down to 2) | Double-click a magnet, or **– Magnet** |
| Release a live pendulum | Click empty space — watch the bob spiral and settle |
| Retune physics | Sliders: magnet strength, center pull, friction, drop height, integration step |
| Resolution / quality | Slider (160–440) — higher = sharper, slower |
| Load a look | Click a preset thumbnail (Trefoil, Four-Fold, Chaos Ring, Duet, Hexad, Asymm) |
| Export PNG | **Export PNG** at 1×/2×/3× supersample; tick **trace path** to bake in the last released trajectory |
| Reset | Back to the Trefoil preset |

Rendering is progressive (coarse-to-fine, 8→4→2→1 px) so the UI stays responsive while you drag; once idle, a boundary-only supersample pass sharpens the edges.

## Share links

Poise is fully deterministic: the same configuration always produces the same image. The entire state — five physics parameters, the resolution, and every magnet position — is serialized into the URL's `#hash` fragment. The hash format is:

```
#STR=<strength>&CENTER=<center-pull>&FRIC=<friction>&H=<drop-height>&DT=<step>&Q=<resolution>&M=<x,y>_<x,y>_...
```

To share an exact image, copy the trailing `#...` fragment and append it to wherever your recipient loads Poise. (If you served the file over http(s), the whole URL is portable as-is. When opened via `file://`, only the `#hash` fragment is meaningful — the `file:///C:/...` path is local to your machine.)

## License

MIT — see [LICENSE](LICENSE).
