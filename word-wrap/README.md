# WordWrap

**Reflow & hard-wrap text** — wrap text to a fixed column width (72, 80, 100…) for git commit bodies, plain-text email and code comments, or unwrap it back into single lines. Preserves paragraphs. One offline HTML file, no signup, no tracking.

👉 **[Open WordWrap](https://awictor.github.io/word-wrap/)**

## Features
- Greedy word wrap to any column width, with width presets (72 / 80 / 100)
- Paragraph-aware: blank-line boundaries are kept, internal breaks collapsed before reflow
- Optional "break long words" for URLs/tokens that exceed the width
- **Unwrap** mode joins each paragraph back into a single line
- Copy button, dark mode; 100% client-side; works offline

## Why
The 72-column git commit body and 80-column terminal conventions are easy to violate and annoying to fix by hand. WordWrap reflows cleanly, and unwrap lets you paste a hard-wrapped block back into something that wants long lines. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`wrapLine`, `wrapText`, `unwrap`) are covered by headless tests — greedy fill, width bounds, long-word breaking, paragraph preservation, and wrap↔unwrap round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
