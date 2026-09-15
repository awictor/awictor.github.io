# Expression Calculator

A scientific **math expression evaluator** built on a real recursive-descent parser — not JavaScript's `eval()`, so it's safe. Type an expression and get the answer with correct operator precedence.

**[Open the tool →](https://awictor.github.io/expression-calculator/)**

- Operators: `+ − × ÷ %`, right-associative `^`, unary minus, parentheses, postfix `!`
- Functions: `sin cos tan asin acos atan sqrt cbrt ln log log2 exp abs floor ceil round sign` (trig in radians)
- Constants: `pi`, `e`, `tau`
- Live result, tap-to-insert chips, dark mode
- 100% offline, no dependencies, no `eval()`, no tracking

## Examples

`2 + 3 * 4 = 14` · `2^3^2 = 512` · `-2^2 = -4` · `5! = 120` · `log(1000) = 3` · `2 * pi ≈ 6.2832`

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
