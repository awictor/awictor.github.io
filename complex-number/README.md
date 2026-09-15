# Complex Number Calculator

A single-file, offline complex-number calculator. Add, subtract, multiply, and divide complex numbers, and get the modulus, argument, conjugate, and polar form.

**Live:** https://awictor.github.io/complex-number/

## Features

- **Arithmetic** — `+ − × ÷` on `a + bi`
- **Modulus** `√(a²+b²)` and **argument** (degrees)
- **Conjugate** and **polar form** `r ∠ θ`
- Exact component arithmetic; dark mode; 100% offline; zero dependencies

## Reminders

`i² = −1`, `(1+i)² = 2i`, `1/i = −i`, and `z·conj(z) = |z|²`.

## Tests

```
node tests/selftest.mjs
```

10 checks including i²=−1, division↔multiplication inversion, and polar round-trips. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
