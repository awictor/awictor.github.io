# DtiCalc

**Debt-to-income ratio calculator** — enter your income and monthly debts to get your front-end and back-end DTI ratios, a verdict against the 28/36 rule, and how much borrowing room is left. One offline HTML file, no signup, no tracking.

👉 **[Open DtiCalc](https://awictor.github.io/dti-calc/)**

## Features
- **Front-end** (housing ÷ income) and **back-end** (all debt ÷ income) ratios
- Pass/fail against the classic **28/36** lender guidelines, with a Good / Manageable / High category
- Remaining monthly debt capacity before hitting the 36% guideline
- Dark mode; 100% client-side

## Why
Lenders decide mortgages largely on DTI, but the front-end/back-end distinction and the 28/36/43 thresholds are easy to muddle. DtiCalc computes both ratios and tells you where you stand, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not financial advice
Thresholds vary by lender and loan program. Use this to understand your ratios, not as a guarantee of approval.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`analyze`, `category`, `maxDebtForRatio`) are covered by headless tests — ratio math, back ≥ front invariant, 28/36 flags, category boundaries, remaining-capacity (including going over), and validation. CI runs them on every push.

## License
MIT © Alex Wictor
