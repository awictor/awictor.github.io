# Leetspeak

**l33t sp34k translator** — convert text to leetspeak at basic or full intensity, and decode leet back to letters (best effort). One offline HTML file, no signup, no tracking.

👉 **[Open Leetspeak](https://awictor.github.io/leetspeak/)**

## Features
- **Basic** (a4 e3 i1 o0 t7 s5) and **Full** (adds l1 g9 b8 z2 c( ) intensities
- **Decode** mode maps common leet symbols back to letters
- Case-insensitive; preserves spaces and punctuation
- Dark mode; 100% client-side

## Why
Leetspeak is a staple of gaming handles, passwords-people-shouldn't-use, and internet nostalgia. Leetspeak translates both ways offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Note
Decoding is best-effort: some leet symbols are ambiguous (`1` could be `i` or `l`), so a decode won't always reproduce the original.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`leetify`, `deleet`) are covered by headless tests — basic vs full maps, the classic `leet → 1337`, case-insensitivity, punctuation preservation, best-effort decode, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
