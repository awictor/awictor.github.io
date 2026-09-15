# Cadastre

**Survey the plat — divide the land into parcels, one deed per lot.**

Cadastre is a zero-dependency, single-file [Shikaku](https://en.wikipedia.org/wiki/Shikaku) ("divide by squares") puzzle dressed as a land survey. You're handed a grid dotted with numbered deed-stones; carve the whole plat into rectangular parcels so that every parcel contains exactly one number and that number equals the parcel's area in cells.

## Why it's cool

Almost every Shikaku on the web ships hand-authored or non-unique boards. Cadastre **generates and formally verifies uniqueness in the browser**: a recursive rectangle-tiling generator proposes a candidate board, then an exact-cover backtracking solver counts solutions and rejects anything with more than one legal survey. Every board you play has exactly one answer and never requires guessing — and the whole generate → verify → solve loop is ~215 lines of readable vanilla JS in one file.

The land-survey skin (deed-stones, parcels, surveyor ranks, parchment/ink cadastral-map look) is a distinctive coat of paint over a classic ruleset, and drag-to-carve rectangles feels good to use.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder statically:

```sh
python3 -m http.server   # then visit http://localhost:8000
```

No build, no install, no network. The only persisted state is your local stats/streak in `localStorage`.

Deep-link any board via the URL hash — `index.html#cartographer/424242` — the tier and seed live there, so a board is one click to share and reproduce.

## Rules

- Each parcel is a rectangle.
- Every parcel encloses **exactly one** numbered deed-stone.
- That number equals the parcel's **area** (cells) — a `6` stone means a rectangle of 6 cells.
- Parcels tile the whole grid: **no gaps, no overlaps.**

## Controls

**Mouse / touch**
- Drag a rubber-band rectangle to carve a parcel.
- Or tap one corner, then the opposite corner (mobile-friendly).
- Click/tap an existing parcel to erase it.

**Keyboard** (focus the board)
- Arrow keys move the marker.
- `Enter` sets a corner, then `Enter` again to commit the parcel; `Enter` on an existing parcel erases it.
- `Ctrl+Z` / `Ctrl+Y` undo / redo.

**Buttons**
- **Daily** — today's date-seeded puzzle (counts toward your streak).
- **Random** — endless fresh boards in the current tier.
- **Check** — flags overlapping cells and mis-deeded parcels, and reports how many acres remain unsurveyed.
- **Hint** — reveals the single most-forced parcel, with the solver's reasoning.
- **Walk survey** — animates the solver's deduction order, most-constrained deed first.
- **Undo / Redo / Clear** — multi-step history.
- **Labels** — toggle A/B/C parcel letters (pairs with the colorblind-safe tints).
- **Export PNG** — saves the finished plat as a framed cadastral map with a title block.

## Difficulty (surveyor ranks)

| Rank | Grid | Feel |
|------|------|------|
| Surveyor | 7×7 | a few large lots |
| Assessor | 10×10 | balanced |
| Cartographer | 13×13 | many tight lots |

## How the unique-solution guarantee works

1. **Generate** — a seeded `mulberry32` PRNG drives recursive rectangle tiling, biased per tier toward parcel-size mixes that constrain tightly. Each rectangle gets one clue stone equal to its area.
2. **Verify** — for each clue, enumerate every rectangle of that area that contains the clue and no other clue. Feed those candidates to a most-constrained-cell exact-cover backtracking solver that counts solutions, exiting early at 2.
3. **Accept or retry** — keep the board only if exactly one solution exists; otherwise reseed (up to a bounded number of attempts). This is the same candidate set the Hint and Walk-survey features replay.

## Accessibility

- Full keyboard play (draw, erase, undo, redo).
- Okabe–Ito colorblind-safe parcel palette, with optional letter labels.
- Live-announced status ("surveyor's note") and HUD for screen readers.
- Honors `prefers-reduced-motion`: the completion sweep and Walk-survey animation resolve instantly.
- Pinch-to-zoom is left enabled for low-vision players on the dense grids.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
