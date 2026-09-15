# StrengthCheck

**Password strength analyzer** — paste a password to see its entropy, character variety, estimated offline crack time, and specific warnings. Everything runs in your browser; **nothing is stored or transmitted**. One offline HTML file, no signup.

👉 **[Open StrengthCheck](https://awictor.github.io/strength-check/)**

## Features
- Entropy in bits and a strength label (very weak → very strong)
- Character-class detection (lower, upper, digits, symbols)
- Estimated crack time against a fast offline attacker
- Warnings: too short, low variety, or a known common password
- Show/hide toggle, dark mode
- 100% client-side; works offline — your password never leaves your device

## Why
Password managers score strength, but you can't safely test an arbitrary password online without leaking it. StrengthCheck does it locally. Want to *generate* a strong one? See [PassForge](https://awictor.github.io/pass-forge/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`charPool`, `entropyBits`, `strengthLabel`, `crackTimeText`, `checkPassword`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
