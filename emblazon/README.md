# Emblazon

**A procedural coat-of-arms generator that also writes the heraldry.**

Emblazon invents a fictional noble house from a seed, draws its coat of arms on a
heater shield, and — the fun part — emits the formal *blazon* (the canonical
textual description, e.g. `Azure, three mullets Or, on a chief Argent three roundels Gules`)
in correct heraldic grammar right beside the render. It also runs in reverse:
paste a blazon and it draws the arms.

## Why it's cool

Most generators only draw. Emblazon draws **and** speaks the language of
heraldry back to you. Under the hood it obeys the medieval **rule of tincture**
(never colour-on-colour or metal-on-metal), which turns the generator into a
small constraint solver rather than a pure random doodle. Gen-art + a formal
grammar + a real logic constraint, in one dependency-free HTML file.

## Features

- **Seeded, reproducible arms** — a `mulberry32` PRNG keyed off the URL hash, so
  every coat of arms can be bookmarked, shared, and re-rolled deterministically.
- **Full escutcheon rendering** — 8 field divisions (per pale/fess/bend/chevron/
  saltire, quarterly, gyronny, plain), 8 ordinaries (chief, fess, pale, bend,
  chevron, cross, saltire, bordure, with charged chiefs/fesses), and 7 geometric
  charges (mullet, roundel, lozenge, crescent, cross patté, fleur-de-lis, tower)
  laid out in heraldic arrangements (single, 2-and-1, in bend, semé).
- **Rule of tincture as a solver** — every layer's tincture is picked against a
  real contrast check; four furs (ermine, ermines, vair, counter-vair) act as
  neutral fills so the picker never dead-ends.
- **Auto-generated blazon** — correct heraldic word order, plus an invented house
  name and Latin-ish motto on a scroll.
- **Reverse mode** — paste a blazon and Emblazon parses it back into rendered
  arms, showing you the canonical form it round-trips to. Fails loudly with a
  clear message on anything it can't represent.
- **Live gallery** — eight nearby seeds rendered as clickable (and keyboard-
  operable) thumbnails to jump between houses.
- **Share links** — the current arms live in the URL hash for both seed mode
  (`#seed=...`) and pasted-blazon mode (`#b=...`).
- **Crisp PNG export** — device-pixel-ratio aware, with the parchment backdrop
  baked into the file so the download matches what's on screen.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
Zero dependencies, zero build step, no network access.

Optional deep links (append to the URL):

- `#seed=12345&c=70&s=1` — load seed 12345, complexity 70, shape index 1 (rounded)
- `#b=Azure%2C%20three%20mullets%20Or` — load a specific blazon

## Controls

| Control | What it does |
|---|---|
| **New House** | Roll a fresh random seed |
| **Shape** | Cycle the escutcheon: Heater → Rounded → Pointed |
| **Crest** | Toggle the helm/mantling crest above the shield |
| **Export PNG** | Download the current arms as a PNG named after the house |
| **Complexity** | More divisions, ordinaries, and charges as you raise it (seed mode only) |
| **Copy blazon** | Copy the canonical blazon text |
| **Copy link** | Copy a shareable URL that reproduces exactly what's on screen |
| **Render this blazon** | Reverse mode — parse a pasted blazon into arms |
| **Nearby Houses** | Click (or focus + Enter/Space) a thumbnail to adopt that seed |

Complexity only governs procedural generation, so it's disabled while a pasted
blazon is displayed; pick a seed to re-enable it.

## Notes on the reverse parser

The renderer supports one ordinary and one charge group per field, so the parser
accepts the same. A blazon with a second ordinary or charge group is rejected
with a clear message rather than silently dropping heraldry.

## License

MIT — see [LICENSE](LICENSE).
