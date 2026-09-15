# Trillium

**The Game of Y in a single HTML file — connect all three sides, beat a real AI, and watch the board collapse to prove who won.**

Trillium is a zero-dependency, single-file implementation of the Game of Y, the hexagonal connection game invented by Craige Schensted and Charles Titus. Two players race to build one connected chain of their colour that touches all three sides of a triangular board. Y is mathematically **draw-proof**: any completely filled board has exactly one winner — never zero, never both.

## Why it's cool

- **A real opponent, not a toy.** The AI is Monte Carlo Tree Search whose random playouts are scored by the exact Y-reduction rule. Because Y has no draws, every playout ends in a clean win or loss with no fuzzy heuristic — so the search converges to genuinely principled play, in vanilla JS with no Web Worker.
- **The reduction pyramid.** After any game you can watch the board recursively collapse — every triangle of three cells becomes one cell holding the majority colour — down to a single crowning stone that reveals the winner. It turns the "Y has no draws" theorem into a visual you can scrub through.
- **One file, no build, works offline.** Open `index.html` and play. Everything — SVG board, geometry, win detection, the engine, exports — is inline.

## Run it

Open the file. That's the whole install:

```
# just double-click index.html, or:
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

No build step, no dependencies, no network. If you prefer a local server (e.g. to test share links), any static server works:

```
python -m http.server 8000
# then visit http://localhost:8000/
```

## Features

- Triangular hex-hex board rendered as crisp SVG, sizes **8 / 11 / 13** per side, with hover preview and a last-move marker.
- **Draw-proof win detection** via union-find; the winning chain is highlighted the moment it spans all three edges.
- **MCTS AI** with exact terminal evaluation (no heuristic scoring in playouts) and cooperative time-slicing that keeps the UI responsive.
- **Three difficulty tiers:** Easy (bridge/centrality heuristic with immediate win + block detection), Medium (~450 ms search), Hard (~1200 ms search).
- **Move hints** with an estimated win % readout.
- **Full undo / redo**, New Game, and the **pie / swap rule** so the second player can steal a strong opening.
- **Reduction pyramid** modal with play / pause / step and a plain-language explainer synced to each collapse.
- **Bridge coach** that flags your two-carrier bridges and warns when one is threatened.
- **Live thinking heatmap** tinting empty cells by MCTS visit count and win rate as the search converges.
- **Share & export:** URL-hash position sharing (the link reopens the exact position), copy link, and PNG / SVG / animated-GIF export of the reduction.
- **Modes:** You vs AI, Hotseat (human vs human), and AI vs AI (with a Pause/Resume control).
- Light / dark theme, responsive layout, `prefers-reduced-motion` support, keyboard-operable cells, and screen-reader status announcements.

## Controls

| Key | Action |
| --- | --- |
| `N` | New game |
| `U` | Undo |
| `R` | Redo |
| `H` | Hint |
| `P` | Open the reduction pyramid |
| `Esc` | Close a modal |

Click or tap a cell to place a stone; board cells are also focusable, so you can Tab to a cell and press Enter or Space. Use the side panel to pick mode, board size, difficulty, and which colour you play, and to toggle the pie rule, thinking heatmap, and bridge coach.

## How to play the Game of Y

Players take turns placing one stone of their colour on any empty cell; stones never move or get captured. **Win by building a single connected chain of your colour that touches all three sides of the triangle** — the corners count toward both sides they touch. The pie rule keeps the game fair: after the opening move the second player may swap sides instead of replying. See the in-app **Rules** panel for the full explanation, including why Y can never end in a draw.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.

The Game of Y was invented by Craige Schensted and Charles Titus.
