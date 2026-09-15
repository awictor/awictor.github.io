# Root Finder

Find a root of any equation `f(x) = 0` numerically — with the **bisection method** (bracket a sign change) or **Newton's method** (start from a guess). Type any function of `x`; parsed by a real recursive-descent parser (no `eval()`).

**[Open the tool →](https://awictor.github.io/root-finder/)**

- Bisection: robust, always converges within a bracket
- Newton: fast quadratic convergence from a single guess (numerical derivative)
- Functions: `sin cos tan exp ln sqrt abs…`, constants `pi`, `e`
- Shows the residual f(x) at the root; dark mode
- 100% offline, no dependencies, no tracking

## Examples

Root of `x² − 2` in [1, 2] → **1.41421356** (√2). `cos(x)` in [0, 2] → π/2. `x³ − x − 2` → 1.52138.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
