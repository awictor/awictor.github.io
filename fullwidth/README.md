# Full-Width Text

Convert text to **full-width Unicode** (ｆｕｌｌｗｉｄｔｈ) for that spaced-out **ｖａｐｏｒｗａｖｅ** / aesthetic look — and back to normal. It's real Unicode, so it pastes into social bios and posts anywhere. One offline HTML file, no signup, no tracking.

👉 **[Open Full-Width Text](https://awictor.github.io/fullwidth/)**

## How it works
ASCII `0x21–0x7E` maps to full-width `0xFF01–0xFF5E` (so `A`→`Ａ`, `1`→`１`), and space becomes an ideographic space. Non-ASCII (accents, emoji) passes through unchanged.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toFullWidth`, `toHalfWidth`) are covered by headless tests — the letter/digit/punctuation mappings, the ideographic space, reversal, a full-ASCII-range round-trip, non-ASCII passthrough, mixed strings, length preservation, empty input, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
