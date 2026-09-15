# Affine Cipher

**Encrypt & decrypt with the affine cipher** — the classic monoalphabetic substitution `E(x) = (a·x + b) mod 26`. Pick keys a and b; decryption uses the modular inverse of a. One offline HTML file, no signup, no tracking. Handy for CTFs, puzzles, and learning modular arithmetic.

👉 **[Open Affine Cipher](https://awictor.github.io/affine-cipher/)**

## How it works
Letters map to numbers (A=0 … Z=25). Encrypt with `E(x) = (a·x + b) mod 26`; decrypt with `D(y) = a⁻¹·(y − b) mod 26`. The key **a** must be coprime with 26 — a ∈ {1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25} — or the mapping isn't reversible. With a = 1 it's a Caesar shift. Case and non-letters are preserved.

## Features
- Encrypt / decrypt modes
- Key **a** dropdown limited to valid (coprime) values; live modular-inverse display
- Case preserved, non-letters passed through
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gcd`, `coprimeAs`, `modInverse`, `checkKey`, `encrypt`, `decrypt`) are covered by headless tests — the modular inverses, the canonical `AFFINE CIPHER` → `IHHWVC SWFRCP` vector, the a=1 Caesar reduction, case preservation, round-trips across all valid keys, and key validation. CI runs them on every push.

## License
MIT © Alex Wictor
