# Paddock

A pocket Suguru puzzle in a single HTML file — every board is machine-proven to have exactly one solution before you ever see it.

## Why it's cool

Most single-file puzzle toys ship a fixed set of hand-made boards, or generate something that might be unsolvable or ambiguous. Paddock does the honest hard part: it generates a fresh board, fills a valid solution, and runs its own backtracking solver (cut off at the second solution) to **prove uniqueness** before digging clues away. No guess-or-bust dead ends. The difficulty badge is earned the same way — a technique-aware solver reports the hardest deduction the board actually requires, so "Easy" really is solvable by naked singles alone.

Suguru (a.k.a. Tectonic) is also under-served on the web next to Sudoku, and its king-move adjacency rule gives it a distinct, satisfying deduction feel. All of this is ~500 lines of dependency-free HTML/CSS/JS.

## Rules

- The grid is carved into small irregular **fields** (cages) of 4 or 5 cells.
- Fill each field with the numbers **1 up to its own size** (a 5-cell field holds 1–5, a 4-cell field holds 1–4).
- **No two identical numbers may touch** — orthogonally *or* diagonally (king-move adjacency).
- Each puzzle has exactly one solution.

## Run it

No build, no dependencies, no network. Either:

- **Double-click `index.html`** to open it in any modern browser, or
- Serve the folder statically, e.g. `python3 -m http.server` then open `http://localhost:8000/`.

## Controls

| Action | How |
| --- | --- |
| Enter a number | Click a cell to cycle its value forward, or select a cell and press `1`–`5` |
| Move selection | Arrow keys |
| Erase a cell | `0` / `Backspace` / `Delete`, right-click the cell, or the ⌫ pad key |
| Pencil marks | Toggle **Pencil**, then type `1`–`5` to add/remove candidates |
| Auto candidate marks | **Auto marks** checkbox |
| Single forced-cell hint | **Hint** — names the deduction and flashes the cells involved |
| Check progress | **Check** — flags conflicts or entries that don't match the solution |
| Undo / Redo | **Undo** / **Redo** (includes hint reveals) |
| Restart this board | **Restart** |
| New board | **New Puzzle** (uses the size + difficulty selectors) |
| Board size | 5×5 / 6×6 / 7×7 selector |
| Difficulty | Any / Easy / Medium / Hard selector — the badge confirms the honest rating |
| Daily puzzle | **Daily** — the same board for everyone, keyed to the UTC date; tracks best time and day-streak in `localStorage` |

The timer starts on your first move, not at load, so studying the board is free.

## Sharing & resuming

The board size, seed, difficulty, and your current entries are packed into the URL hash, e.g.:

```
#n=6&s=42&t=2&g=.3..1...   (n = board size, s = seed, t = forced tier, g = entries)
```

Copy the URL to hand someone the exact board and your progress, or reload to pick up where you left off. The seed alone deterministically reproduces the board.

## How generation works

1. **Partition** — seeded flood-growth carves the grid into contiguous 4–5 cell fields; degenerate size-1 fields are merged away.
2. **Fill** — an MRV (most-constrained-cell-first) backtracking solver produces one valid complete solution.
3. **Dig** — clues are removed in random order. For Easy/Medium a clue is only removed while a human solver at that technique level can still finish; for Hard, only while the board stays uniquely solvable.
4. **Prove** — a solution-counting solver, cut off at the second solution, confirms the dug board is unique before it's shown.
5. **Rate** — the technique-aware solver labels the board by the hardest deduction it actually needs (naked single → Easy, hidden single → Medium, beyond → Hard).

Everything is bounded and fast at these sizes (5×5–7×7).

## License

MIT © 2026 Alex Wictor. See [LICENSE](LICENSE).
