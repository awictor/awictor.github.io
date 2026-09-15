# Small Caps Text

Convert text to **Unicode small caps** (ꜱᴍᴀʟʟ ᴄᴀᴘꜱ) — the tidy typographic look for social bios and headings. Real Unicode, so it pastes anywhere. One offline HTML file, no signup, no tracking.

👉 **[Open Small Caps Text](https://awictor.github.io/small-caps/)**

## How it works
Lowercase `a–z` map to small-capital glyphs; actual capitals stay full height (that's the small-caps convention). A couple of letters (q, x) lack a standard small-cap glyph and are left as-is.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`MAP`, `toSmallCaps`) are covered by headless tests — full 26-letter coverage, specific mappings, word conversion, capital preservation, digit/punctuation passthrough, the q/x fallback, one-char-per-char length, whitespace preservation, empty input, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
