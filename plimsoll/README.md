# Plimsoll

**A compact, single-file Aquarium logic puzzle where water finds its level.**

A grid is carved into irregular *tanks*. Flood each tank with water until every edge number is satisfied. Two rules of real physics do all the work:

- **Gravity** — within a tank, water fills from the bottom up. No water cell can float above an empty cell of the same tank.
- **Level** — within a tank, the surface is flat. If a row holds water anywhere in the tank, it holds water across that tank's full width at that height.

The numbers along the top and left edges count how many watered cells sit in each column and row. The name nods to the [Plimsoll line](https://en.wikipedia.org/wiki/Waterline), the load-mark painted on a ship's hull to show its waterline.

## Why it's cool

Aquarium is an under-served puzzle family, and its physics hook is both instantly intuitive and pretty to watch. The design trick: an entire solution collapses to **one small integer per tank** — its waterline height. That single insight is what lets a rigorous unique-board generator, a real constraint solver, hints, and animated auto-solve all fit in ~330 lines of vanilla JS with **zero dependencies**.

Every published board is **guaranteed to have exactly one solution**: the generator grows random connected tanks, assigns each a random waterline, derives the row/column clues, then runs its own arc-consistency solver and only ships the board if it collapses to a single answer.

## Run it

No build, no install, no dependencies.

```
# just open the file
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or double-click `index.html`, or serve the folder statically (`python3 -m http.server`) and visit the page.

> Tip: some browsers block clipboard access on the `file://` protocol. Sharing still works — the board link lands in your address bar, and the daily result is shown so you can copy it manually. Serving over `http://` enables one-click copy.

## Controls

| Action | How |
| --- | --- |
| Raise a tank's water surface | **Click** a cell (surface snaps to that row) |
| Drain one level | **Click** the same surface again |
| Mark a tank as empty **air** | **Right-click**, **long-press** (touch), or press **A** |
| Move the cursor | **Arrow keys** |
| Set surface at cursor | **Enter** / **Space** |
| Undo / redo | **Ctrl+Z** / **Ctrl+Y** |

Clues turn **green ✓** when satisfied and **red !** when overfilled (color plus a symbol, so it reads without relying on color alone). Solve every clue to win.

## Buttons

- **Easy / Medium / Hard** — grid size and tank granularity. The tiers ride a real deduction-difficulty ladder (see below).
- **New** — fresh random board at the current difficulty.
- **Daily** — a date-seeded Medium puzzle; everyone gets the same board each day. Solving keeps a local streak.
- **Hint** — reveals one logically forced tank and names the technique that pins it.
- **Auto-solve** — animated reveal driven by the same waterline constraint solver.
- **Share board** — copies a permalink (the whole board is packed into the URL hash).
- **Print** — clean grayscale print layout.

## How generation and difficulty work

The solver reasons only over per-tank waterline integers, so it's tiny and fast. Difficulty is graded by which deduction techniques a board *requires*:

- **Easy** — solvable by clue exhaustion alone (a line with a single undetermined tank forces it).
- **Medium** — needs per-tank fill-bounds reasoning, but a single-tank line exists to open with.
- **Hard** — no single-tank line exists, so you must open with bounds / cross-tank reasoning.

The Hint tags each deduction with the technique in play (exhaustion, per-tank fill bounds, or cross-tank interaction) so it doubles as a teaching tool.

## Accessibility

Keyboard-playable, `aria-live` status announcements, `aria-pressed` difficulty state, color-plus-symbol clue feedback, and `prefers-reduced-motion` support (snaps water instead of animating, static win overlay).

## License

MIT — see [LICENSE](LICENSE).
