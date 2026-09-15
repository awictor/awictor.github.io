# Cairnwork

**Logic-guaranteed picross. Every board is solvable by pure reasoning — no guessing, ever.**

Cairnwork is a single-file, zero-dependency nonogram/picross game. It hides a
pixel picture behind row and column run-length clues — but the load-bearing
trick is that it never ships a board you'd have to guess on. Before you play,
a built-in line-propagation solver **certifies** that the puzzle has exactly
one solution reachable by logic alone. If a generated board fails that check,
it's thrown away and regenerated.

## Why it's cool

Most nonogram generators emit boards that need guessing or have multiple
solutions — the cardinal sin of the genre. Cairnwork runs a real line solver
(enumerate every arrangement consistent with a line's current state, intersect
them to find forced cells, propagate rows/columns to a fixpoint). That same
solver does three jobs:

- **Certification** — proves the board is uniquely solvable by deduction.
- **Difficulty** — the number of propagation passes needed becomes the board's
  "logic depth", surfaced as a 1–5 star rating, and tiers are gated by it.
- **Fair hints** — the Hint button reveals the *next* cell a human could
  actually deduce, drawn straight from the solver's resolution order.

## Features

- Hidden-picture picross on canvas: curated symmetric art plus a seeded
  procedural generator, clues derived as row/column run lengths.
- Uniqueness + no-guess certification on every board (regenerate until valid).
- Difficulty tiers from 5×5 up to 20×20, gated by measured logic depth.
- Logic-based hint and a stepwise auto-solve replay.
- Live per-clue satisfaction (green when a line is done, its blanks auto-cross),
  a mistake counter for fills that contradict the true picture, and full undo.
- **Daily** mode: a date-seeded deterministic board everyone shares, with a
  local daily-streak counter and per-tier best times.
- Win reveal: the grid dissolves into a colored render of the hidden picture,
  which you can export as a PNG.
- Shareable URL hash packs the full bitmap so a friend loads the identical
  board (and it's re-certified on load).

Best times and daily-streak credit are only recorded for honest solves — using
Hint or Auto-Solve marks the game assisted and skips the stats.

## Run it

No build, no dependencies, no network calls. Either:

- **Double-click `index.html`** to open it in any modern browser, or
- Serve the folder statically, e.g. `python -m http.server` then visit
  `http://localhost:8000/`.

A static server is recommended if you want the "Share" button to copy the URL
to your clipboard automatically — the Clipboard API is restricted on the
`file://` protocol, so over `file://` the shareable link is placed in the
address bar instead of the clipboard.

## Controls

| Action | Desktop | Touch / one-button |
|--------|---------|--------------------|
| Fill a cell | Left-click / drag | Set **Mode: Fill**, then tap / drag |
| Mark an X | Right-click / drag | Set **Mode: X**, then tap / drag |
| Switch paint mode | — | **Mode** button (also works on desktop) |

Drag locks to a single row or column after the first move. Clues turn green
when their line is satisfied and the remaining blanks auto-cross.

Buttons: **New Puzzle** (fresh random board at the current tier), **Daily**
(today's shared board, shows a check mark once solved), **Undo**, **Hint**,
**Auto-Solve**, **Share**, and **Export PNG** (unlocks once you solve).

## License

MIT © 2026 Alex Wictor. See [LICENSE](LICENSE).
