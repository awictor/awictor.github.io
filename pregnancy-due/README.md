# PregnancyDue

**Pregnancy due date & gestational age calculator** — enter your last menstrual period (LMP), a conception date, or a known due date and get the estimated due date (Naegele's rule), current gestational age in weeks + days, trimester, and estimated conception date. One offline HTML file, no signup, no tracking.

👉 **[Open PregnancyDue](https://awictor.github.io/pregnancy-due/)**

> ⚠️ **Educational estimate.** Naegele's rule assumes a ~28-day cycle and regular ovulation. Your real due date should come from your clinician (usually confirmed by ultrasound). Not medical advice.

## Features
- Start from LMP, conception date, or a known EDD — everything is derived consistently
- Cycle-length adjustment for non-28-day cycles
- Current gestational age (weeks + days), trimester, and days remaining "as of" any date
- Dark mode; remembers your inputs; **100% client-side** (health data never leaves the page)

## Why
Due-date math is fiddly (280 days, cycle adjustments, weeks-and-days), and most calculators online want your data. PregnancyDue does it locally and privately. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`eddFromLmp`, `conceptionFromLmp`, `lmpFromEdd`, `gestationalAge`, `trimester`, `addDays`) are covered by headless tests, including leap-year EDD, cycle adjustments, inverse relationships, and trimester boundaries; CI runs them on every push.

## License
MIT © Alex Wictor
