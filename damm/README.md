# Damm Check Digit

Generate and validate **Damm check digits** — a single-digit checksum that detects **all** single-digit errors **and all** adjacent transpositions, using one 10×10 totally anti-symmetric quasigroup table (no permutation or inverse tables, unlike Verhoeff). One offline HTML file, no signup, no tracking.

👉 **[Open Damm Check Digit](https://awictor.github.io/damm/)**

## How it works
Start an interim digit at 0; for each input digit set `interim = table[interim][digit]`. The final interim value is the check digit; a full number validates when the process ends at 0. Canonical example: the check digit of `572` is `4`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dammGenerate`, `appendCheck`, `dammValidate`) are covered by headless tests — the Latin-square/zero-diagonal table properties, the canonical vector, round-trips, detection of every single-digit error, an exhaustive adjacent-transposition sweep (0 missed), wrong-check rejection, leading zeros, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
