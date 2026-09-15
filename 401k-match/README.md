# 401(k) Match Calculator

**Maximize your employer 401(k) match.** Enter your salary, contribution %, and your employer's match rate and cap to see your contribution, the employer's contribution, the yearly total — and how much free match you're leaving on the table. One offline HTML file, no signup, no tracking.

👉 **[Open 401(k) Match Calculator](https://awictor.github.io/401k-match/)**

## How matching works
A common formula is "50% up to 6%": the employer adds 50¢ per $1 you contribute, on the first 6% of salary. Contribute at least the cap to capture the full match. The employer match does not count against the 2025 employee deferral limit ($23,500).

## Features
- Your contribution, employer match, and total
- "Money left on the table" warning when under-contributing
- Match cap handling (over-contributing doesn't over-match)
- 2025 deferral-limit note; dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
The pure function (`match`) is covered by headless tests — the classic 50%/6% case, under- and over-contributing, dollar-for-dollar match, no-match, salary scaling, effective %, and validation. CI runs them on every push.

## Not financial advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
