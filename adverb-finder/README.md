# Adverb Finder

**Spot the -ly adverbs in your writing** so you can cut them for stronger verbs — the classic Hemingway-style edit. Highlights adverbs inline with a count and density, and skips common non-adverb "-ly" words. One offline HTML file, no signup, no tracking.

👉 **[Open Adverb Finder](https://awictor.github.io/adverb-finder/)**

## Why
"ran quickly" is usually weaker than "sprinted"; "-ly" adverbs often signal a verb that could do more work. This flags them so you can decide — a few are fine, but a high density is a smell.

## Features
- Highlights `-ly` adverbs inline; count and density
- Excludes ~70 non-adverb `-ly` words (family, reply, only, friendly, likely, daily…)
- Case-insensitive; dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isAdverb`, `findAdverbs`, `wordCount`, `summarize`) are covered by headless tests — recognizing clear adverbs, excluding non-adverbs and short/non-`-ly` words, case-insensitivity, match positions, word count, and density. CI runs them on every push.

## License
MIT © Alex Wictor
