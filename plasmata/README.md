# Plasmata

**A continuous-lifeform lab where you paint, breed, and dissect living Lenia organisms — and share any creature as a URL.**

Plasmata is a single HTML file, zero dependencies, no build step. Open it and a soliton glides across the screen. Every creature you find — its rule *and* its painted state — encodes into the URL hash, so any lifeform is a link you can paste to anyone.

## Why it's cool

Most cellular automata are blocky on/off grids (Conway's Life). Plasmata runs **continuous** CA — the Lenia / SmoothLife family, where each cell holds a floating-point "mass" and evolves under a smooth convolution kernel and a Gaussian growth function. The result is gliding, pulsing, self-healing blobs that genuinely look alive.

It's equal parts aquarium, microscope, and rule editor. Drag the growth curve and watch the organism fatten, starve into filaments, or dissolve. Mutate its genome and let the auto-breeder hunt for new stable creatures. Then copy a link — and it boots straight back into the crawling organism, genome and all.

## The update rule (one paragraph)

Each cell holds a mass `A` in `[0,1]`. Every step, the field is convolved with a radial kernel `K` to get a local neighborhood potential `u = K∗A`. That potential runs through a Gaussian growth map `G(u) = 2·exp(−(u−μ)²/2σ²) − 1`, which is positive when the neighborhood mass lands near `μ` and negative otherwise. The field is then integrated and clamped: `A ← clamp(A + dt·G(K∗A), 0, 1)`. Cells with a "just right" amount of neighbor mass grow; too sparse or too dense and they die back. That self-correcting balance is what makes the blobs self-healing — and what makes an asymmetric seed *crawl*. The grid is toroidal (wraps at the edges), so organisms glide forever.

## Run it

Open `index.html` in any modern browser:

- Double-click the file, or
- `start index.html` (Windows) / `open index.html` (macOS) / `xdg-open index.html` (Linux)

No server, no network, no install. A creature is alive on load. Share links live in the URL hash — open one and it boots straight into that organism.

## Controls

**Transport (bottom of the stage)**
- `▶ / ❚❚` — play / pause (**Space**)
- `Step` — advance one generation (**→**)
- `speed` — steps per second (FPS-aware, so it won't tank the framerate)
- `zoom` — 1×–8× pixel scale
- `🎲 Random` — seed a random soup (**r**)
- `Clear` — empty the field (**c**)
- `🛰 Safari` — auto-follow a roaming organism (recenters via toroidal center-of-mass)
- `● Record` — capture WebM of the canvas · `📷 PNG` — snapshot

**Genome — the rule** (side panel)
- `growth μ / σ` — where and how tightly the growth window sits
- `time dt` — integration step (metabolism); bigger is faster but easier to blow up
- `kernel R` — how far each cell "sees"
- `shells` + `ring b₀/b₁/b₂` — the kernel's ring profile (multi-shell kernels spin and pulse)

**Kernel & growth plots** — Left: the convolution ring the creature feels. Right: the Gaussian growth map. Drag the growth plot vertically to widen/narrow σ; click it to set μ.

**Paint & seed**
- `✎ Draw / ⌫ Erase / ✳ Spray / ≈ Blur` — brush tools
- `⊕ Inject` — stamp the current species seed wherever you click (drop a whole colony)
- `brush` / `strength` — brush size and deposit amount

**Render**
- Swappable scientific colormaps (viridis, magma, inferno, plasma, turbo, ice, ember, mono)
- `🌈 Color Lenia` — three cross-coupled RGB fields, each with its own μ, for iridescent organisms (colormap is unused in this mode). Off by default for speed.
- `◎ Kernel footprint overlay` — draw the kernel radius/shells over the field

**Breeder & evolution**
- `🧬 Mutate genome` — perturb the current genome
- `🩺 Assess viability` — headless survival/stability score (alive · dead · exploded)
- `▶ Auto-breeder` — repeatedly mutates and scores candidates, surfacing the fittest stable creature as an adopt/share link. Sharing the bred creature does **not** disturb the one you're currently watching.

**Dissect** — a live panel explaining the update rule and how each parameter maps to observed behavior.

## Sharing creatures

- **Share URL** (top bar) packs the full genome plus, optionally, the painted state (quantized RLE, base64url). If the state is too large to fit, Plasmata falls back to a genome-only link and re-seeds from the species.
- The link uses `location.href`, so it works identically over `http(s)://` and `file://`.

## Coin your own species

1. Load a creature from the **Gallery** (e.g. Orbium) and hit play.
2. Nudge `μ` / `σ` (or drag the growth plot) until it morphs into something you like — or run the auto-breeder and adopt the fittest.
3. Paint or `⊕ Inject` extra colonies to set up interactions.
4. Hit **Share URL**, copy the link — that's your species. Paste it anywhere and it boots straight into the crawling organism.

## License

MIT — see [LICENSE](LICENSE).
