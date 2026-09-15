# Wavefront

**Watch search algorithms think.** A single-file pathfinding lab where the frontier, the cost field, and the heuristic all become visible.

Wavefront is a zero-dependency, single-HTML visualizer for grid pathfinding and graph search. Paint walls and weighted terrain, drag the start and goal, and watch BFS, Dijkstra, Greedy Best-First, and A* expand their frontier cell-by-cell as a living wavefront.

## Why it's cool

Most pathfinding visualizers just animate colored cells. Wavefront makes the *invisible internals* visible and interactive:

- **A heuristic-weight slider morphs A\* along the whole spectrum** — from pure Dijkstra (weight 0: provably shortest, explores everything) to pure Greedy (weight high: fast but not optimal). An **OPTIMAL / NOT OPTIMAL** badge compares the returned path against the true shortest cost and flips the instant an over-weighted heuristic stops being admissible. You *see* the tradeoff happen by dragging.
- **A g/h/f cost-field heatmap** reframes search as a colored landscape instead of just colored cells, with a live color key.
- **Race Mode** runs two algorithms side-by-side on the identical map with live nodes-expanded / path-cost counters — an instant "oh, *that's* why A\* beats Dijkstra" moment.

It's a teaching instrument that's still a delightful toy, and it's one file you open with no build step.

## Run it

Open `index.html` in any modern browser — double-click it, or:

```
# optional: serve it (any static server works)
python -m http.server 8000   # then visit http://localhost:8000
```

Zero dependencies, zero build step, zero network calls. WebM recording (the **Record** button) needs a Chromium-based browser for `MediaRecorder` + `canvas.captureStream`.

## Controls

**Build the map**

- **Left-drag** to paint with the current brush; **right-drag** to erase.
- **Brush**: Wall / Terrain / Erase. Terrain paints weighted cells — Grass (·1), Mud (·3), Water (·8).
- **Drag the green (start) or orange (goal) dot** to move an endpoint — the search re-solves live.
- **Grid & Mazes**: set cols/rows, or generate a maze (recursive backtracker, randomized Prim's, random fill). **Clear** empties the grid.

**Run the search**

- Transport: **Play/Pause**, **Step**, **Reset**, **Solve** (instant). **Speed** slider controls animation rate.
- **Algorithm**: BFS · Dijkstra · Greedy · A\*.
- **Heuristic Weight** slider (A\* only): 0 = Dijkstra, 1 = textbook A\*, up to 5 = Greedy.
- **Heuristic Function**: Manhattan / Euclidean / Chebyshev / Octile, plus a diagonal-movement toggle (no corner-cutting).
- **Overlay**: None / g / h / f cost-field heatmap, or **Flow** (down-gradient vector field toward the goal).
- **Race Mode**: pick two algorithms and step them together on the same map.
- **Benchmark**: run all four algorithms across N freshly generated mazes and compare average nodes expanded, path cost, optimality rate, and time.

**Read the result**

- Right panel shows nodes expanded, path length, path cost, and open-frontier size.
- **Narration** tab logs each pop with its priority terms; **Open Set** tab is a live priority-queue inspector.
- **Share Link** copies a URL whose hash encodes the entire lab; the theme toggle honors your OS preference and is remembered.

### Keyboard shortcuts

| Key | Action | Key | Action |
|-----|--------|-----|--------|
| `Space` | Play / pause | `1`–`4` | BFS / Dijkstra / Greedy / A\* |
| `→` | Step | `W` / `T` / `E` | Wall / Terrain / Erase brush |
| `Enter` | Solve instantly | `G` / `H` / `F` | Toggle g / h / f overlay |
| `R` | Reset search | `D` | Toggle diagonal movement |

## Algorithms

| Algorithm | Priority | Optimal? | Uses heuristic |
|-----------|----------|----------|----------------|
| BFS | fewest steps | unweighted grids only | no |
| Dijkstra | g (cost so far) | always | no |
| Greedy Best-First | h (estimate to goal) | no | yes |
| A\* | g + w·h | yes when w·h is admissible | yes |

Empty and Grass cost 1 to enter, Mud 3, Water 8; diagonal moves cost ×√2. Every algorithm except BFS routes *around* expensive terrain — the heatmap shows why.

## URL-hash format

The whole lab (dimensions, walls, terrain, endpoints, algorithm, weight, heuristic, diagonals, overlay) round-trips through a compact hash: a dotted header of settings plus a run-length-encoded, base64url-encoded cell grid. Any maze is one shareable link. Very large hand-painted grids may produce long links.

## License

MIT — see [LICENSE](LICENSE).
