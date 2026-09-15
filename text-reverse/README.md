# TextReverse

**Reverse & flip text** — reverse characters, reverse word order, reverse line order, or flip text upside down. Emoji-safe. One offline HTML file, no signup, no tracking.

👉 **[Open TextReverse](https://awictor.github.io/text-reverse/)**

## Features
- Reverse characters (code-point aware — emoji stay intact)
- Reverse word order and line order
- Upside-down flip (ɐ, q, ɔ, …) for social bios and fun
- Live output, one-click copy, dark mode, remembers input
- 100% client-side; works offline

## Why
A quick, no-nonsense reverser that handles the cases naive `split('').reverse()` breaks on — emoji and combined characters — plus word/line reversal and the upside-down trick. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`reverseChars`, `reverseWords`, `reverseLines`, `upsideDown`, `transform`) are covered by headless regression tests, including emoji-safety and the upside-down mapping; CI runs them on every push.

## License
MIT © Alex Wictor
