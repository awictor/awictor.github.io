# Meniscus

Fill the thermometers so every row and column reads its target — one liquid line at a time.

Meniscus is a compact, single-file [thermometers](https://www.puzzle-thermometers.com/) logic puzzle. The board is packed with bent glass tubes, each anchored by a bulb. Mercury can only rise continuously from the bulb outward, so every tube's entire state is a single fill length. The numbers along the top and left edge tell you exactly how many cells must be filled in each column and row. Deduce the one configuration that satisfies every clue.

## Why it's cool

Thermometers is a beloved pen-and-paper genre but has almost no clean, dependency-free web implementation with a *real* generator — most ship a hardcoded puzzle list. Meniscus builds every board from scratch and, more importantly, proves each one has a **unique** solution before it ships: a self-avoiding walk tiles the grid with tubes, random fills produce the row/column clues, then a constraint-propagation deducer (monotonic-fill + row/column saturation) is run — the board is only accepted if that deduction determines every cell, which means the solution is provably the only one.

The monotonic-fill constraint collapses each tube to a single integer, which keeps the solver tiny and fast while the deduction stays genuinely satisfying. The same deducer does triple duty: the uniqueness proof, the **Hint** engine, and the step-by-step **Explain** mode. Everything — generator, solver, rendering, and shareable state — lives in one ~380-line `index.html` with zero dependencies and zero build step.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder statically:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

No install, no build, no network calls. The board seed and your current fill state live entirely in the URL hash, so copying the address shares the exact puzzle *and* your progress.

## How to play

- **Click a tube cell** to raise mercury up to and including that cell.
- **Click a cell that's already filled** to drain the mercury back down to just below it.
- Fill is always contiguous from the bulb, so the interaction enforces the core rule for you — you never have to think about gaps.
- The **row/column clues** count how many cells must be filled in that line. Each number glows **green** when its line is exactly satisfied and **red** when you've overshot.
- You win when the whole board matches the unique solution.

## Controls

| Control | What it does |
|---|---|
| **5×5 – 9×9** | Pick a difficulty (board size). Generates a fresh random puzzle. |
| **New** | New random puzzle at the current size. |
| **Daily** | Today's shared puzzle — the same board for everyone, with a local streak counter. |
| **Hint** | Reveals one forced cell that differs from your board and explains *why* it's forced. |
| **Explain** | Steps through the solver's forced-deduction chain from an empty board, one cell at a time, with a plain-language reason for each. Prompts before clearing an in-progress board. |
| **Check** | Flags any filled cells that shouldn't be filled. Non-destructive — nothing is changed. |
| **Reset** | Clears all your fills on the current board. |
| **◑ CB** | Toggles a colorblind-safe palette (Okabe-Ito blue/orange). |
| **Share** | Copies a Wordle-style emoji grid of the solution plus the shareable board link. |

## URL hash / sharing format

The full state is encoded in the hash, so any board is reproducible and resumable:

```
#s=<seed>&n=<size>[&d=1]&f=<fills>
```

- `s` — 32-bit seed the board is generated from (deterministic).
- `n` — board size, 5–9 (clamped; a garbled value falls back to 6).
- `d` — present as `d=1` for a Daily board.
- `f` — one base-36 digit per tube giving that tube's current fill length (max 9, so it never overflows a single character).

Because generation is fully deterministic from the seed, sharing the link reproduces the identical puzzle; the `f` segment additionally restores your in-progress fills.

## License

MIT — see [LICENSE](LICENSE).
