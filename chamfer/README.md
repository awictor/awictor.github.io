# Chamfer

A crisp inequality-Latin-square puzzle: fill the grid so every chevron points true.

Chamfer is a single-screen Futoshiki-style logic puzzle. Fill an n×n grid so each row and column contains 1..n exactly once, while satisfying the greater-than / less-than chevrons etched between adjacent cells (the open side of each chevron faces the larger value).

## Why it's cool

Inequality puzzles are far rarer than sudoku clones, and almost none guarantee a unique solution. Chamfer's generator leans on its own solver to *prove* uniqueness: it builds a random Latin square, scatters chevrons and givens, then removes clues one at a time only while a solution-counting solver confirms exactly one solution remains. Every board you play is provably fair.

It's one HTML file. No dependencies, no build step, no network calls. Puzzles are encoded in the URL hash, so any board (and a "beat my time" challenge) is a shareable link.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder statically:

```
python3 -m http.server 8000    # then visit http://localhost:8000
```

Serving over `http://` (or `https://`) enables one-click clipboard copy for the Share button; on `file://` Share falls back to a copyable prompt.

## Features

- **Sizes 4–7** (default 5×5) with an honest difficulty rating (Easy / Medium / Hard) derived from the actual human technique needed to solve — not clue count.
- **Deduction-aware Hint**: reveals the next forced move *and* a one-line reason (last-empty, chevron-bound single, hidden single).
- **Check** flags row/column duplicates and violated chevrons with an instant flash.
- **Auto-marks** shows live candidate pencil marks; or switch to manual **Pencil** mode to place your own. (The two are mutually exclusive.)
- Same-digit highlighting, a pulse when a chevron is satisfied, and a win celebration.
- Timer, per-difficulty best time, and a solve streak (saved in `localStorage`).
- **Share** copies a link that reproduces the exact board; if you've solved it, the link becomes a "beat my time" challenge.
- Light / dark theme toggle (remembered).

## Controls

| Input | Action |
|-------|--------|
| Click a cell | Select it |
| Arrow keys | Move selection |
| Digits `1`–`n` | Fill the selected cell (or toggle a mark in Pencil mode) |
| `Backspace` / `Delete` | Clear the cell |
| `Space` | Toggle Pencil mode |
| On-screen number pad | Same as digit keys |

## How it works

- **Generator** — seeded RNG builds a random Latin square, derives every adjacency inequality, then greedily drops givens and chevrons while the counting solver verifies uniqueness at each step.
- **Solver** — inequality-chain bound propagation (longest-path min/max per cell) plus MRV backtracking with a 2-solution early-exit. The same routine powers the uniqueness proof, Solve, and the difficulty rating.

## License

MIT © Alex Wictor
