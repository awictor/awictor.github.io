# Syllabary

**Grow a whole invented language from a single word.**

Type any seed phrase and Syllabary deterministically forges an entire coherent conlang: a phoneme inventory, a per-language SVG writing system, a 24-word illustrated lexicon (each with a real English gloss), an auto-coined language name, and a grammatical sample sentence. The same seed always regrows the exact same language, and the whole state lives in the URL hash — so every language you stumble onto is a shareable permalink.

## Why it's cool

A throwaway text box becomes a generative artifact you want to send to people: *"look what language `my-cat-Biscuit` makes."* Two things make the output feel real rather than random:

- **Determinism + permalinks** — a seeded PRNG (mulberry32) derives every phoneme, syllable, and glyph from your seed, so any discovery is reproducible and linkable.
- **A light sound-symbolism layer** — the semantic category of each gloss nudges phoneme choice: "big/soft/dark" concepts drift toward open sonorous forms, "sharp/small/bright" ones toward tight stops. Every language ends up internally consistent instead of noise.

One screen, one file, zero dependencies, zero network calls.

## Features

- **Seed-to-language engine** — phoneme inventory, syllable templates, and word forms all derived from your typed seed.
- **Procedural writing system** — a unique SVG glyph is generated per phoneme per language, shown on the phoneme chips, in the lexicon, and on the exported card.
- **Four expressive sliders** — Softness (sonorant vs. stop bias), Syllable Complexity (CV → CCVC templates), Vowel Richness, and Exoticness (rare phonemes/clusters) reshape the whole tongue live.
- **Morphological compounds** — words like *dew* (sun + water) or *tide* (moon + sea) are built from visible shared roots.
- **English → conlang translator** — type an English sentence and hear it word-by-word with an interlinear gloss, applying the language's adjective-order grammar trait.
- **Sample sentence** — a generated SVO sentence in the coined words with an English translation.
- **Exports** — Copy Permalink (URL hash), Copy Dictionary (Markdown of every gloss with IPA and etymology), and Download Language Card (SVG).

## Run it

No build, no install. Open the file:

```bash
# macOS
open index.html
# Linux
xdg-open index.html
# Windows
start index.html
```

Or serve it statically from the project directory:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Any modern browser works.

## Controls

| Action | How |
|---|---|
| Grow a language | Type in the **Seed phrase** box |
| Reshape the whole tongue | Drag the four **sliders** (Softness, Syllable Complexity, Vowel Richness, Exoticness) |
| Reset sliders to defaults | **Reset sliders** button |
| Fresh random language | Click the **language name**, the **⚄ random** button, or press Enter/Space on the name |
| Remint one word | Click a **lexicon tile** (or focus it and press Enter/Space) — it pulses to confirm |
| See a rough pronunciation | Hover a word for an IPA-style tooltip |
| Translate English | Type in the **"Speak English → hear it in the tongue"** box |
| Share / export | **Copy permalink**, **Copy dictionary (Markdown)**, **Download language card (SVG)** |

The seed, slider values, and any reminted words are all encoded in the URL hash, so copying the link (or the address bar) reproduces exactly what you see.

## License

MIT — see [LICENSE](LICENSE).
