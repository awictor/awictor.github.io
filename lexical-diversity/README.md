# Lexical Diversity

**Measure the vocabulary richness of any text.** Get the type-token ratio (TTR), unique vs total words, hapax legomena (words used once), and Guiraud's length-stable index. One offline HTML file, no signup, no tracking.

👉 **[Open Lexical Diversity](https://awictor.github.io/lexical-diversity/)**

## Metrics
- **TTR** = unique ÷ total words (drops with length — compare similar sizes)
- **Guiraud's index** = types ÷ √tokens (more length-stable)
- **Hapax legomena** = words appearing exactly once
- Most-common word and counts; case-insensitive, punctuation ignored

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenize`, `types`, `ttr`, `hapax`, `guiraud`, `mostCommon`, `summarize`) are covered by headless tests — tokenization, unique counts, TTR/Guiraud math, hapax, tie-breaking, case-insensitivity, empty text, and the repetition→lower-TTR relationship. CI runs them on every push.

## License
MIT © Alex Wictor
