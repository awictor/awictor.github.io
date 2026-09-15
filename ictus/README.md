# Ictus

**Interactive scansion in one HTML file — type verse, watch the meter reveal itself, tap a syllable to fix the beat.**

Scansion (marking the rhythm of poetry) is normally taught with a pencil and a page of diacritics. Ictus turns it into a tactile workbench: paste a line or a whole stanza and it syllabifies every word, guesses which beats are stressed, lays the syllables out as chips crowned with prosody marks, and names the meter — "iambic pentameter," "trochaic tetrameter," and so on. The heuristics are just a first proposal. The point is the **correction loop**: click a syllable to flip its stress, split or merge syllables when the counter is wrong, and watch the foot grouping, meter name, and confidence badge update live. Your text plus every manual override round-trips through the URL hash, so a fully-scanned sonnet is a link you can hand to a friend.

No dictionary, no server, no build, no dependencies. One file.

## Why it's worth a look

- English scansion has no friendly web tool — it's black-box APIs or paper.
- Ictus is honest about being a *proposal*: imperfect guesses are the starting point, not the verdict, and correcting them is the whole interaction.
- Everything is shareable by link, so annotated verse is trivially passable.

## Features

- **Heuristic syllabifier** — vowel-group counting with silent-`e`, `-le`, and silent `-ed` adjustments splits every word into tappable syllable chips.
- **Stress guesser** — a compact function-vs-content word list plus prefix / penultimate-default rules, rendered as breve (˘ unstressed) / ictus (´ stressed) marks above each chip.
- **Tap-to-correct** — click a chip to flip its stress, double-click to split a syllable, click the seam between two chips to merge them.
- **Live meter detection** — groups syllables into feet (iamb, trochee, anapest, dactyl, spondee, pyrrhic…), names the line, and shows a match-confidence badge with a count of substitutions.
- **Deviation overlay** — an amber underline flags feet that bend from the named pattern (substitutions, feminine endings), with a hover explanation.
- **Rhyme + form detection** — labels lines A/B/A/B across a stanza and recognizes sonnet / limerick / ballad shapes.
- **Silent rhythm strip** — animates the te-TUM pulse across the line as a moving highlight, with an optional (default-off) WebAudio metronome.
- **Shareable scansions** — full state (text + every manual stress and boundary override) is encoded in the URL hash.
- **Four built-in examples** — Shakespeare, Longfellow, a limerick, and Dickinson for an instant demo.

## Run it

It's a single static file. Any of these works:

- **Double-click `index.html`** (or drag it into a browser tab). Runs fully offline over `file://`.
- **Serve it** if you want share links to look like real URLs:
  ```sh
  python -m http.server 8000
  # then open http://localhost:8000
  ```

Serving over `http://` also enables one-click clipboard copy. Over `file://` the browser blocks the clipboard API, so Ictus falls back to a legacy copy path and, if that's blocked too, tells you to serve over `http://`.

## Controls

| Action | How |
|---|---|
| Flip a syllable's stress | Click the chip, or focus it and press `Enter` |
| Split a syllable | Double-click the chip |
| Merge two syllables | Click the seam between them (on touch, tap the divider) |
| Load an example | Pick from the dropdown |
| Animate the beat | **▶ Rhythm** |
| Audible metronome | **♪ Tick** (stressed 660 Hz / unstressed 392 Hz) |
| Copy the scanned line | **⧉ Copy scanned** (text with combining macron/breve marks) |
| Share this exact scansion | **🔗 Share** (copies a link encoding your overrides) |

Chips are keyboard-focusable; split/merge are easiest with a mouse.

## How the guesser works (and where it's wrong)

Ictus has no pronunciation dictionary, so it works from rules:

- **Syllables** come from counting vowel groups, then adjusting for silent final `e`, the `-le` ending, and silent `-ed`.
- **Stress** uses a function-word list (articles, prepositions, pronouns are usually unstressed) plus a prefix/penultimate default for polysyllables.
- **Meter** is a best-fit against iambic / trochaic / anapestic / dactylic patterns with a confidence score, so real verse with substitutions still gets named instead of rejected.

These rules are wrong sometimes — that's expected. Every guess is editable, and your edits are what get shared. You're scanning, not trusting a black box.

## License

MIT © Alex Wictor. See [LICENSE](LICENSE).
