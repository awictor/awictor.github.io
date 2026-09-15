# SplitUp

**Group expense settle-up calculator** — enter who paid for what on a trip or in a shared house, and SplitUp shows each person's net balance plus the fewest "who pays whom" transfers to settle everyone up. One offline HTML file, no signup, no tracking.

👉 **[Open SplitUp](https://awictor.github.io/split-up/)**

## Features
- Add people and expenses; each expense splits equally among its participants (or everyone)
- Net balance per person (owed vs owes)
- Greedy minimal-transfer settlement — matches the biggest debtor to the biggest creditor
- Dark mode; 100% client-side

## Why
After a group trip everyone remembers paying for *something*, and untangling it is a headache. SplitUp nets it all out and hands you the shortest list of payments — no accounts, no data leaving your device. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`balances`, `settle`) are covered by headless tests — split math, balances summing to zero, single and multi-party settlements that provably zero out, the ≤(n−1) transaction bound, custom participants, cent-level rounding, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor
