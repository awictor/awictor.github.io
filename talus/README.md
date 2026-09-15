# Talus

**Climb the scree, press your luck, don't slip — a transparent-odds dice duel against a nervy AI.**

Talus is a single-file, zero-dependency press-your-luck dice game. You race a
competitive AI up a crumbling cliff face: roll four dice, pair them into two
sums, and slide temporary *pitons* up the matching couloirs (the gullies
numbered 2–12). Keep rolling to climb higher — but if a roll can't legally
advance any of your active pitons, you slip on the talus and lose everything
gained this turn. Bank at any moment to anchor your progress for good. First
climber to anchor three couloirs to the summit wins.

## Why it's cool

The hook is the **nerve meter**. Every roll, Talus enumerates all 1296 dice
outcomes against your current position and shows the exact bust probability,
expected gain, and the EV of rolling versus banking — the same math the AI is
using to decide. So the game is fun to sweat *and* is secretly a playable
lesson in optimal stopping: you can watch the "when do I quit while I'm ahead?"
problem play out on both sides of the board. At the end you get a letter grade
for how closely your stop/go calls matched the optimal ones.

## Features

- **Cant-Stop-style column climber** reskinned as a scree-cliff ascent — four
  dice, two sums, up to three temporary pitons; bank to anchor or push and risk
  a total wipe.
- **Real couloir geometry** — center gullies (7) are long climbs but easy to
  hit; edge gullies (2/12) are short but rarely rolled, so the edges are riskier.
- **Live nerve meter** with exact bust %, expected steps gained, at-stake steps,
  and roll-vs-bank EV, plus a per-turn EV sparkline marking the optimal stop.
- **A genuinely competitive AI** that plays the same math it shows you, with
  Cautious / Balanced / Reckless risk profiles, a live "thought bubble," and
  press-when-behind / bank-to-win logic.
- **Deterministic seeds** — the URL hash (`#s=SEED`) drives a seeded PRNG, so
  the same seed always produces the same cliff. A daily challenge loads by
  default.
- **Shareable result card** — Wordle-style emoji summary copied to your
  clipboard, plus localStorage tracking of lifetime win rate and stop/go
  accuracy.
- Colorblind-safe blue/orange palette, canvas dice animation, and distinct slip
  vs. anchor feedback (screen shake / audio cues).

## Run it

No build, no dependencies, no network calls.

- **Double-click `index.html`** to open it in any modern browser, **or**
- serve the folder, e.g. `python3 -m http.server` then open
  `http://localhost:8000/`.

Serving over http(s) is only needed if you want the shareable link to include a
full clickable URL — the game itself plays fine straight from the filesystem.

### Seeds

- Append `#s=SEED` to the URL (or type a seed and press **New**) to replay a
  specific cliff. Same seed = same dice sequence, so you and a friend can race
  the identical board.
- **Today's daily cliff** loads automatically; click *load* to jump back to it.

## Controls

| Input | Action |
|-------|--------|
| **Space** / **Enter** | Roll the dice |
| **B** | Bank & anchor your progress |
| **1 / 2 / 3** | Pick the corresponding pairing while choosing |
| **Enter** (in the seed field) | Start a new game with that seed |
| Mouse | Click **Roll**, **Bank**, a pairing tile, or an AI risk profile |

The **How to play** panel in the header has the full rules and the marker
legend. Switch the AI between Cautious, Balanced, and Reckless in the sidebar.

## License

MIT — see [LICENSE](LICENSE).
