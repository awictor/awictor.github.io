# Polynomial Calculator

Add, multiply, differentiate, and integrate **polynomials**, and evaluate them by **Horner's method**. Enter coefficients lowest-power first; no `eval()`.

**[Open the tool →](https://awictor.github.io/polynomial/)**

- Sum, product, derivative, and indefinite integral
- Fast, stable Horner evaluation at any x
- Readable polynomial output
- Dark mode, 100% offline, no dependencies, no tracking

## Example

`1, 2, 3` = 1 + 2x + 3x²; at x=2 → **17**. (x+1)·(x+1) = x² + 2x + 1.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
