# Function Grapher

Plot any function `y = f(x)` over a range as a crisp **SVG graph** with auto-scaled axes and grid. Type powers, `sin/cos/tan/exp/ln/log/sqrt/abs`, and constants `pi`, `e` — parsed by a real recursive-descent parser (no `eval()`).

**[Open the tool →](https://awictor.github.io/function-grapher/)**

- Hundreds of sample points, auto y-axis scaling
- Discontinuities break the line (no false verticals for `1/x`, `tan`, `sqrt`)
- Vector SVG output — sharp at any size
- Dark mode, 100% offline, no dependencies, no tracking

## Examples

`sin(x)` over [−2π, 2π] · `x³ − x` · `exp(-x^2)` (a Gaussian bell) · `1/x`.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
