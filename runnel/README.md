# Runnel

**Pour colored streams through a grid until every channel is full — flow puzzles whose unique solution fills 100% of the board.**

Runnel is a self-contained, zero-dependency canvas puzzle in the Numberlink / Flow family with one sharp twist: every board is **zero-waste**. The single valid solution tiles the entire grid — no empty cells, no crossings. Drag from a colored endpoint and the color pours cell-by-cell down the channel; connect every matching pair while covering every square.

## Why it's cool

Most Flow clones ship hand-authored puzzle packs, or generators that can't guarantee a single answer. Runnel does the hard part live in the browser: it **invents** a board by randomly decomposing the grid into interleaved snake paths, then a backtracking solver **prunes it and proves** it has exactly one zero-waste solution before you ever see it. The "unique solution proven in N nodes" badge is earned, not asserted. If a candidate can't be proven unique inside the node/time budget, generation escalates the path count and retries, falling back gracefully rather than hanging the tab.

## Features

- **Zero-waste boards** — the unique solution always fills 100% of cells.
- **Proven-unique generator** — from-scratch snake-path decomposition, then a bounded backtracking solver that proves uniqueness (with a sound stranded-cell prune) before display.
- **Liquid-flow drag** — color pours cell-by-cell with an eased fill and a pulsing leading edge. Back-drag to retract; cross another stream and it truncates cleanly.
- **Live HUD** — coverage %, filled/empty counts, move counter, and real-time dead-end highlighting.
- **Assists** — undo/redo, a non-spoiling hint (reveals one forced next cell), and an animated full auto-solve.
- **Colorblind-aware** — an Okabe-Ito / Paul Tol color ramp plus a stream-index number on every endpoint, so identity never rests on hue alone.
- **Responsive** — the board reflows to fit phones and reacts to resize/rotation; pinch-zoom stays available.
- **Four tiers** — 5×5 → 9×9 with scaling stream counts.
- **Shareable seeds** — the board is encoded in the URL hash (`#s=<seed>&d=<difficulty>`); "Copy link" reproduces the exact board (with a `file://` clipboard fallback).

## Run it

No build, no dependencies, no network calls.

- **Easiest:** double-click `index.html`, or drag it into any modern browser tab.
- **Optional (recommended for clipboard on Chrome/Edge):** serve it locally, e.g.
  ```sh
  python3 -m http.server 8000
  # then open http://localhost:8000/
  ```
  Serving over `http://localhost` gives the "Copy link" button the secure-context Clipboard API; opening via `file://` falls back to a legacy copy.

Reproduce a specific board by appending its seed, e.g. `index.html#s=abc123&d=2`.

## Controls

**Drag** from any colored dot to pour its stream. Drag onto an empty neighbor to extend, back-drag to retract, and cross another stream to truncate it. Fill every cell to win.

| Key | Action |
|-----|--------|
| `N` | New board |
| `H` | Hint (reveals one forced cell) |
| `U` / `Ctrl+Z` | Undo |
| `R` / `Ctrl+Y` | Redo |
| `S` | Auto-solve |

Difficulty is selected from the segmented control at the top.

## License

MIT — see [LICENSE](LICENSE).
