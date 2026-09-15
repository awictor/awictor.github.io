# Derivative Calculator

Compute the **numerical derivative** `f′(x)` of any function at a point (central difference), the **second derivative**, and the **tangent line**. Type any function of `x`; parsed by a real recursive-descent parser (no `eval()`).

**[Open the tool →](https://awictor.github.io/derivative-calculator/)**

- First derivative via central difference (O(h²) accurate)
- Second derivative and tangent line `y = f(x) + f′(x)(X − x)`
- Functions: `sin cos tan exp ln sqrt abs sinh…`, constants `pi`, `e`
- Dark mode, 100% offline, no dependencies, no tracking

## Examples

`d/dx x² at 3 = 6` · `d/dx sin(x) at 0 = 1` · tangent to `x²` at 3 is `y = 6x − 9`.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
