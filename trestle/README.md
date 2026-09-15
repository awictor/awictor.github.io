# ⚓ Trestle

**A pocket Hashiwokakero (Bridges) puzzle with a real generator, a logical solver, and hints that explain themselves.**

Trestle is a single HTML file. No build, no dependencies, no network calls. Open it and play.

## Why it's cool

Most browser Bridges clones either generate junk boards that aren't uniquely solvable, or ship a "hint" button that just reveals the answer. Trestle has one constraint-propagation solver core that does double duty:

1. **At generation time** it certifies every board is *uniquely* solvable by pure logic (boards that need guessing are rejected and regenerated).
2. **At play time** the same engine drives a hint that runs exactly one forced step and *names the deduction it used* — "sole neighbor", "count saturation", or "isolation guard" — so the puzzle teaches you how to solve it.

Difficulty is honest: the star badge is measured from the solver's deepest technique and forced-step count, not from board size. Every board is deterministic from its seed, so any board is shareable and reproducible via a URL hash.

## The rules

Numbered islands sit on a grid. Draw bridges between them so that:

- every island has exactly as many bridge-ends as its number,
- bridges run only horizontally or vertically and never cross,
- at most two bridges connect any pair of islands, and
- all islands end up joined into one connected network.

## Run it

Open `index.html` in any modern browser — double-click it, or load the `file://` path. That's the whole install.

To share or reproduce a specific board, use the URL hash:

- `index.html#s=12345&n=9&d=2` — seed `12345`, size `9×9`, difficulty depth `2`
- `index.html#daily=2026-09-11` — the Daily puzzle for a given date

The **Copy link** button copies the current board's reproducible link for you.

## Controls

| Action | Mouse / touch | Keyboard |
| --- | --- | --- |
| Add / cycle a bridge (0 → 1 → 2 → 0) | Click the gap between two islands, or drag island → island | Move the selection ring with arrows, then `Shift`+arrow toward a neighbor |
| Hint (one forced move, named) | **Hint** button | `H` |
| Explain (replay the whole solution, narrated) | **Explain** button | `E` |
| Check (report over-/under-bridged islands) | **Check** button | `C` |
| Undo | **Undo** button | `U` |
| Reset the board | **Reset** button | `R` |

- Islands glow **green** when satisfied and **red** (with a `!`) when over-bridged. A `✓` marks a completed island. The palette is colorblind-safe: it distinguishes states by hue *and* symbol *and* ring style, not color alone.
- Disconnected clusters are dimmed until you join them into the main network.
- The **New** control picks board *size* (7×7 / 9×9 / 11×11); the star badge separately reports the solver-measured difficulty.

## Daily

The **Daily** button seeds a fixed puzzle from today's date, tracks your time / moves / hints / undos, and — once solved — offers a spoiler-free **Copy result** summary plus a link that reproduces the exact board.

## How it works

- **PRNG** — `mulberry32`, seeded from the URL hash, makes every board fully reproducible.
- **Generator** — grows a connected, non-crossing planar bridge network, then derives each island's clue number from the bridges it actually built.
- **Solver** — constraint propagation with the three named techniques, plus a connectivity check; a board is only served if the solver deduces it end-to-end to a single unique solution.
- **Difficulty** — rated from the deepest technique required and the number of forced steps, then baked into the shareable hash.

## License

MIT — see [LICENSE](LICENSE).
