# Corset

**A live constraint-writing studio — compose under Oulipo-style rules and watch every rule police you in real time.**

Corset is a single-screen writing toy for constrained composition. You write in a big central field; along the side sits a rack of toggleable *constraint cards*. Flip any combination on and your whole piece is validated as you type — offending letters and words light up inline, a per-constraint HUD tells you exactly what's wrong, and a single "purity" meter aggregates how clean the piece is.

## Why it's cool

Constrained writing (lipograms, univocalics, snowballs) is a centuries-old game that's normally played in your head. Corset makes the page fight back the moment you break a rule, so each sentence becomes a tiny puzzle. Stack constraints and the difficulty compounds. And because the entire state — active rules *and* your text — round-trips through the URL, you can share a finished lipogram to show off, or share just the bare constraints as a challenge for a friend to solve.

No dictionary, no build step, no network. Every rule is a pure function over the text, so the whole thing is one self-contained HTML file that runs offline.

## Features

- **Stackable constraint cards** — toggle rules on/off and combine them freely (e.g. lipogram + tautogram at once). A compatibility guard refuses logically impossible stacks (forbidding "e" while requiring a univocalic "e") so shared challenges stay solvable.
- **Eight dictionary-free constraints:**
  - **Lipogram** — forbid one letter everywhere.
  - **Univocalic** — only one vowel is allowed.
  - **Tautogram** — every word starts with the same letter.
  - **Snowball** — each word strictly longer than the last.
  - **Pangram** — use all 26 letters.
  - **Acrostic** — line initials must spell a target word.
  - **Palindrome words** — every word reads the same both ways.
  - **Prisoner's** — no ascenders or descenders.
- **Live inline highlighting** — a transparent textarea layered over a scroll-synced styled backdrop marks the exact offending letters/words as you type, with overlapping violations merged cleanly.
- **Per-constraint HUD** with the specific gripe (`missing: q, x`, `word 4 breaks the snowball`, `3 lines start wrong`), a fading A–Z coverage strip that pulses missing letters when Pangram is on, and one aggregate purity meter whose color tracks the score (red → green).
- **Challenge mode** — a random solvable-challenge generator plus a running attempts/elapsed timer that records "Solved in MM:SS". Exit any time from the challenge bar.
- **Serverless sharing** — full state (constraints + params + text) is encoded in the URL hash. Toggle "share text" to bake your piece in, or leave it off to hand over a bare challenge.
- **Persistence** — your text, active constraints, and theme are saved to `localStorage`, so a refresh won't destroy work in progress (an incoming shared link always takes priority).
- **Polish** — keyboard-toggleable cards with `aria-pressed`, an `aria-live` region announcing the top violation, dark/light theme toggle, copy-to-clipboard, and export-to-`.txt`.

## Run it

No build, server, or install required.

- **Double-click `index.html`**, or drag it into any modern browser tab.

That's it. It works entirely offline.

## Usage

1. Start typing in the central field.
2. Flip on any constraint cards in the rack on the right. Each card shows what its rule does; enable it to reveal its parameter controls and live feedback.
3. Adjust parameters where offered — the forbidden letter for Lipogram, the allowed vowel for Univocalic, the target word for Acrostic, etc.
4. Watch violations light up inline as you write; the purity meter and HUD tell you how close you are. When every active rule passes, the badge flips to **CLEAN**.

### Controls

| Control | What it does |
|---|---|
| Constraint card header | Toggle the rule on/off (click or keyboard). |
| **share text** checkbox | On: the shared link bakes in your current text. Off: shares a bare challenge. |
| **Share link** | Copies a hash-encoded link to the clipboard. |
| **Random challenge** | Generates a solvable puzzle and starts the timer. |
| **Copy** | Copies your text to the clipboard. |
| **.txt** | Downloads your piece as `corset-piece.txt`. |
| **◐** | Toggles light / dark theme. |
| **Exit** (challenge bar) | Leaves challenge mode and clears the timer. |

## License

MIT — see [LICENSE](LICENSE).
