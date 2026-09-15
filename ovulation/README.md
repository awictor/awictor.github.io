# Ovulation

**Fertile window & ovulation calculator** — enter the first day of your last period and your cycle length to estimate your ovulation day, fertile window, and the dates for your next few cycles. One offline HTML file, no signup, no tracking.

👉 **[Open Ovulation](https://awictor.github.io/ovulation/)**

> ⚠️ Estimates only — not a contraceptive method and not medical advice.

## Features
- Ovulation day = cycle length − luteal phase, counted from your last period
- Six-day fertile window (five days before ovulation through the day after)
- Next-period prediction and a table of upcoming cycles
- Adjustable cycle (21–45 days) and luteal phase (10–16 days); dark mode; 100% client-side

## Why
Cycle-tracking apps hide simple date math behind accounts and ads. Ovulation does the calendar arithmetic locally — nothing about your cycle ever leaves your browser. Pairs with [PregnancyDue](https://awictor.github.io/pregnancy-due/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`addDays`, `predict`, `nextCycles`) are covered by headless tests — month-boundary and leap-year date math, the standard 28/14 cycle, longer cycles, the six-day window, input validation, and multi-cycle chaining. CI runs them on every push.

## License
MIT © Alex Wictor
