# Rheobridge

**Hex against an AI that sees the board as a resistor network.**

Rheobridge is a single-file, zero-dependency implementation of [Hex](https://en.wikipedia.org/wiki/Hex_(board_game)) — the classic connection game — played against an AI that doesn't count pieces. It models the board as an electrical circuit and plays the side with lower resistance.

## Why it's cool

Most Hex engines score positions with hand-tuned heuristics. Rheobridge uses the resistor-network idea from Anshelevich's work instead:

- **Your stones** are zero-resistance wire.
- **Empty cells** are unit resistors.
- **Opponent stones** are open circuits (infinite resistance).

It solves the voltage field between each player's two edges with **Gauss–Seidel relaxation**, computes the effective resistance for each side, and uses the log-ratio of the two resistances as the evaluation inside an alpha–beta search. Lower resistance means you're closer to connecting.

The payoff is the **Tension field** overlay: it renders the live current field as a heat map so you can *watch* which cells the AI considers load-bearing, see the bridges it's relying on, and follow current streaming along its best connection path. It's a real opponent and a live visualization of how the evaluation function thinks — in one HTML file.

## How to play Hex

Place stones on empty cells, turn by turn. You win by linking your two edges with an unbroken chain of your own stones. You are **orange** and connect top↔bottom; the AI is **blue** and connects left↔right. There are no captures and no draws — exactly one side connects.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. No build, no install, no network.

## Controls

- **Click / tap a cell** — place a stone. On mouse/pen, hovering previews the legal move.
- **Difficulty** — presets that set board size, search depth, and (on Easy) a blunder rate. Easy plays a share of its moves at random; the current handicap is shown as a caption so it's never hidden.
- **Board / Depth** — set size (7/9/11) and search depth (1–3 ply) directly. Changing either switches Difficulty to *Custom* and turns the blunder handicap off.
- **New game** — reset (highlighted when a game ends).
- **Undo** — step back to your own previous move (disabled when there's nothing to undo).
- **Tension field** — toggle the resistor-network heat map, bridge annotations, and AI best-path overlay.
- **Watch AI vs AI** — attract mode; the AI plays both sides.

### Overlay legend

- **Ember-glowing cells** — load-bearing cells carrying the most current.
- **Dashed blue links** — bridges (cells already virtually connected).
- **Streaming white dots** — the AI's current best connection path.

## Extras

- **Pie rule (swap):** the AI may swap a strong opening move to neutralize first-player advantage.
- **Shareable positions:** the full board and side-to-move live in the URL hash, so any position is a link.
- **Accessible:** status changes are announced to screen readers, and animations respect `prefers-reduced-motion`.

## License

MIT — see [LICENSE](LICENSE).
