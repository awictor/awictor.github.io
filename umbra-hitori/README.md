# Umbra

A Hitori logic puzzle that generates boards, proves each has exactly one solution, and teaches you how to solve it — in a single HTML file with no dependencies.

## Why it's cool

Hitori is a shade-the-duplicates puzzle: black out cells so that no number repeats among the unshaded cells in any row or column, no two shaded cells touch orthogonally, and all unshaded cells stay connected as one group.

Most implementations generate boards by brute force and can't tell you *why* a move is right. Umbra ships a real logical solver. It's used three ways:

- **At generation time** it gates every board through a backtracking solution counter, so what you play always has exactly one solution — no guessing.
- **The Hint button** applies exactly one human deduction and names the rule that fired.
- **Guided Solve** animates the full deduction chain, cell by cell.

The same solver rates each board by the hardest technique it requires, so the difficulty badge is honest (e.g. "Hard · 9×9 — needs connectivity forcing") rather than just a grid size.

## Run it

Open `index.html` in any modern browser. No server, build step, or install.

```
# or, if you prefer a local server:
python -m http.server 8000   # then visit http://localhost:8000
```

Append a seed to the URL to load a specific board:

- `#5x5-3` — Easy 5×5, seed 3
- `#7x7-42` — Medium 7×7, seed 42
- `#9x9-12` — Hard 9×9, seed 12
- `#daily` — the date-seeded Daily challenge

Seeds are deterministic: the same hash always produces the same board, so links are shareable and reproducible. The **Share** button copies the current board's link to your clipboard.

## Controls

**Mouse**
- Left-click — shade / unshade a cell
- Right-click — mark a cell "safe" (a confirmed-unshaded dot)

**Touch**
- Tap — shade / unshade a cell
- Long-press — mark a cell "safe"

**Keyboard** (click the board first to focus it)
- Arrow keys — move the cursor
- `Space` — cycle a cell open → shaded → safe
- `X` — toggle shaded

**Buttons**
- **New** — a fresh random board at the selected difficulty
- **Restart** — clear your marks on the current board
- **Share** — copy a reproducible link to this board
- **Daily** — today's date-seeded puzzle, with a localStorage streak and best time
- **Hint** — reveal the next single deduction and the rule behind it
- **Guided solve** — watch the solver work through the whole board

## Live feedback

As you play, the board flags all three rule violations in real time, using colorblind-safe patterns (not color alone):

- **Duplicate** unshaded values in a line — red inset ring
- **Adjacent** shaded cells — orange outline
- **Disconnected** unshaded region — dashed border (flood-fill check)

Cell states are also exposed to screen readers via `aria-label`, so the board is playable non-visually.

## What's in the file

Everything lives in `index.html`:

- a seeded PRNG (`mulberry32`) and the board generator
- a backtracking solution counter with constraint propagation and connectivity pruning (uniqueness gate)
- a logical deduction stepper implementing the classic Hitori rules — no-touching, unique-per-line, three-in-a-line, adjacent-pair, and connectivity forcing — reused for hints, guided solve, and difficulty rating
- the live validator, input handling (mouse / touch / keyboard), timer, and Daily streak tracking

## License

MIT — see [LICENSE](LICENSE).
