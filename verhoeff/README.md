# Verhoeff Check Digit

Generate and validate **Verhoeff check digits** — the dihedral-group checksum that detects **all** single-digit errors **and all** adjacent transpositions (including the phonetic swaps Luhn misses). One offline HTML file, no signup, no tracking.

👉 **[Open Verhoeff Check Digit](https://awictor.github.io/verhoeff/)**

## A note on correctness
Many copy-pasted Verhoeff implementations use a permutation table with a **corrupted row 2**, which silently lets ~3% of adjacent transpositions through. This one uses the correct table (successive powers of the generating permutation) and ships an **exhaustive transposition sweep** in the test suite to prove zero swaps slip through. Canonical vector: check digit of `236` is `3`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`verhoeffGenerate`, `appendCheck`, `verhoeffValidate`) are covered by headless tests — the canonical `236`→`3` vector, round-trips, detection of every single-digit error, the phonetic-swap case, wrong-check rejection, an exhaustive adjacent-transposition sweep (0 missed), leading zeros, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
