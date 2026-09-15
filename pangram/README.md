# Pangram Checker

Check whether text is a **pangram** (uses all 26 letters), see which letters are **missing**, and detect a **perfect pangram** (each letter exactly once). Handy for font specimens and keyboard tests. One offline HTML file, no signup, no tracking.

👉 **[Open Pangram Checker](https://awictor.github.io/pangram/)**

## Tests
```
node tests/selftest.mjs
```
Pure functions (`lettersUsed`, `missingLetters`, `isPangram`, `letterCounts`, `isPerfectPangram`) are covered by headless tests — letter collection, the classic pangram, sorted missing letters, perfect-pangram detection, the not-perfect case, letter counts, case-insensitivity, ignoring non-letters, the empty case, and a single-missing-letter catch. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
