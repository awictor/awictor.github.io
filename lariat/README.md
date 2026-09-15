# Lariat

Draw the one true loop — a self-contained Slitherlink with guaranteed-unique boards, live loop logic, and a rope that cinches shut when you solve it.

## Why it's cool

Slitherlink (a.k.a. Loop-the-Loop / Fences) is a great loop puzzle, and most web versions skip the genuinely hard part: making sure every board has *exactly one* solution reachable *without guessing*. Lariat does it in one file, no dependencies.

Every board is built by growing a random simply-connected region — its boundary is guaranteed to be a single clean closed loop — deriving the 0–3 clues from that boundary, then greedily stripping clues while a pure logic-propagation solver re-derives the whole solution from scratch. If propagation can't rebuild it, the clue stays. So a solved board is both provably unique **and** provably solvable by human logic alone. The "lariat" pays off visually too: the solution is literally a lasso, and completing it pulls the rope taut and glows it gold.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. No build step, no server, no network calls, no dependencies.

## Controls

| Action | Desktop | Touch |
|---|---|---|
| Lay / erase rope on an edge | Left-click a segment between two dots | Tap |
| Paint a run of rope | Left-drag across edges | Drag |
| Mark an edge impossible (X) | Right-click | Long-press |

**HUD**

- **Difficulty** — Easy 5×5, Medium 7×7, Hard 8×8, Fiendish 10×10. Larger tiers also strip more clues.
- **New** — fresh random board at the selected difficulty.
- **Daily** — the same Medium board for everyone on a given date (deterministic seed).
- **Undo** — step back through your full move history.
- **Hint** — fills one forced edge and explains why in one line (e.g. "a 3 must have rope on that side").
- **Solve** — reveals the unique solution.
- **Reset** — clears your rope, keeps the board.
- **Share** — copies a link. Your puzzle *and* your progress are packed into the URL hash, so any link restores exactly what's on screen.

## How to play

Each numbered cell states exactly how many of its four surrounding edges are part of the loop. Draw one continuous closed loop — no crossings, no branches, no stray extra loops — that satisfies every number.

Live feedback keeps you honest:

- Clues turn **green** (with a ring) when satisfied and **red** (bold, struck-through) when overshot — readable without relying on color alone.
- A dot with 3+ rope ends flashes red — a loop can't branch there.
- A loop that closes before using all the clues is called out in the status line.

Solve it and the rope cinches taut, glows gold, and a card shows your time and move count.

## License

MIT — see [LICENSE](LICENSE).
