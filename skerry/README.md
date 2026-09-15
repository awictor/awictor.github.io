# Skerry

Hand-craftable Hashiwokakero in one HTML file — every board is unique, and every hint explains itself.

## Why it's cool

Skerry is a complete Hashiwokakero (Bridges / Hashi) puzzle in a single, zero-dependency HTML file. The interesting part is that **one deterministic logic solver is reused three ways**:

- It **proves each generated board has exactly one solution** — generation only accepts a board that the sound forced-move propagator can fully crack, which guarantees uniqueness without brute-force backtracking.
- It **drives Auto-solve**, replaying the forced-move chain step by step.
- It **powers self-explaining Hints** — each hint reveals one forced span *and names the rule that forces it* (max-capacity, corner-4-double, isolation-avoidance, single-neighbour).

So the same engine that makes the puzzle fair is the one that teaches you why each move is inevitable. No puzzle files, no build step, no network.

## Rules

Each numbered island (a "skerry") must sprout exactly that many bridges. Bridges run straight, horizontally or vertically, between two islands; a link carries one or two spans; spans never cross. You win when every island's count is satisfied **and** all islands form one connected archipelago.

## Run it

Open `index.html` in any modern browser.

- Double-click the file, or
- `start index.html` (Windows) / `open index.html` (macOS) / `xdg-open index.html` (Linux)

No server, dependencies, or internet access required.

## Controls

| Action | How |
|---|---|
| Build / cycle a span | Drag between two islands, or click one then the other. Cycles 0 → 1 → 2 → 0. |
| Pick a span (keyboard) | Focus the board, use arrow keys to select a span |
| Cycle the selected span | `Enter` or `Space` |
| New puzzle | **New** button, or change the **Level** dropdown (regenerates immediately) |
| Daily puzzle | **Daily** — same board for everyone on a given UTC date |
| Hint | **Hint** — places one forced span and explains the rule in the Deduction log |
| Auto-solve | **Auto-solve** — animates the full forced-move solution (toggle to stop) |
| Undo | **Undo** — steps back one span |
| Clear | **Clear** — wipes all bridges, keeps the same board |
| Inspect the proof | Scrubber / ◀ ▶ step through the solver's deductions |
| Share | **Share link** — encodes the board into the URL hash and copies it |

## Features

- **Unique-by-construction generator** across three difficulty tiers (grid size, island density, required deduction depth).
- **Live validation**: per-island remaining-count badges, colourblind-safe (Okabe–Ito) over-count and crossing highlights, forbidden-crossing blocking, and a union-find connectivity check with a green win glow.
- **Self-explaining hints** and a scrollable **Deduction log** naming each applied rule.
- **Inspectable uniqueness proof** via the solve-path scrubber.
- **Daily board** seeded from the UTC date so it rolls over identically worldwide.
- **Shareable / replayable** base64 URL hash.
- **Responsive + HiDPI**: stacks to a single column on narrow screens and renders crisply on Retina/HiDPI displays.

## License

MIT — see [LICENSE](LICENSE).
