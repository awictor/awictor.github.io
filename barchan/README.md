# Barchan

**A tilt-to-marble granular sand-art sandbox in a single HTML file.** Pour layered sediment, then rotate gravity and watch the strata slump, cascade, and marble.

## Why it's cool

Falling-sand toys are everywhere. Barchan adds one hook they don't have: **gravity you can point in any direction.** Pour colored bands of sand, then grab a compass dial and tilt the whole world — the grains slide to their angle of repose and the layers fold into marbled patterns, like a rotating sand bottle. Every tilt gives a different fold, so it's endlessly replayable and screenshot-worthy. One file, no dependencies, no build, no network.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. That's it. Zero dependencies, zero build step, zero network calls.

It boots into a pre-seeded layered scene, so your first tilt marbles immediately.

## How it works

- **Grid falling-sand cellular automaton** (200×240 cells) backed by typed arrays. An active-cell tracker only simulates grains that are actually moving, so settled piles cost nothing and the sim holds 60fps.
- **Rotatable gravity.** The gravity vector is decomposed into an axis-aligned primary fall direction plus two angle-of-repose diagonals, with a probabilistic lateral bias — so tilting slumps and marbles the strata smoothly instead of snapping.
- **Depth shading** darkens each grain by how deep it sits along the gravity axis, giving a 3D sand-bottle look; settling dust motes puff on impact.
- Grains carry their color identity through every move, which is what makes the layers marble instead of averaging out.

## Controls

**Tools** (sidebar)
- **Pour** — drag to lay sediment. Auto-bands through the palette as you pour, or lock a single color with a swatch.
- **Wall** — paint solid barriers the sand piles and dams against.
- **Erase** — remove grains and walls.
- **Shake** — fluidize grains under the brush to reset piles.
- **Clear all** — empty the container.
- **Brush** — adjustable radius (1–18 cells). A ring at the cursor previews coverage.

**Gravity**
- Drag the **compass dial** to point gravity anywhere. The orange rim mark is "down" (0°).
- **Pendulum** — hands-free auto-tilt that slowly oscillates gravity through a full rotation for a looping self-marbling demo.

**Palettes** — Desert, Aurora, Ember.

**Share / export**
- **Share** — encodes the scene (grid + gravity angle + palette) into the URL hash and copies the link. Overly detailed scenes fall back to PNG (URL would be too long to paste reliably).
- **PNG** — one-click image export.

**Keyboard**
- `←` / `→` — tilt gravity
- `Space` — toggle pendulum
- `[` / `]` — brush size

## License

MIT — see [LICENSE](LICENSE).
