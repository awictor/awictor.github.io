# Changelog

## 0.1.0
- First release. Cron expression explainer: plain-English description + next 5 run times (UTC).
- Full 5-field syntax: `*`, `*/n`, ranges, steps, lists, month/weekday names, and `@macros`.
- Correct Vixie DOM-or-DOW semantics; `7` accepted as Sunday; live validation.
- Example chips, dark mode, localStorage memory.
- Headless test suite (7 checks incl next-run math) + CI.
