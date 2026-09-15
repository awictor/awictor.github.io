# Datestone

**Hide a year inside a sentence — the lost art of the chronogram, as a live toy.**

A chronogram is a centuries-old inscription craft: a phrase whose letters,
read as Roman numerals, add up to a specific year. The classic example —
carved on monuments after Queen Elizabeth I died in 1603 — is
**"My Day Closed In Immortality"**, whose capital numeral-letters sum to
MDCIII = 1603.

Datestone turns that craft into a single-screen workshop. Type any phrase,
set a target year, and every `M D C L X V I` letter in your text becomes a
clickable counter. Raise letters into glowing gold capitals and watch the
running total tick toward the target — or hit **Auto-solve** and let a
subset-sum solver arrange them for you.

## Why it's cool

Chronograms are a genuinely obscure corner of typographic history, and almost
nobody has made one interactive. The trick lands in five seconds ("hide a year
in a sentence"), it rewards fiddling, and the whole state packs into the URL
hash — so a solved inscription or an unsolved puzzle is one shareable link.

## Features

- **Tactile counters** — each numeral letter toggles between a recessed carved
  letter and a large gilded raised capital. Fully keyboard-operable (Tab to a
  letter, Enter/Space to toggle) and screen-reader labelled.
- **Live total + delta** — running sum of the raised letters against your
  target, with an over/under readout that glows on an exact match.
- **Auto-solver** — a bounded subset-sum solver over the actual supply of
  letters in your phrase lands exactly on the target when possible. When it
  can't, it raises the closest reachable total and tells you exactly what to
  add (e.g. "Add one C, two I").
- **Carved-lintel render** — raised letters large and gold, the rest incised,
  so a finished chronogram looks like a real datestone.
- **Shareable state** — phrase, target, puzzle flag, and raised-letter mask all
  serialize into the URL hash. Copy a solved link or a puzzle link (opens
  unsolved).
- **Puzzle mode** — "New puzzle" generates a target that is guaranteed solvable
  for the phrase, with a move counter and a Reveal button.
- **Export** — one-click PNG (raster) or SVG (vector) of the finished lintel.
- **Presets** — a handful of historical/classic chronograms to load and study.

## Run it

No build, no server, no dependencies. Just open the file:

```
# double-click index.html, or:
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Any modern browser works. All state — including shared puzzle/solution links —
lives in the URL hash, so `file://` works fine.

## Usage

1. **Type a phrase** in the Phrase field. Every `M D C L X V I` letter gets a
   dotted underline — those are your counters.
2. **Set a target year** (or load a preset).
3. **Click / Tab+Enter on letters** to raise them; the total updates live.
4. **Auto-solve** raises a set that hits the target exactly, or the closest set
   plus a note on what to add.
5. **Recess all** clears every raised letter.
6. **Copy solved link / Copy puzzle link** to share the current state.
7. **New puzzle** generates a guaranteed-solvable challenge; **Reveal solution**
   shows the answer.
8. **Export PNG / SVG** saves the carved lintel as an image.

### The additive rule (IV = 6, not 4)

Datestone uses the **historical additive rule**: every numeral letter counts at
its own value and they are simply summed. There is no subtractive notation, so
`IV` counts as `5 + 1 = 6`, not 4. This matches how real chronograms were
composed — inscriptions summed letter values additively rather than parsing
modern Roman-numeral syntax.

### Worked example

Phrase: **My Day Closed In Immortality** → target **1603**

The raised capitals are M, D, C, I, I, I:

```
M    = 1000
D    =  500
C    =  100
I+I+I=    3
------------
        1603
```

### URL hash format

```
#p=<phrase>&t=<year>&q=<0|1>&m=<raised-mask>
```

- `p` — the phrase (percent-encoded)
- `t` — the target year
- `q` — `1` for puzzle mode (opens unsolved), `0` otherwise
- `m` — one digit per numeral letter, in reading order: `1` = raised, `0` = recessed

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
