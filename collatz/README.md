# Collatz Conjecture

Trace the **Collatz (3n+1) sequence** for any positive integer — the full path, the number of steps to reach 1, and the peak value along the way. One offline HTML file, no signup, no tracking.

👉 **[Open Collatz Conjecture](https://awictor.github.io/collatz/)**

## The rule
If n is even, halve it; if odd, `3n + 1`. Repeat until you reach 1. Starting from **27** the path climbs to a peak of **9,232** over **111** steps — the classic surprise.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`collatzNext`, `collatzSequence`, `collatzSteps`, `collatzMax`) are covered by headless tests: the 6 and 7 sequences, the famous 27 → 111 steps / peak 9232, all sequences 1–500 ending at 1, powers-of-two step counts, per-step rule consistency, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
