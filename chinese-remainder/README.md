# Chinese Remainder Theorem

A single-file, offline solver for systems of congruences `x ≡ a (mod n)`. Uses the extended Euclidean algorithm to combine congruences pairwise, so it handles non-coprime moduli and detects inconsistency.

**Live:** https://awictor.github.io/chinese-remainder/

## Features

- Solve any number of simultaneous congruences → `x ≡ r (mod lcm)`
- Works with **non-coprime** moduli (general CRT), throws on inconsistency
- Exposes **extended GCD** (Bézout coefficients) and **modular inverse**
- Exact BigInt arithmetic internally
- Dark mode, 100% offline, zero dependencies

## Example

Sunzi's problem — remainders 2, 3, 2 modulo 3, 5, 7 → **x = 23**.

## Tests

```
node tests/selftest.mjs
```

10 checks including Sunzi's problem, non-coprime combination, inconsistency detection, and egcd/inverse identities. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
