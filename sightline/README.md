# Sightline

**Read the skyline from its sightlines — a hand-crafted Skyscrapers logic puzzle in a single HTML file.**

Sightline generates an endless supply of Skyscrapers puzzles right in your browser and *proves* each one has exactly one solution before you ever see it. No packs, no server, no dependencies — one file, open it and play.

## Why it's cool

Most web Skyscrapers games ship a fixed list of boards or load JSON puzzle packs. Sightline builds every board live: it shuffles a random Latin square, computes the edge clues, then greedily strips clues while a backtracking constraint solver re-verifies that a single solution remains. So every puzzle is guaranteed solvable by pure logic — and every board is a shareable URL. There's also a hint engine that doesn't just fill a cell, it *explains the deduction*.

## The rules

- The grid is `N×N`. Each cell holds a building of height `1..N`.
- Every row and every column must contain each height exactly once (a Latin square).
- The numbers around the edge are **sightline clues**: standing at that edge and looking down the row/column, how many buildings you can see. A taller building hides every shorter building behind it.
  - A clue of `1` means the tallest building (`N`) is right at the front.
  - A clue of `N` means the buildings ascend `1, 2, …, N` — every one is visible.

From the edge clues alone the whole skyline is uniquely deducible.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's the whole install. No build step, no network calls.

To load or share a specific board, append it to the URL hash:

- `index.html#n=5&s=123456` — a 5×5 board from seed `123456`
- `index.html#daily=20260911` — a specific Daily board (UTC date)

**Copy Link** and the emoji share result both put the current board's exact URL on your clipboard, so anyone who opens it gets the identical puzzle.

## Controls

| Action | How |
|---|---|
| Set a height | Click a cell to cycle `1→…→N→empty`, or select it and press `1`–`6` |
| Clear a cell | `0`, `Backspace`, or `Delete` |
| Move selection | Arrow keys |
| Pencil marks | `P` or the **✏ Pencil** button, then click/type candidates |
| Candidate assist | **Candidates** toggles faint auto-computed candidates in empty cells |
| Hint | `H` or the **Hint** button — reveals one forced cell and explains why |
| Undo / Redo | `U` / the **Undo** and **Redo** buttons |

On touch devices a number pad appears below the board for direct entry, and `⌫` clears.

## Features

- **Difficulty by size:** 4×4 (easy), 5×5 (medium), 6×6 (hard). Smaller boards keep extra clues; larger boards are carved as sparse as uniqueness allows.
- **Daily Challenge:** one shared board per UTC day, with a solve streak and a Wordle-style copyable emoji-skyline result.
- **Live feedback:** duplicate heights in a row/column are flagged, and an edge clue turns red once its line is full but the visible count is wrong.
- **Teaching hint engine:** names the deduction (edge = 1, edge = N staircase, or elimination) and highlights the exact clue and cell.
- **Skyline visuals:** height-shaded rising-bar cells and a left-to-right grow animation on a win.
- **Seeded RNG (mulberry32):** the same seed always reproduces the same board and clues; seed + size live in the URL hash.
- **Best-time-per-seed** and the Daily streak are stored in `localStorage` (and degrade gracefully if storage is unavailable).

## Files

- `index.html` — the entire game: styles, markup, RNG, generator, solver, puzzle carver, renderer, input handling, hint engine, and persistence.
- `LICENSE` — MIT.

## License

MIT © 2026 Alex Wictor
