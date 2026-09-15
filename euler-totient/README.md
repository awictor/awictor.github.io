# Euler's Totient

A single-file, offline calculator for **Euler's totient** φ(n) — how many integers up to n are coprime to it — with the prime factorization shown alongside.

**Live:** https://awictor.github.io/euler-totient/

## Features

- **φ(n)** via the product formula `n · ∏(1 − 1/p)`
- **Prime factorization** of n
- gcd and coprimality helpers
- Dark mode, 100% offline, zero dependencies

## Why it matters

The totient is the backbone of **RSA** (choosing key exponents) and Euler's theorem, `a^φ(n) ≡ 1 (mod n)`. For a prime p, φ(p) = p − 1; φ(36) = 12.

## Tests

```
node tests/selftest.mjs
```

10 checks including prime/prime-power formulas, multiplicativity, and Gauss's divisor-sum identity. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
