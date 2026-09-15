# Ashlar

**Drag stones over the grid — a Shikaku rectangle-partition puzzle with a real unique-solution generator.**

Ashlar is a single-file, zero-dependency logic puzzle. The board is seeded with numbered clue-stones; you carve the whole grid into rectangles ("ashlars," like fitted squared masonry) so that every rectangle covers exactly one clue and its area equals that clue's number — no gaps, no overlaps.

## Why it's cool

Most browser Shikaku games ship a static, hand-authored puzzle bank. Ashlar ships a real **generator-and-solver core** in one HTML file:

- A recursive **guillotine rectangle-partition** generator lays down a full tiling and drops one clue per rectangle.
- A **constraint-propagation + backtracking solver** enumerates every area-N rectangle per clue, then counts solutions up to 2 and **certifies each board has exactly one** before it's served.
- A separate **logic solver** records the forced-deduction order and grades reasoning depth (scan → chains → search), which tunes difficulty alongside grid size.

Every board is deterministic from a URL-hash seed, so any puzzle is reproducible and shareable.

## Features

- **Shikaku ruleset** — partition the grid into rectangles, one clue each, area = clue value.
- **Drag to carve** — click-drag any two cells; the rectangle snaps to the grid, shows its live area, and glows green (valid) or red (invalid) with per-cell conflict tint. Click a placed piece to erase it.
- **Certified-unique boards** — every served board is proven to have a single solution.
- **Shareable seeds** — `#s=<seed>&d=<difficulty>` URLs reproduce any board and are back/forward navigable; one-click copy link.
- **Daily challenge** — a date-seeded board with a local-day streak and per-difficulty best time (`#daily`).
- **Hint & Reveal** — Hint places the next provably-forced rectangle and explains *why*; Reveal replays the full deduction cascade (revealing does not record a time or streak).
- **Quality-of-life** — completion timer, move counter, undo/redo, autosave-in-progress, keyboard play, and touch-friendly UI.
- **Runs anywhere** — no build, no network, no dependencies; degrades gracefully when browser storage is blocked.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. That's the whole install.

Optional deep links (append to the URL):

- `#s=12345&d=easy` — a specific reproducible board (`d` = `easy` | `medium` | `hard`).
- `#daily` — the date-seeded daily challenge.

## Controls

**Mouse / touch**
- Drag from any cell to any other to carve a rectangle.
- Click (tap) a placed rectangle to erase it.

**Keyboard**
- Arrow keys move the cursor; **Enter** anchors a corner, then places; **Esc** cancels the anchor.
- **Del / Backspace** erases the piece under the cursor.
- **N** new board · **H** hint · **V** reveal · **C** check · **R** reset · **Ctrl+Z / Ctrl+Y** undo/redo.

## How to play

Each numbered stone must end up inside exactly one rectangle whose area equals its number. When every cell is covered by exactly one correctly-sized rectangle, the board is solved. Use **Check** to flag wrong-sized pieces and uncovered cells, **Hint** when you're stuck, and **Reveal** to watch the intended solution build itself.

## Difficulty

| Preset | Grid | Reasoning depth |
|--------|------|-----------------|
| Easy   | 7×7  | scan            |
| Medium | 9×9  | scan / chains   |
| Hard   | 11×11| chains / search |

## License

MIT — see [LICENSE](LICENSE).
