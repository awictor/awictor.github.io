# BizDays

**Business days calculator** — add or subtract working days from a date, or count the working days between two dates, skipping weekends and any holidays you list. Perfect for SLAs, project deadlines, and payment terms. One offline HTML file, no signup, no tracking.

👉 **[Open BizDays](https://awictor.github.io/business-days/)**

## Features
- Two modes: **add/subtract** N business days, or **count** business days between dates
- Skips weekends automatically; add your own holiday list (one `YYYY-MM-DD` per line)
- Backwards works too (negative days); shows the resulting weekday
- UTC date math — no timezone or DST surprises
- Copy result, dark mode, remembers your inputs; 100% client-side; works offline

## Why
"Net 30 business days from today, minus the bank holidays" is a question spreadsheets get wrong constantly. BizDays answers it exactly, and lets you paste in the holidays that matter to you. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`addBusinessDays`, `businessDaysBetween`, `parseUTC`, `isWeekend`, `parseHolidays`) are covered by headless tests with fixed 2024 calendar vectors, holiday handling, and order-independence; CI runs them on every push.

## License
MIT © Alex Wictor
