# RailFence

**Rail Fence cipher encoder / decoder** — encode and decode text with the classic zigzag transposition cipher for any number of rails, with a live zigzag preview. One offline HTML file, no signup, no tracking.

👉 **[Open RailFence](https://awictor.github.io/rail-fence/)**

## Features
- Encode and decode for any rail count
- Live zigzag grid showing how the text is laid across the rails
- Preserves every character (spaces, punctuation) — an exact round-trip
- Dark mode; 100% client-side

## Why
The rail fence cipher is a classic puzzle and a great illustration of transposition (rearranging, not substituting, characters). RailFence runs it both ways offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not secure
Transposition ciphers are trivially broken. Use it for puzzles and learning, never for real secrets.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`railPattern`, `encode`, `decode`) are covered by headless tests — the classic `WEAREDISCOVEREDFLEEATONCE` (3 rails) vector, round-trips across rail counts, the one-rail identity, rails-larger-than-text, character-permutation preservation, the zigzag pattern, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
