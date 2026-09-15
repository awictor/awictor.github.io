# Levenshtein Distance

Compute the [Levenshtein edit distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between two strings — the minimum number of single-character **insertions, deletions, or substitutions** to turn one into the other — plus a normalized similarity percentage.

**[Open the tool →](https://awictor.github.io/levenshtein/)**

- Live edit distance and similarity as you type
- Dynamic-programming algorithm, O(m·n), single-file
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

`kitten → sitting` = **3** edits (k→s, e→i, insert g), similarity ≈ 57%.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
