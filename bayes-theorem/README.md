# Bayes' Theorem Calculator

A single-file, offline calculator for **Bayes' theorem** and medical-test interpretation. Enter prevalence, sensitivity, and specificity to get the *real* probability of disease given a positive (or negative) test — or run a general Bayes update from a prior and two likelihoods.

**Live:** https://awictor.github.io/bayes-theorem/

## Features

- **Medical test** — P(disease | positive) and residual risk after a negative
- **General Bayes** — `P(H|E) = P(E|H)·P(H) / [P(E|H)·P(H) + P(E|¬H)·P(¬H)]`
- Posterior odds after a positive result
- Dark mode, 100% offline, zero dependencies

## The base-rate surprise

A 99%-accurate test for a 1%-prevalence disease still yields only a **~50%** chance you're actually sick after a positive result — because false positives from the healthy majority swamp the true positives.

## Tests

```
node tests/selftest.mjs
```

10 checks including the canonical base-rate result and Bayes identities. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
