# Meristem

**A differential-growth lab that grows coral, brains, and labyrinths from a single seed line — live in your browser, zero install.**

Meristem starts with a small loop of points and lets it self-organize, one frame at a time. Every node is pulled toward its neighbors (surface tension), pushed away from any other node that drifts too close (repulsion), and nudged by a whisper of seeded noise. Whenever an edge stretches past a threshold, a new node is spliced in — so the curve is forced to buckle, crowd, and fold in on itself, filling the canvas with dense, organic, never-self-intersecting meander. It's the same process behind brain-coral folds, fingerprint whorls, and cactus ridges.

## Why it's cool

- **Growth by geometry, not pixels.** No particles, no reaction-diffusion, no flow field — just a polyline that can't stop folding. It genuinely looks different from everything else in the gen-art drawer.
- **Deterministic yet alive.** A seeded PRNG means the same seed + parameters always regrow the *exact* same specimen, pixel for pixel — but it never looks the same twice as you turn the dials.
- **Reproducible & shareable.** Every knob, the seed, and any field points you place are encoded into the URL. Copy the link, send it, regrow the identical piece.
- **Fast.** A uniform spatial-hash grid keeps neighbor lookups cheap, so it stays smooth into the thousands of nodes where a naive O(n²) approach would die.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a window. No server, no build step, no dependencies, no network. Everything (engine, UI, export) is inline in one file.

> Note: the "Copy link" button uses the clipboard API, which browsers only expose in a secure context. Opened directly from disk (`file://`) it falls back to a manual copy prompt — that's expected, not a bug.

## Controls

**Gallery** — one-click presets (brain coral, dual loop, spiky urchin, tight cerebral, loose seaweed) that jump straight to a striking configuration.

**Playback**
- **Pause / Play** — stop or resume growth. The button glows when the sim is running. Once a specimen reaches its node budget it settles and auto-pauses (HUD reads `grown`); pressing Play then regrows a fresh one from the seed.
- **Step** — advance a single generation.
- **Reset** — regrow the current seed + parameters from scratch.

**Seed & form**
- **Shape** — starting form: `ring`, `line segment` (open strand), `polygon`, or `dual loop`.
- **Palette** — brain coral, bioluminescent, ink on rice paper, magma vein.
- **Style** — `curvature + age` gradient, `ridge` (embossed 3-D look), or `filled silhouette`.
- **New seed** — roll a fresh random seed (shown live in the HUD).
- **bounded** — keep growth softly contained inside the canvas frame.

**Growth parameters** — attraction, repel radius, repel force, edge-split length, jitter, speed, and node budget. Tune these to move between tight cerebral folds, loose seaweed drift, and spiky urchin ridges.

**Field editing** — pick `attract` or `repel`, then click the canvas to drop points the curve bends toward or away from. Right-click a point to delete it. The **Radius** and **Strength** sliders control newly placed points, and each point's radius/strength is saved in the shareable link. **Clear fields** removes them all; **Copy link** copies the shareable URL.

**Export**
- **PNG frame** — save the current frame at display resolution.
- **Record clip** — regrow a fresh specimen from the seed and save the whole timelapse as a video (WebM where supported, MP4 on browsers that record MP4; the file extension matches). Disabled automatically on browsers that can't capture a canvas stream.

The HUD (bottom-left) shows the live **seed · node count · generation · state** so you can always note down or reproduce a specimen you like.

## How it works

Each frame runs `speed` relaxation passes over the polyline. A relaxation pass:

1. Builds a uniform spatial-hash grid keyed on `repulRadius`-sized cells.
2. For each node: averages its two neighbors (attraction), sums short-range repulsion from nodes in the 9 surrounding grid cells, adds seeded brownian jitter, applies any field forces, and softly clamps to the frame if bounded.
3. Clamps per-frame displacement so the curve can't explode, then moves the node.

After the passes, any edge longer than `maxEdge` gets a midpoint node inserted, until the node budget is reached. That forced insertion is what drives the folding.

## License

MIT — see [LICENSE](LICENSE).
