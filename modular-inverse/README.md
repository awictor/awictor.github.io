# Modular Inverse

Find the **modular multiplicative inverse** of `a mod m` — the `x` with `a·x ≡ 1 (mod m)` — using the **extended Euclidean algorithm**. It exists only when a and m are coprime. Essential in RSA key generation and modular arithmetic. One offline HTML file, no signup, no tracking.

👉 **[Open Modular Inverse](https://awictor.github.io/modular-inverse/)**

## How it works
The extended Euclidean algorithm returns the Bézout coefficients where `a·x + m·y = gcd(a, m)`; when gcd = 1, x (mod m) is the inverse.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`extendedGcd`, `modInverse`) are covered by headless tests: known inverses, the a·inverse ≡ 1 property over all coprime pairs to m=60, Bézout's identity, normalization of large/negative a, the no-inverse-when-not-coprime case, prime-modulus invertibility, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
