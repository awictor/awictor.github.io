# Adder

Trace the snake of consecutive numbers — one continuous path from 1 to N.

Adder is a compact, single-file [Numbrix](https://en.wikipedia.org/wiki/Numbrix)-style logic puzzle. You get a grid sparsely seeded with numbers; fill every empty cell so the whole board forms one continuous snake where consecutive integers (`k` and `k+1`) are always orthogonally adjacent — from 1 up to `rows × cols`. The name is a double pun: an *adder* is a snake, and the solution is literally a chain of +1 additions.

## Why it's cool

Numbrix/Hidato has a big fanbase but almost no clean, dependency-free web implementation with a *real* generator — most just ship a hardcoded puzzle list. Adder builds every board from scratch: a random Hamiltonian path over the grid, numbered `1..N`, then clues are carved away while a uniqueness check still passes. The tidy part is that one tiny chain-following routine does triple duty — it's the solver, the uniqueness proof, *and* the hint engine. Everything lives in a single ~350-line `index.html` with zero dependencies and zero build step.

## Features

- **Real generator** — random Hamiltonian path (Warnsdorff-greedy DFS with retries and a snake fallback), so every puzzle is guaranteed solvable.
- **Unique solutions** — clues are carved from the full solution only while the solver still proves exactly one solution exists.
- **Educational hints** — reveals one forced cell *and explains the deduction* ("14 is forced here — the only empty cell touching both 13 and 15"), with sandwich, chain-end, and most-constrained fallbacks.
- **Live feedback** — the longest correctly connected run lights up as a growing green snake segment as you fill.
- **Check mode** — flags any cell that breaks the consecutive-adjacency rule with a soft red tint, non-destructively.
- **Difficulty tiers** — 5×5 Coiled, 7×7 Serpent, 9×9 Basilisk.
- **Deterministic seeds** — the seed is baked into the URL hash, so any puzzle is reproducible and shareable (`#size=7&seed=12345`).
- **Daily challenge** — `#daily=YYYY-MM-DD` gives everyone the same board for the day, with its own best-time ladder.
- **Pencil marks, full keyboard nav, undo/redo**, and per-size best times saved locally.
- **Touch-friendly** — an on-screen number pad means it plays on phones and tablets, not just with a keyboard.
- **Win animation** — a staggered `1..N` snake-trace lights up the solved path, plus a short WebAudio chime.

## Run it

No install, no build, no network. Either:

- **Double-click `index.html`** (or drag it into a browser tab), or
- **Serve it** for full share-link support:

  ```sh
  python -m http.server 8000
  # then open http://localhost:8000/
  ```

Deep-link a specific puzzle via the URL hash:

- `#size=7&seed=12345` — a specific 7×7 board
- `#daily=2026-09-12&size=5` — the daily 5×5 for that date

> **Share button note:** on the `file://` protocol the full page URL is a machine-local path that won't resolve for anyone else, so Share copies just the puzzle *hash* and tells you so. Serve over `http(s)` to copy a complete, clickable link.

## Controls

| Action | How |
| --- | --- |
| Select a cell | Tap/click it, or use the arrow keys |
| Enter a number | Tap it on the number pad, or type it (multi-digit is buffered — `1` then `4` enters `14`) |
| Pencil marks | `Shift` + digits, or toggle the ✎ button then tap the pad |
| Clear a cell | `Delete` / `Backspace`, or the ⌫ button |
| Undo / redo | `Ctrl`+`Z` / `Ctrl`+`Y` |
| New puzzle | **New** button (same size, fresh seed) |
| Daily puzzle | **Daily** button |
| Check for mistakes | **Check** button (toggle) |
| Get a hint | **Hint** button |
| Share the board | **Share** button |

Given clues are locked and shown in gold; your entries are white. Solve the whole grid into one unbroken `1..N` snake to win.

## License

MIT — see [LICENSE](LICENSE).
