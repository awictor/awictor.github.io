# Firmament

**A Star Battle puzzle box: every board it deals is proven to have exactly one sky.**

Firmament is a single, dependency-free HTML file that generates *and* verifies its own
Star Battle puzzles. Most web Star Battle apps render a fixed set of hand-authored boards.
Firmament ships a real generator plus a backtracking solver, so it can hand you an endless
supply of boards — and it refuses to show you one until its solver has proven the solution
is unique.

## What is Star Battle?

An N×N grid is carved into N irregular regions ("constellations"). Place **K** stars (1 or 2)
in every row, every column, and every region — with **no two stars touching**, not even
diagonally. That single adjacency rule is what makes it hard and satisfying.

## Why it's cool

- **It proves uniqueness.** After placing a valid star field and carving regions around it,
  Firmament hill-climbs the region borders (moving only non-star cells, so the star count per
  region is preserved) until a row-by-row backtracking solver confirms the board has exactly
  one solution. Random regions almost never yield a unique puzzle, so "generate then reject"
  is not viable — "generate then *refine*" is the trick.
- **Every board is a link.** Seed, size, and K live in the URL hash, so any board is a
  shareable, reproducible link. There's also a **Daily Sky** everyone gets the same board for.
- **It teaches, not just tests.** The Hint button runs a human-logic deducer (adjacency
  elimination, full line/region elimination, forced-star singletons) and highlights the single
  next deducible cell with a plain-English reason — and it grades each board
  Logic / Gentle / Tricky / Devious from that same engine.
- **Zero dependencies, one file.** No build, no network, no framework. ~350 lines of JS.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's it.
No install, no build step, no server, no network calls.

To share a specific board, copy the URL (or use **Copy Link**) — the seed/size/K in the hash
regenerate the exact same sky for anyone who opens it.

## Controls

| Action | How |
|---|---|
| Cycle a cell: empty → ★ star → • dot → empty | Left-click / tap |
| Place a dot directly (skip the star) | Right-click, or long-press on touch |
| Undo / Redo | Buttons, or `Ctrl/Cmd+Z` / `Ctrl/Cmd+Y` (or `Ctrl/Cmd+Shift+Z`) |
| Hint (next deducible cell + reason) | **Hint** |
| Reveal the solution | **Reveal** (never counts as a solve or best time) |
| Clear the board | **Reset** |
| New random board at the current size | **New Seed** |
| Load a specific seed | Type it in the field → **Load** |
| Dismiss the win banner to admire the board | Tap the banner |

**Presets:** Gentle (8×8, one star) and Classic (10×10, two stars). **Daily Sky** derives its
seed from the date.

### Reading the board

- The number beside each row and column, and the small badge in each region, is **stars still
  to place**. It turns green / shows ✓ when satisfied, red when over-filled.
- Placing a star auto-marks its eight neighbours with faint dots (they can't hold stars).
- Two touching stars flash red.
- Your best time per seed is saved locally (when the browser allows it).

## Notes

- Board generation is deferred a frame behind a "Carving a unique sky…" message so the UI
  stays responsive while the solver works.
- Everything is local: no accounts, no telemetry, no external requests. Best times use
  `localStorage` and degrade gracefully if it's unavailable (e.g. private-browsing modes).

## License

MIT — see [LICENSE](LICENSE).
