# BirthdayParadox

**Shared-birthday probability calculator** — find the chance that at least two people in a group share a birthday, or the group size needed to hit a target probability. One offline HTML file, no signup, no tracking.

👉 **[Open BirthdayParadox](https://awictor.github.io/birthday-paradox/)**

## Features
- Probability of a shared birthday for any group size (with a slider and bar)
- Inverse: smallest group for a target probability
- Adjustable "number of days" for the general birthday problem
- Dark mode; 100% client-side

## Why
It surprises everyone: just **23 people** gives a better-than-even chance of a shared birthday, and 57 people reach 99%. BirthdayParadox computes the exact odds offline — a great teaching and party-trick tool. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sharedProbability`, `peopleForProbability`) are covered by headless tests — the 23→50.7% and 70→99.9% values, small groups, the pigeonhole certainty at n>days, monotonicity, the 50%→23 / 99%→57 inverses, custom day counts, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
