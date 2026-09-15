# GradeCalc

**Weighted grade calculator** — enter your assignments with a score and weight to get your weighted course grade and letter, plus a planner for exactly what you need on the final to hit your target. One offline HTML file, no signup, no tracking.

👉 **[Open GradeCalc](https://awictor.github.io/grade-calc/)**

## Features
- Weighted average across assignments (weights can be any numbers — they're normalized)
- Letter grade (A–F)
- "What do I need on the final?" planner, with reachable/secured messaging
- Dark mode, remembers your entries
- 100% client-side; works offline

## Why
Students constantly ask "what's my grade?" and "what do I need on the final?". GradeCalc answers both, locally and instantly. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`weightedAverage`, `gradeLetter`, `neededOnFinal`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
