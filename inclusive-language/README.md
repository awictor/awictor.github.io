# Inclusive Language Checker

**Catch non-inclusive words and get better alternatives.** Flags common tech metaphors (whitelist/blacklist, master/slave), gendered job words (chairman, manpower), casual ableist terms (crazy, lame, dummy), and "guys" for mixed groups — with inclusive suggestions. Works on prose and code. One offline HTML file, no signup, no tracking.

👉 **[Open Inclusive Language](https://awictor.github.io/inclusive-language/)**

## Features
- ~30 flagged terms with neutral suggestions
- Inline highlight + a suggestions table with counts
- Word-boundary safe, space/hyphen tolerant, no double-counting
- Dark mode; 100% client-side

## Note
Context matters — these are prompts to reconsider, not hard rules. You decide what fits.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`findTerms`, `summarize`) are covered by headless tests — term matching and suggestions, case-insensitivity, multi-word/hyphen variants, word boundaries, ordering, overlap de-duplication, and counts. CI runs them on every push.

## License
MIT © Alex Wictor
