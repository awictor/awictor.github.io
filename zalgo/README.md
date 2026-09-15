# Zalgo Text

Turn text into glitchy **Zalgo / cursed text** with adjustable intensity — and strip it back to normal. Real Unicode combining marks, so it pastes anywhere (some apps clamp it). One offline HTML file, no signup, no tracking.

👉 **[Open Zalgo Text](https://awictor.github.io/zalgo/)**

## How it works
Stacks combining diacritical marks (U+0300–U+036F) on each non-space character. "Clean" removes all combining marks to recover the original text.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`zalgo`, `stripZalgo`) are covered by headless tests (with a seeded RNG for determinism) — the mark range, the strip/zalgo round-trip across inputs and intensities, length growth, the intensity-0 no-op, whitespace handling, determinism, seed variation, plain-text passthrough, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
