# Changelog

## v0.1.0 — 2026-09-11

Initial release.

- Poisson PMF (exactly k), CDF (at most k), and at-least-k probabilities
- Mean = λ and standard deviation = √λ
- Stable P(k) = P(k-1)·λ/k recurrence (no factorial overflow)
- Dark mode with persistence, fully offline, no dependencies
- 10 self-tests including P(0)=e^-λ, sum-to-1, and the λ=0 edge case
