# Numerical Integrator

Compute a **definite integral** `∫ₐᵇ f(x) dx` with the composite **Simpson's rule**. Type any function of `x` — powers, `sin/cos/tan/exp/ln/sqrt/abs/sinh…`, and constants `pi`, `e`. Parsed by a real recursive-descent parser (no `eval()`).

**[Open the tool →](https://awictor.github.io/numerical-integration/)**

- Simpson's rule — exact for polynomials up to degree 3, O(h⁴) convergence
- Limits accept expressions too (e.g. `pi`)
- Adjustable interval count (auto-forced even)
- Dark mode, 100% offline, no dependencies, no tracking

## Examples

`∫₀^π sin(x) dx = 2` · `∫₀¹ x² dx = 0.333…` · `∫₀¹ eˣ dx = e − 1 ≈ 1.71828`

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
