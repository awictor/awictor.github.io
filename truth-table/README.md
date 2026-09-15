# Truth Table Generator

Generate the complete **truth table** for any boolean expression — every combination of inputs and the resulting output — with a real tokenizer and recursive-descent parser. For digital-logic design, discrete math, and checking logical identities.

**[Open the tool →](https://awictor.github.io/truth-table/)**

- Operators as words or symbols: `and`/`&&`/`&`, `or`/`||`/`|`, `not`/`!`/`~`, `xor`/`^`, parentheses
- Precedence NOT → AND → XOR → OR, overridable with parentheses
- Detects tautologies and contradictions
- Any letter variables, listed alphabetically (up to 12)
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

`A and (B or not C)` → an 8-row table over A, B, C. `not (A and B)` equals `(not A) or (not B)` — De Morgan's law.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
