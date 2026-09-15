# Myrmidon

**Watch a few keystrokes of code grow living ant highways.**

Myrmidon is a zero-dependency, single-file ant-colony simulation. Thousands of
individually-simulated ants wander out from a nest; the moment one finds food it
turns home laying a food-scented trail, while searching ants lay a home-scented
trail. Each ant reads the scent ahead through three virtual antennae and steers
toward whatever matters to it. Nothing is centrally planned — yet within seconds
glowing amber-and-cyan supply lines self-organize into the shortest paths between
nest and food, reroute around walls you paint, and dissolve when a food pile runs
dry.

## Why it's cool

It makes the invisible logic of an ant colony visible and interactive. No ant
knows where anything is. The entire ruleset is two diffusing, evaporating
pheromone fields plus a sense-and-steer rule — classic stigmergy, no pathfinder.
You literally watch shortest-path highways condense out of noise, bend around a
wall you drew a second ago, and rot away when the food is gone. Everything is
paintable and live-tunable, any world round-trips through the URL so states are
shareable, and any frame exports to PNG.

## Run it

Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari):

```
# just double-click the file, or:
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

No build step, no install, no network calls. On first load (with no URL hash) it
runs a short guided **Maze Runner** tour that drops a wall mid-run to force a live
reroute and explains the mechanism. Dismiss it with the `✕`, or replay it any time
via the **? Tour** chip in the top bar.

## Controls

**Brush toolbar (bottom-left)** — pick a tool, set the brush size, then click/drag
on the canvas. A ring at the cursor previews where the brush lands and how big it is.

| Tool | Action |
|------|--------|
| **Food**  | Drop a food pile; brush size sets its radius. Overlapping drops merge and refill. |
| **Wall**  | Paint obstacles that block both ants and scent. |
| **Erase** | Clear walls, trails, and food under the brush. |
| **Nest**  | Click to move the colony's home; the home-scent gradient re-forms around it. |

**Transport (bottom-center)**

- **Pause / Play** — toggle the sim
- **Step** — advance one tick while paused
- **PNG** — save the current frame
- **REC** — record a WebM clip (auto-stops at 10s; where supported)

**Keyboard** — `Space` play/pause · `S` step · `R` restart colony.

## Parameter panel (right)

Every slider takes effect on the running sim.

| Group | Params |
|-------|--------|
| **Colony** | Ant count (1k–30k), step speed |
| **Senses & steering** | Sensor angle, sensor distance, turn strength, random wander |
| **Pheromone fields** | Deposit strength, evaporation rate, diffusion rate, food regen |
| **View** | Ant motes, time-lapse trail memory, network-only heatmap, solved-path overlay |
| **World & sharing** | Seed (any text — determines the RNG), restart, clear map, copy link |

The HUD (top-left) tracks food delivered, trips completed, ants carrying now,
estimated network length, ant count, and FPS — plus a **path-convergence** meter
and sparkline comparing the ants' dominant trail against the obstacle-aware
shortest path (Dijkstra).

## Presets

- **Tight Roads** — low wander, sharp steering; thin, decisive trunk roads.
- **Wandering Scouts** — wide sensors, high wander; diffuse, exploratory foraging.
- **Maze Runner** — two staggered barriers with gaps; watch the colony solve it.
- **Highway Sprawl** — large colony, four food piles, food regen on; a busy network.

## Sharing & determinism

The RNG is a seeded `mulberry32`, so a given **seed + params + map** reproduce the
same emergence. The full world — seed, all params, RLE-encoded wall map, and
nest/food positions — is serialized into the URL hash (UTF-8-safe base64, so any
Unicode seed works). Use **Copy shareable link**, or just paste a link, to load a
world exactly.

## Hacking the constants

The whole engine lives in the single `<script>` block in `index.html`. Good
starting points:

- `GW`, `GH`, `SCALE` — grid resolution and on-screen scale of the pheromone field.
- `DEP_DECAY` — how many steps an ant's trail deposit fades over.
- `PheromoneField.update()` — the separable 3-wide box blur (diffusion) + evaporation.
- `tick()` — the per-ant three-antenna sense-and-steer loop and deposit rule.
- `render()` — the amber/cyan additive glow colormap and tone-mapping.
- `PRESETS` — tweak or add regimes.

## License

MIT — see [LICENSE](LICENSE).
