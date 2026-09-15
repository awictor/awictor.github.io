# RPN Calculator

Evaluate **Reverse Polish Notation** (postfix) expressions with a stack — `+ − * / ^ %` — and see the step-by-step stack trace. No parentheses needed, no `eval()`.

**[Open the tool →](https://awictor.github.io/rpn-calculator/)**

- Stack-based evaluation with a live per-token trace
- `5 1 2 + 4 * + 3 -` → 14
- Clear errors for underflow, leftover values, and bad tokens
- Dark mode, 100% offline, no dependencies, no tracking

## Examples

`3 4 +` → 7 · `2 3 ^` → 8 · `15 7 1 1 + - / 3 *` → 9.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
