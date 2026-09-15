# Spall

**Click a pane. Watch it shatter into physics-driven Voronoi shards.**

Spall is a single-file, zero-dependency fracture sandbox. A procedurally-painted pane fills the screen; strike it anywhere and the impact spawns a cluster of Voronoi seed points — dense at the hit, sparse toward the edges — which are clipped into real polygon cells. Each cell becomes a rigid shard with velocity radiating from the impact, plus gravity, air drag, and angular spin, so the plate cracks and then the fragments peel off and tumble to the floor. Unbroken regions stay solid until you hit them, so you can spider-crack a pane with repeated taps or blow the whole thing apart in one strike.

## Why it's cool

- Real computational geometry, not a sprite trick: cells are actual Voronoi polygons built with **Sutherland-Hodgman half-plane clipping** of the pane against neighboring seeds.
- Two-stage break: cracks radiate from the impact for a few frames, *then* the shards detach — you see the fracture propagate before it gives way.
- Repeated taps accumulate **stress** in a region (with a growing warm glow and strain-web), lowering its fracture threshold until a final tap fails catastrophically.
- Every parameter plus the RNG seed and the full strike log is encoded in the URL hash, so a satisfying shatter is **fully reproducible and shareable** — send a link, get the exact same break.
- It's ~370 lines of vanilla canvas 2D. No build, no framework, no network.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. There is no build step, server, or install.

```
# optional, if you prefer a local server:
python -m http.server 8000   # then visit http://localhost:8000
```

## Controls

- **Click** a pane to strike it.
- **Click-drag** to aim a directional impulse (a dashed arrow shows the aim), then release.
- **Repeated taps** on the same spot build stress until the region shatters.

Panel:

| Control | What it does |
|---|---|
| Material buttons | `glass` / `ceramic` / `obsidian` / `stained` — change palette, shard density, and jaggedness (also rolls a new pane). |
| Density / Force / Gravity / Drag | Tune shard count, impact strength, fall speed, and air resistance. |
| Slow-mo | Toggle slow-motion integration. |
| Reset | Restore the **current** pane (same seed) to intact. |
| New pane | Roll a fresh random seed. |
| Save PNG | Download the current frame as a PNG. |
| Replay ↺ | Re-watch the shatter in place, replayed from the strike log. |
| Record ● | Replay and export the shatter as a WebM video (where the browser supports it). |
| Copy share link | Copy a URL that reproduces this exact material, params, seed, and strike sequence. |

Keyboard: **`h`** hides/shows the control panel (handy for clean screenshots and PNG framing).

## How it works

1. **Seeds.** A strike scatters seed points with a radial density falloff from the impact, so cracks cluster where you hit.
2. **Cells.** For each seed, the pane polygon is clipped by the perpendicular bisector between that seed and its nearest neighbors (half-plane clipping), yielding a real Voronoi cell. Clipping is limited to nearby seeds and guards against zero-area/degenerate cells.
3. **Shards.** Cells within the blast radius detach as rigid bodies (outward velocity + aim + gravity + drag + spin) and settle at a floor line; cells outside it stay as intact fragments you can break later.
4. **State.** Material, sliders, seed, and the strike log (positions, aim, timing) serialize to the URL hash. Loading a hash normalizes the timeline so playback starts at the first strike.

## License

MIT — see [LICENSE](LICENSE).
