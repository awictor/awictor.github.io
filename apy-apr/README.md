# ApyApr

**APR ↔ APY interest rate converter** — convert between a nominal annual rate (APR) and the effective annual yield (APY / EAR) at any compounding frequency: daily, monthly, quarterly, semiannual, annual, or continuous. One offline HTML file, no signup, no tracking.

👉 **[Open ApyApr](https://awictor.github.io/apy-apr/)**

## Features
- Both directions: APR → APY and APY → APR
- Compounding: annual, semiannual, quarterly, monthly, daily, and continuous (`e^r`)
- Side-by-side table across every frequency so you can see how compounding widens the gap
- Dark mode; remembers your inputs; 100% client-side; works offline

## Why
Banks quote savings as APY and loans as APR, which makes offers hard to compare. ApyApr puts them on the same basis, exactly — including the continuous-compounding limit. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`aprToApy`, `apyToApr`) are covered by headless tests — the monthly 12%→12.6825% vector, continuous `e^r`/`ln(1+y)`, inverse round-trips, monotonicity in frequency, and guards; CI runs them on every push.

## License
MIT © Alex Wictor
