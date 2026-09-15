# Collapsar

**Watch a tile world snap out of superposition — a from-scratch Wave Function Collapse you can step through cell by cell.**

Collapsar is a single-file, zero-dependency interactive explainer for the tiled [Wave Function Collapse](https://github.com/mxgmn/WaveFunctionCollapse) algorithm. Most WFC demos just hand you a finished tilemap. Collapsar shows you the *mechanism*: it animates the collapse one observation at a time, tints every undecided cell by its entropy, ghosts each cell's remaining candidate tiles, and highlights the active cell and the ripple of constraint propagation as it happens.

## Why it's cool

WFC is one of those algorithms developers find magical but rarely see demystified. Collapsar makes it legible: you literally watch superposition collapse and adjacency constraints propagate outward, which is the exact "aha" moment the algorithm is famous for. It doubles as a real worldgen — pick a tileset and it produces seamless networks that always tile legally — and as a compact reference implementation you can read end to end in one file.

## How WFC works (the two-step loop)

Every grid cell starts as a *superposition* of all possible tiles. The engine then repeats:

1. **Observe** — find the lowest-[Shannon-entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)) cell (the one with the fewest / most-lopsided remaining options) and *collapse* it to a single tile, chosen at weighted random from its candidates.
2. **Propagate** — push that decision outward. Each neighbor drops any tile whose edge socket no longer matches a legal neighbor, and the change ripples through a queue until the grid is consistent again.

Tiles connect by **edge sockets**: two tiles are compatible across a shared edge only when their facing sockets agree (`connected` meets `connected`, `empty` meets `empty`). Collapsar builds 16 tiles from 6 base shapes (empty, end, line, corner, tee, cross) rotated into every orientation, so the adjacency rules fall out of the socket geometry — no hand-authored compatibility table.

If a cell ever runs out of options (a **contradiction**), Collapsar flags it, spotlights the starved cell, and does a region-restart with a fresh sub-seed rather than full backtracking — compact and sufficient for these constrained tilesets.

## Run it

No build, no dependencies, no network. Just open the file:

```
# double-click index.html, or:
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

Any modern browser works.

## Controls

| Control | What it does |
|---|---|
| **▶ Play / ❚❚ Pause** | Run the collapse continuously; pauses automatically when the world resolves |
| **↻ Replay** | Once resolved, Play/Space replays the whole collapse from the start |
| **⇢ Step** | Advance exactly one observe-and-propagate tick |
| **⟲ Reseed** | Start over with a new random seed |
| **speed** | Steps per second during playback (readout shown alongside) |
| **tileset** | *Circuit* (neon traces) or *Knotwork* (Truchet ribbons) — swappable on the fly |
| **grid** | Columns × rows (6–60 each) |
| **ghosts** | Toggle the ghosted stack of each undecided cell's remaining candidates |
| **step history** | Scrub the timeline to rewind/replay any point cell by cell |
| **Click a cell** | Click any undecided cell to force it as the next observation — steer the collapse |

Keyboard: <kbd>Space</kbd> play/pause · <kbd>→</kbd> step · <kbd>R</kbd> reseed.

## Reading the view

- **Entropy heat** — undecided cells are tinted by remaining entropy (cool = few options left, warm = many); the legend bar matches the exact formula.
- **Ghosts** — each undecided cell shows a shrunk mini-grid of its still-possible tiles, so you see options being eliminated.
- **Active cell** (teal outline) — the cell just collapsed.
- **Propagation front** (pink outline) — cells whose options changed as a result.
- **Contradiction** (pulsing red ×) — a cell starved to zero options, just before a region-restart.
- **Propagation Trace** — a live log of each observe step: cell chosen, tile collapsed to, and candidates eliminated downstream. Restart and contradiction lines are styled distinctly and auto-scroll to the current step.

## Shareable permalinks

The full state — `seed`, `set`, `cols`, `rows`, `speed` — is serialized to the URL hash, so copying the address reproduces the exact world deterministically. Example: `index.html#seed=12345&set=knot&cols=32&rows=20&speed=30`.

## License

MIT — see [LICENSE](LICENSE).
