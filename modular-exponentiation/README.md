# Modular Exponentiation

Compute **(base ^ exponent) mod m** efficiently with **exponentiation by squaring** — the core operation of RSA and Diffie-Hellman. BigInt-backed, so exponents in the thousands are instant and exact. One offline HTML file, no signup, no tracking.

👉 **[Open Modular Exponentiation](https://awictor.github.io/modular-exponentiation/)**

## How it works
Square the base and reduce mod m at each bit of the exponent — about log₂(n) multiplications instead of n. Classic example: `4^13 mod 497 = 445`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`modpowBig`, `modpow`) are covered by headless tests: basic vectors, the 4^13 mod 497 example, exponent-0/base-0/modulus-1 edge cases, agreement with a naive reference, Fermat's little theorem, a huge-exponent BigInt cross-check, negative-base normalization, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
