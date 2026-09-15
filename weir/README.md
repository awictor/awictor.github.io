# ~ Weir

**A water-level logic puzzle where you raise the weir and let gravity find the line.**

Weir is a single-file "Aquarium" deduction puzzle with a physics twist. A grid is carved into
irregular tanks (connected regions of cells). Each tank behaves like a real aquarium: water fills
from the bottom up and its surface is perfectly level, so within any one tank an entire row of cells
is either wet or dry — no dry cell can sit beneath a wet one. Row and column clues tell you exactly
how many cells end up submerged. You don't paint cells one at a time; you set a tank's waterline and
the water animates to its level across the whole connected region. Deduce the one arrangement that
satisfies every clue.

## Why it's cool

- **Real hydrostatics as a game rule.** Each tank collapses to a single integer waterline, so the
  interaction — raise the weir, watch the water find its level — is tactile and unusual for a logic
  puzzle, while the tiny search space lets a full generator + uniqueness checker + hint engine live
  in one small file.
- **Every board is generated and verified unique.** A backtracking solver counts solutions and bails
  at two, so New Puzzle only ever hands you a board with exactly one answer.
- **Shareable.** Seed, grid size, and your current waterlines are serialized into the URL hash, so any
  puzzle (or your progress) is just a link.

## Run it

Zero dependencies, zero build step, no network calls.

- **Simplest:** double-click `index.html` to open it in any modern browser.
- **Or serve it statically** (nicer for clipboard/share on some browsers):
  ```sh
  python3 -m http.server 8000
  # then open http://localhost:8000/index.html
  ```

## Controls

- **Click a dry cell** to raise that tank's water up to it; **click a wet cell** to drain the tank to
  just below it.
- **Grab a tank's surface and drag** up or down to set its waterline directly. The cursor turns into a
  resize handle near a surface, and the hovered tank is highlighted.
- **Row / column clues** show how many cells must be submerged. A clue turns green with an underline
  when it's exactly met, and red with a strike-through when the count overshoots.

### Buttons

- **New Puzzle** — a fresh, uniqueness-verified board at the selected size.
- **Daily** — the same seeded puzzle for everyone that day, with a local streak counter.
- **Hint** — locks one forced waterline and explains why (the clue math that forces it).
- **Flood Solve** — fills every tank to the solution in sequence.
- **Reset** — drains the board so you can retry the current puzzle.
- **Share** — copies a link encoding the board and your current progress.
- **Size** — 5×5 through 8×8.

Best times (per size) and the daily streak are stored in `localStorage`.

## License

MIT — see [LICENSE](LICENSE).
