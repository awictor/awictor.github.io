# Continued Fraction

A single-file, offline tool that expands any number into its **continued fraction** and lists the **convergents** — the best rational approximations for their size (like 22/7 and 355/113 for π).

**Live:** https://awictor.github.io/continued-fraction/

## Features

- **Continued fraction** expansion `[a₀; a₁, a₂, …]`
- **Convergents** table: fraction, decimal, and error at each step
- Terminates cleanly for rationals; reveals the elegant patterns of e, φ, √2
- Preset chips for π, e, √2, φ
- Dark mode, 100% offline, zero dependencies

## Why it's neat

Convergents are provably the best rational approximation with a denominator that small. That's why 355/113 — accurate to six decimals — shows up as π's fourth convergent.

## Tests

```
node tests/selftest.mjs
```

10 checks with known expansions (π, e, 415/93) and convergent recurrences. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
