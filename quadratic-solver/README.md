# Quadratic Solver

Solve any quadratic **ax² + bx + c = 0** — discriminant, **real or complex roots**, and the parabola's vertex. One offline HTML file, no signup, no tracking.

👉 **[Open Quadratic Solver](https://awictor.github.io/quadratic-solver/)**

## How it works
`x = (−b ± √(b²−4ac)) / 2a`. The discriminant b²−4ac gives two real roots (>0), one repeated (=0), or complex conjugates (<0). Vertex at x = −b/2a.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`discriminant`, `vertexX`, `solve`) are covered by headless tests: real/repeated/complex/irrational cases, roots satisfying the equation, Vieta's sum/product, the vertex formula, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
