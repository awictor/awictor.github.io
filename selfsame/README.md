# Selfsame

**Sentences that count themselves into existence.**

Selfsame is a live [autogram](https://en.wikipedia.org/wiki/Autogram) forge. An autogram is a
sentence that truthfully describes its own letter counts — *"This sentence contains three a's,
one b, three c's..."* — where every number, once spelled out, makes itself come true. They are
notoriously hard to construct by hand; Selfsame discovers them in front of you.

## Why it's cool

You watch a sentence bootstrap itself out of nothing. The engine spells its claimed tallies as
words, re-counts the letters that spelling actually produced, feeds the corrections back in, and
iterates. Most guesses are wrong — the claims and the reality disagree — but the loop chases its
own tail until the two collapse into a single self-consistent fixed point. When it locks, you're
holding a small paradox that happens to be verifiably, checkably true of itself.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. No build step,
no dependencies, no network. It's a single self-contained file.

## Using it

- **Preset chips** — click any famous pre-solved autogram to load its locked solution instantly.
- **Forge ▶** — start a fresh search from your current inputs. Press **Enter** in the opening
  clause to forge without reaching for the mouse.
- **Opening clause** — the fixed lead-in the sentence must describe (e.g. `This sentence contains`,
  `This autogram lists`). Anything is fair game, though not every clause has a fixed point.
- **Variant**
  - *list letters present* — only names letters that actually occur (`...three a's, one b...`).
  - *self-documenting pangram* — forces all 26 letters to appear at least once.
- **Style toggles**
  - *…and* — add an Oxford-style "and" before the final letter in the list.
  - *a's* — spell plurals as `a's` / `b's` rather than `as` / `bs`.
- **Speed** — iterations computed per animation frame. Higher = faster lock-in; drop it low to
  watch the search breathe.
- **Pause / Step** — freeze the search, or advance exactly one iteration to inspect a single tick.
- **Copy share link** — puts the full state in the URL hash. A solved link replays the locked
  solution instantly; an unsolved link is a replayable challenge seed (the search is deterministic).
- **⤓ export PNG card** — appears on lock-in; renders the solved sentence above its 26-letter tally.

## Reading the display

- **The sentence** rewrites itself every tick and glows green when it snaps shut.
- **The ledger** shows, per letter, the *claimed* count (blue) against the *observed* count. Rows
  glow red on mismatch and heal to green as the sentence stabilizes. All green = a true autogram.
- **The convergence chart** plots total mismatch per frame; red ticks mark randomized restarts the
  solver uses to escape cycles when it gets stuck.
- **Status** — current state, iteration, live mismatch, best-ever mismatch, and restart count.

## How it works

A fixed-point search: `build` spells the claimed counts into a sentence, `tally` re-counts the real
letters, and the observed counts become the next claim. A shared number-to-words engine (0–999,
hyphenated) is used by both the spelling and the recount sides, so a claim only "closes" when it is
exactly self-describing. When the search revisits a state or stalls, it perturbs the guess and
restarts — seeded deterministically, so the same inputs always find the same autogram.

Not every opening clause has a fixed point, and convergence can take many iterations. The state pill
tells you what the solver is doing (searching, escaping a cycle, or locked) so a long search reads
as work, not a hang.

## License

MIT — see [LICENSE](LICENSE).
