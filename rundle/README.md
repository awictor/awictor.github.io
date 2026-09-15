# Rundle

**Climb from one word to another, one letter at a time — and race the shortest ladder.**

Rundle (an archaic word for a ladder rung) is a single-file word-ladder puzzle *and* solver. You're given a START word and a GOAL word of the same length; change exactly one letter at a time, where every intermediate step must itself be a real word, until you reach the goal.

## Why it's cool

Most word-ladder toys just tell you "right" or "wrong." Rundle runs a real breadth-first search over the word graph in your browser and computes **par** — the provably shortest possible ladder — so every puzzle is a race against the mathematical optimum, not a fuzzy guess. Adjacency is generated on the fly (substitute each position with a–z, filter against a `Set`) instead of precomputing a graph, which keeps the whole thing tiny yet exact. Random puzzles are drawn from a BFS frontier of the start word, so a solution provably exists — no dead puzzles.

It's Lewis Carroll's 1877 "Doublets" game, made shareable and self-contained: no build step, no dependencies, no backend.

## Features

- **One-letter-at-a-time play** with live dictionary validation and a per-tile flip animation on each accepted rung.
- **BFS "par" engine** scores your move count against the shortest possible ladder (5 stars at par, one fewer per rung over).
- **Daily puzzle** derived deterministically from the date, with a solve streak and best-vs-par history saved in `localStorage`.
- **Random puzzles** at an interesting, guaranteed-solvable distance, in 3-, 4-, or 5-letter modes.
- **Neighborhood minimap** listing the current rung's valid one-letter neighbors, with goalward moves highlighted (computed from a single goal-rooted BFS).
- **On-screen keyboard** that highlights letters which yield a valid next word at the cursor.
- **Reveal ladder** ghost overlay of the optimal chain, and an animated **Auto-solve** that walks the BFS path rung by rung.
- **Share** a Wordle-style emoji result card (and the puzzle itself) — the challenge is encoded in the URL hash, e.g. `#cold-warm`.
- Undo / redo / reset, a move-vs-par HUD, colorblind-safe ghost hints, and `prefers-reduced-motion` support.

## Run it

No server, build step, or network needed:

- **Double-click `index.html`**, or drag it into any modern browser tab.

Optionally deep-link a puzzle via the URL hash:

```
index.html#cold-warm
```

Both words must be the same length and present in the embedded dictionary. If no ladder connects them, Rundle loads the puzzle and tells you up front that it's unsolvable.

## Controls

| Action | Input |
| --- | --- |
| Type a letter | letter keys or on-screen keyboard |
| Move the cursor | `←` / `→` |
| Submit a rung | `Enter` |
| Delete a letter | `Backspace` / `⌫` |
| Undo / redo | `Ctrl`+`Z` / `Ctrl`+`Y` (or the buttons) |
| Jump to a neighbor | click any word in the Neighborhood list |

**Length modes** (3 / 4 / 5) start a fresh random puzzle. **Daily** loads today's shared puzzle; **Random** rolls a new one. **Reveal** and **Auto-solve** are the give-up / hint actions. **Share result** unlocks once you reach the goal.

## How it works

Everything lives in `index.html`:

- Compact word lists (3-, 4-, and 5-letter) are embedded as whitespace-joined strings and parsed into `Set`s.
- `neighbors()` generates one-letter-different words on the fly and filters by set membership.
- `bfs()` finds the shortest ladder (and reports how many words it explored); `distances()` does a goal-rooted layering used for the neighbor hints.
- Puzzle generation walks a BFS frontier of a seed word to pick a goal at a target distance.

## License

MIT — see [LICENSE](LICENSE).
