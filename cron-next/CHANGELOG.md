# Changelog

## 0.1.0
- First release. Cron next-run previewer.
- Parses 5-field cron (star, list, range, step); computes next N run times in UTC.
- Correct DOM/DOW OR semantics; weekday-7 normalization; presets & validation.
- Relative countdown, dark mode, localStorage memory.
- Headless test suite (11 checks, fixed UTC reference dates) + CI.
