# Trave

**Span every island with beams — a Bridges logic puzzle with a real unique-solution engine.**

Trave is a compact, zero-dependency [Hashiwokakero](https://en.wikipedia.org/wiki/Hashiwokakero) ("Bridges" / "Hashi") puzzle that lives in a single HTML file. A field of numbered islands floats on a grid; you connect them with horizontal and vertical beams — single or double — so that every island carries exactly its number, no two beams cross, and the whole network forms one connected span.

## Why it's cool

Most web Hashi clones skip the hard part: proving a board is fair. Trave ships it. Every puzzle is machine-generated from a genuinely connected solution, then run *back* through a verifying solver that **counts** solutions and rejects anything not uniquely solvable. So every board — including the shared Daily — has exactly one answer and is always reachable by pure logic, never guessing. The whole engine (generator + counting/backtracking solver + canvas UI) is ~500 lines you can read end to end, with no build step and no network calls.

## Features

- **Real generator + verifying solver.** Grows a random connected beam network, derives the clue numbers, then runs constraint propagation plus a counting backtrack (capped at 2, with a connectivity guard) that only serves boards with a unique solution.
- **Three difficulty tiers** by grid size and density — Calm (7×7), Standard (9×9), Knotted (11×11) — each still provably unique.
- **Daily puzzle** seeded from the date (deterministic hash → same board for everyone), plus **Random** boards and a **shareable seed** encoded in the URL hash.
- **Assist tools:** Hint (reveals one logically forced beam, with a proven-solution fallback), Check (flags over-connected islands and split networks), and full multi-step Undo / Redo.
- **Pencil mode** for tentative dashed beams that don't count.
- **Live feedback:** per-island satisfied / over coloring, crossing prevention, and a win state that verifies single-network connectivity.
- **Local stats** (localStorage): solved count, best time per tier, current and longest Daily streak.
- **Polish:** DPR-aware canvas, beam draw-in animation, win sweep, optional WebAudio chimes (toggle), color-blind-friendly palette.

## Run it

Zero dependencies, zero build, zero network. Either:

- **Double-click** `index.html`, or
- Serve the folder: `python3 -m http.server` then open `http://localhost:8000/`.

Opens today's Daily board by default.

### URL hashes

| Hash | Loads |
|------|-------|
| `#daily` | Today's Daily board (resolves to your local day) |
| `#calm-123` | Calm board, seed `123` |
| `#standard-123` | Standard board, seed `123` |
| `#knotted-123` | Knotted board, seed `123` |

A concrete `#tier-seed` link reproduces the exact same board on any machine, any day.

## Controls

- **Tap an island, then a neighboring island** to add a beam between them.
- **Tap the same pair again** to double the beam; **once more** to clear it.
- Beams run only straight, may not cross another beam, and each island must total its printed number.
- **Undo / Redo** — step through your moves. **Hint** — reveal one forced beam. **Check** — audit the board. **Pencil** — lay tentative dashed beams. **Sound** — toggle chimes. **Share** — copy the current board's seed link.

You win when every island carries exactly its number and all islands form one connected network.

## License

MIT — see [LICENSE](LICENSE).
