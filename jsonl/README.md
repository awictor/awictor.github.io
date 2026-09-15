# JSONLines

**JSON array ⇄ JSONL converter** — turn a JSON array into JSONL (one JSON value per line) and back. JSONL is the standard format for ML training data, LLM fine-tuning, and log streams. One offline HTML file, no signup, no tracking.

👉 **[Open JSONLines](https://awictor.github.io/jsonl/)**

## Features
- **Array → JSONL**: each element on its own compact line
- **JSONL → Array**: parses each line into a pretty-printed JSON array
- Skips blank lines; reports the exact line number on a parse error
- Record counts; copy-ready output; dark mode; 100% client-side

## Why
Datasets for fine-tuning and evaluation ship as JSONL, but editors and APIs often hand you a JSON array (or vice versa). JSONLines converts cleanly in both directions, offline — your data never leaves the browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toJsonl`, `fromJsonl`, `lineCount`) are covered by headless tests — one-value-per-line output, non-array/parse-error rejection, blank-line skipping, bad-line reporting, pretty-printing, round-trips, and nested objects. CI runs them on every push.

## License
MIT © Alex Wictor
