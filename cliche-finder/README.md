# Cliché Finder

**Spot the tired phrases in your writing.** Flags clichés and business-speak — "at the end of the day", "low-hanging fruit", "circle back", "synergy", "move the needle" — with inline highlighting and a count, so you can swap in plain, specific language. One offline HTML file, no signup, no tracking.

👉 **[Open Cliché Finder](https://awictor.github.io/cliche-finder/)**

## Features
- ~60 common clichés and corporate buzzwords
- Inline highlight + a chip list of what was found (with counts)
- Hyphen/space tolerant ("low-hanging" = "low hanging"); word-boundary safe; no double-counting
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`findCliches`, `summarize`) are covered by headless tests — multi-word and single-word matches, case-insensitivity, ordering, clean text, hyphen/space variation, word boundaries, overlap de-duplication, and counts. CI runs them on every push.

## License
MIT © Alex Wictor
