# Passphrase Generator

Generate **memorable but strong passphrases** from random words — the "correct-horse-battery-staple" approach — with a real entropy (bits) and crack-time readout. Crypto-random and 100% offline; nothing leaves your browser.

👉 **[Open Passphrase Generator](https://awictor.github.io/passphrase/)**

## Why word passphrases?
Four random words from a large list are easier to remember than `xK7#qW2!` and often stronger. Entropy is `words × log₂(list size)`. Words are chosen with `crypto.getRandomValues` and **unbiased rejection sampling** to avoid modulo bias.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`entropyBits`, `unbiasedIndex`, `crackTime`, `buildPassphrase`) are covered by headless tests — the entropy formula, monotonicity, a duplicate-free wordlist (so the entropy claim is honest), range and uniformity of the sampler, explicit rejection of biased draws, crack-time scaling, formatting, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
