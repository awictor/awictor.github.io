# Rondure

A hand-crafted Masyu pearl-loop puzzler with a real generator, a uniqueness solver, and seedable daily boards — in one dependency-free HTML file.

## Why it's cool

Most web Masyu clones ship a fixed bank of hand-picked boards or hotlink someone else's puzzles. Rondure **invents and verifies its own** in the browser at load time: it grows a random single closed loop, derives the pearl clues that loop implies, then runs a backtracking Masyu solver to *prove* the board has exactly one solution before you ever see it — and reduces the clue set to a minimal forcing one. That proof (the hard, interesting part of a logic-puzzle engine) happens client-side, with no build step and no network, in a single file you can read end to end.

## Features

- **Genuine in-browser generator.** Grows a random single closed loop via edge-bump expansion, then places pearls derived from the loop's own geometry.
- **Proven-unique boards.** An edge-based backtracking solver (union-find + open-end tracking + a "no new component after a loop closes" prune) certifies each board has exactly one solution, then greedily minimizes to a forcing pearl set. The accept rule is "search completed without aborting and found exactly one solution," so a modest node budget never ships a false positive — it only skips slow-to-prove boards.
- **Live rule enforcement.** White- and black-pearl constraints are checked as you draw; branches/crossings show as a red disc and pearl breaches as an amber ring.
- **Check & Hint.** Check reports what's left to fix; Hint applies and flashes one forced segment from the proven solution.
- **Deterministic seeds in the URL.** `#seed=…&size=…&diff=…` — every board is shareable and reproducible, and a UTC-derived Daily puzzle is identical worldwide.
- **Full undo/redo, timer, and move counter**, with an animated loop-glow on a win (and a `prefers-reduced-motion` fallback).
- **Responsive canvas.** Scales down to fit narrow/mobile viewports while keeping crisp DPR-aware rendering; re-scales on resize and zoom.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. Zero dependencies, zero build, zero network.

To share or reproduce a specific board, copy the URL (or use the **Share** button); the seed, size, and difficulty live in the `#hash`.

## Controls & usage

**Goal:** draw one single closed loop that never crosses or branches and obeys every pearl.

- **White pearl** — the loop passes *straight* through it, and must *turn* in at least one of the two cells immediately beside it.
- **Black pearl** — the loop makes a *right-angle turn* on it, and must go *straight* through the next cell out along both arms of that turn.

**Drawing:** click or drag along the edges between cells to lay a segment; **click a segment again to erase it**.

**Buttons:**

| Control | Action |
|---|---|
| **New** | Generate a fresh random board at the current size/difficulty |
| **Daily** | Load today's globally-shared daily board |
| **Size** | 6×6 (instant) or 7×7 (a few seconds to prove) — changing it regenerates immediately |
| **Difficulty** | Easy / Medium / Hard (more revealed clues = easier) — changing it regenerates immediately |
| **Check** | Validate the current loop and report remaining issues |
| **Hint** | Apply and flash one correct, pearl-forced segment |
| **Undo / Redo** | Step through your edits (per-drag granularity) |
| **Share** | Copy the reproducible board URL to the clipboard |

## Scope note

Grid sizes are capped at 6×6 and 7×7 on purpose. Proving Masyu uniqueness in-browser is genuinely expensive, and the fraction of random loops that yield a uniquely-solvable board falls off steeply as the grid grows — so rather than ship a mode that spins for tens of seconds or serves non-unique boards, Rondure limits sizes to what it can prove quickly.

## License

MIT — see [LICENSE](LICENSE).
