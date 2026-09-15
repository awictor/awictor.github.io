# Entropy

**Shannon entropy calculator** — measure the information content of any text: entropy per symbol (bits), total entropy, and the character-frequency distribution. Useful for gauging the randomness of keys, tokens and passwords, or the compressibility of data. One offline HTML file, no signup, no tracking.

👉 **[Open Entropy](https://awictor.github.io/entropy-calc/)**

## Features
- Shannon entropy `H = −Σ p·log₂p` (bits/symbol) and total bits (H × length)
- Length and unique-symbol counts
- Character-frequency bars (whitespace visualized)
- Dark mode; remembers your input; 100% client-side; works offline

## Why
Entropy is the precise, distribution-based measure of randomness — repetitive text scores low, uniformly random text approaches log₂(alphabet size). Unlike a heuristic password meter, Entropy reports the actual information content of the exact string you paste. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`shannonEntropy`, `frequencies`, `totalBits`, `metrics`) are covered by headless tests — uniform (1/2/3-bit) and skewed distributions, the log₂(unique) upper bound, and order-independence; CI runs them on every push.

## License
MIT © Alex Wictor
