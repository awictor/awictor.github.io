# Coinery

**A word mint that strikes brand-new English words — with etymology-true definitions.**

Coinery forges words that never existed but sound like they should, assembling each
one from a curated bank of real morphemes (Greek, Latin, and Old-English prefixes,
roots, and suffixes). The trick: the definition isn't flavor text. It's built
grammatically from the literal glosses of the exact morphemes used, so every coinage
is internally consistent. `nyctophile (n.) — one who loves the night` comes straight
from *nykt-* (night) + *-phile* (lover of). You can reverse-engineer the meaning from
the parts, which is what makes it feel like a real dictionary entry.

## Why it's cool

- The words land on the delightful line between plausible and absurd — quietly cut from
  a dictionary that doesn't exist.
- Meaning is **derived, not faked**, so the toy teaches word-building while it entertains.
- Everything is **deterministic**: the seed lives in the URL hash, so any coin you strike
  is a permanent, shareable link that regenerates the exact same entry for anyone.

## Features

- **Morpheme bank baked in** — 31 prefixes, 44 roots, 28 suffixes, each tagged with a
  gloss and origin language (Gk / Lat / OE).
- **Phonotactic smoothing** — roots blend naturally: adjacent vowels elide, and Greek
  `-o-` / Latin `-i-` connecting vowels are inserted so `cosmo + logy → Cosmology`.
- **Definition synthesis** — composed from the constituent glosses via part-of-speech-aware
  templates, so the meaning always matches the parts.
- **Part of speech inferred from the suffix** (`-ous` → adj, `-ify` → verb, `-phile` → noun…).
- **Full dictionary card** — embossed coin medallion, POS, syllable-respelled pronunciation
  with a stress mark, color-coded etymology chips (by origin language), and a generated
  example sentence.
- **Clickable etymology** — click any morpheme chip to mint a strip of related coinages
  that share that exact root.
- **Shareable seeds** — seed plus all three dials live in the URL hash; deep-links
  regenerate the exact coin. The Word of the Day is derived from the UTC date, so it's
  the same word for everyone.
- **Coin tray** — pin/unpin favorites (saved to `localStorage`), export/import as JSON,
  copy any entry as plain text or as a PNG card, and print a dictionary page of your
  collection.

## Run it

No build, no server, no dependencies — it's a single self-contained HTML file.

```
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or just double-click `index.html`.

> **Clipboard note:** browsers restrict clipboard access on `file://` origins. Coinery
> falls back gracefully (Copy text uses a textarea fallback; Copy card image downloads
> the PNG instead). To get full native clipboard behavior, serve it over HTTP:
>
> ```
> python -m http.server
> # then open http://localhost:8000
> ```

## Controls

| Control | What it does |
|---|---|
| **Strike a coin** | Mint a fresh random word. `Space` / `Enter` also strikes. |
| **Length** | 2 (compound) / 3 (triadic) / 4 (quadratic) morpheme shapes. |
| **Origin** | Mixed, Pure Greek, or Pure Latin morpheme pools. |
| **Register** | Common, Scholarly, or Arcane suffix bands. |
| **Word of the Day** | Load today's deterministic coin (keeps your current dials). |
| **Pronounce** | Speak the headword via the Web Speech API. |
| **Copy text** / **Copy card image** | Copy the entry as plain text or a PNG card. |
| **Pin** | Add the current coin to the Coin Tray. |
| **Etymology chips** | Click any part to mint related words sharing that morpheme. |

Every word here is invented. Definitions are composed from the literal glosses of real
morphemes.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
