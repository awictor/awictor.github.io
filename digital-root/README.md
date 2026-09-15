# Digital Root

Compute the **digit sum**, **digital root**, and **additive persistence** of any whole number, with the full digit-sum chain. One offline HTML file, no signup, no tracking.

👉 **[Open Digital Root](https://awictor.github.io/digital-root/)**

## How it works
Repeatedly sum digits until one remains — that's the digital root; the number of steps is the additive persistence. Shortcut: digital root = `1 + (n − 1) mod 9` (0 for zero), the basis of casting out nines.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`digitSum`, `digitalRoot`, `additivePersistence`, `chain`) are covered by headless tests: known values, single-digit identity, the mod-9 formula over 2000 values, agreement with naive summing, multiples-of-9, persistence, the chain, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
