# Gyrus

**A closed thread that grows too fast for its own space — and folds into brain-coral.**

Gyrus is a single-file, zero-dependency differential-growth toy. A closed loop of nodes
obeys three rules every frame, while new nodes keep getting inserted wherever the curve
stretches. Starved for room, the loop buckles into the tight, self-avoiding convolutions of
brain coral, leaf margins, and cortical folds — writhing live as it fills the screen.

Named for the *gyrus*, the cortical ridge that real differential growth produces.

## Why it's cool

Most gen-art toys are flow fields or particle attractors. Gyrus shows an actual
morphogenesis process: structure emerges purely from a chain outgrowing its container,
not from a texture or a noise function. A smooth circle slowly panics into a dense
labyrinth that never crosses itself, and the age-based coloring leaves visible "growth
rings" so you can read the history of every fold. Three lines of math, one emergent
organ.

## The three rules

Every frame, each node feels:

1. **Repulsion** — pushed away from any *non-adjacent* segment within the repulsion
   radius (true point-to-segment self-avoidance, so the ring can't pass through itself).
2. **Attraction** — pulled toward its two bonded chain neighbours (springs that keep the
   thread continuous).
3. **Smoothing** — nudged toward the local average of its neighbours (Laplacian relaxation
   that keeps the curve fair).

Then any segment longer than a split threshold spawns a midpoint node — so growth is
driven by local crowding, not a global timer. The loop genuinely runs out of room and
has no choice but to fold.

A uniform-grid spatial hash (cell size = repulsion radius) keeps the neighbour queries
near-linear, so the chain reaches a few thousand nodes at 60fps in plain canvas 2D.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
No build step, no dependencies, no network calls.

## Controls

**Render**
- **Line** — crisp writhing outline, coloured by node age (growth rings).
- **Solid** — filled brain-coral surface with fold-depth shading for a fleshy 3D look.

**Sliders** (all retune live, mid-run):
- **Growth** — node insertions allowed per frame.
- **Repulsion radius** — how far apart the thread keeps itself (also sets grid cell size).
- **Attraction** — spring strength toward bonded neighbours.
- **Smoothing** — Laplacian relaxation strength.
- **Max nodes** — hard cap; guards framerate on weaker machines.

**Boundary** — `Free bloom`, `Circle`, or `Heart`. Non-free modes add a soft inward force
so the folds fill a silhouette.

**Palette** — `Coral`, `Cortex`, `Gut`, `Bark`. Colour tracks node age.

**Presets** — one-click `Coral` / `Cortex` / `Gut` looks (each sets params + palette +
boundary + render mode).

**Timelapse scrubber** — drag back to freeze the sim and replay how the bloom grew; drag
fully right to resume live growth.

**Buttons**
- **Pause / Play** — freeze or resume the simulation.
- **Replay** — re-grow *this exact* bloom from the current seed (deterministic).
- **New bloom** — pick a fresh random seed.
- **Export PNG** — save the current frame at canvas resolution.
- **Copy link** — copy a URL whose `#hash` encodes the full state (seed + every param +
  palette + boundary + render mode) so anyone opening it sees the identical bloom.

The **seed** field at the bottom is editable — type a number and press Enter to load that
exact bloom.

**Keyboard:** `space` pause · `R` replay · `N` new bloom.

## Reproducibility

Everything is driven by a seeded PRNG. The seed and all parameters round-trip through the
URL hash, so a copied link (or a typed seed) reproduces a bloom exactly — same starting
ring, same fold, same colours.

## License

MIT — see [LICENSE](LICENSE).
