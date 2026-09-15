# Quench

**Watch a tangled traveling-salesman tour anneal itself smooth as the temperature cools.**

Quench is a single-file visualizer for **simulated annealing** on the Traveling Salesman Problem. Scatter cities on a canvas, hit play, and watch a knotted, self-crossing route visibly untangle into a taut near-optimal loop in real time.

## Why it's cool

Simulated annealing is one of those algorithms everyone hears named but rarely watches work. Quench makes the core idea impossible to miss: early on the tour is "hot" and accepts *uphill* moves that make things temporarily worse — that's how it escapes local minima. As the metal quenches, it stops taking bad moves and freezes into a tight loop. A ghost of the best-tour-so-far and a live temperature/length sparkline make the whole dynamic legible at a glance. Turn on **Race greedy** and watch a plain hill-climber get stuck in a knot while annealing keeps improving.

The whole thing is ~330 lines of dependency-free canvas 2D you can read in one sitting.

## Run it

Open `index.html` in any modern browser (Chrome, Edge, or Firefox). No build, no server, no dependencies.

```
# or serve it, if you prefer
python3 -m http.server
# then visit http://localhost:8000
```

## How it works

Each frame proposes a batch of random **2-opt moves** — pick two edges, reverse the segment between them — and evaluates each with an O(1) delta length. Every move is accepted or rejected by the **Metropolis rule**:

- If the move shortens the tour (`ΔE ≤ 0`), always accept it.
- If it lengthens the tour (`ΔE > 0`), accept it anyway with probability `p = exp(−ΔE / T)`.

The temperature `T` starts at `T₀` and is multiplied by the cooling rate after every proposal (geometric cooling). High `T` → uphill moves are common → the search roams freely. Low `T` → uphill moves become vanishingly unlikely → the search settles. The "greedy ref" readout is a fully 2-opt-optimized tour used as a near-optimal baseline; the **gap to ref** turns green as annealing freezes near (or below) it.

## Controls

| Control | What it does |
| --- | --- |
| **Play / Pause** | Start/stop the anneal (also `Space`) |
| **Step** | Run one full sweep of proposals (`S`) |
| **Reset hot** | Restart from a fresh hot tour at `T₀` (`R`) |
| **Race greedy** | Overlay an only-improving 2-opt hill-climber (orange) that gets stuck |
| **Record** | Capture the canvas to a downloadable WebM |
| **preset** | Layout generator: random clusters, scatter, circle, grid, spiral |
| **cities** | Number of cities (5–150) |
| **Randomize** | New random seed + layout |
| **start temp T₀** | Initial temperature (applied on release; resets to hot) |
| **cooling** | Per-proposal cooling factor (0.99–0.99999) |
| **speed** | Proposals evaluated per frame |

**Editing the map:** click empty canvas to add a city; click an existing city to remove it (the cursor becomes a pointer when you're over one). Annealing needs at least 4 cities.

## Shareable URLs

The current layout and schedule are encoded in the URL hash, so any run is reproducible and shareable:

```
#p=<preset>&seed=<int>&n=<count>&t0=<initial temp>&cool=<cooling rate>
```

| Param | Meaning |
| --- | --- |
| `p` | preset (`clusters`, `random`, `circle`, `grid`, `spiral`) |
| `seed` | RNG seed (mulberry32) for the deterministic layout |
| `n` | city count |
| `t0` | starting temperature |
| `cool` | cooling rate per proposal |

Changing the preset, seed, city count, `T₀`, or cooling updates the hash automatically — copy the URL to share exactly what you see.

## Notes

- Layouts are generated from a seeded `mulberry32` RNG, so the same URL always produces the same map.
- The animation loop idles when paused — no CPU is burned redrawing a static scene.
- `prefers-reduced-motion` is respected: the per-proposal swap-edge flash is suppressed.

## License

MIT — see [LICENSE](LICENSE).
