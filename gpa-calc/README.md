# GPACalc

**Weighted GPA calculator** — enter your courses with credit hours and letter grades to get your credit-weighted GPA on the 4.0 scale (with +/− grades) and your standing. One offline HTML file, no signup, no tracking.

👉 **[Open GPACalc](https://awictor.github.io/gpa-calc/)**

## Features
- Credit-weighted 4.0-scale GPA with +/− grades
- Add / remove courses; rows without a grade or with zero credits are ignored
- Standing label (Dean's List / Good standing / at risk) and total credits
- Dark mode, remembers your courses
- 100% client-side; works offline

## Why
Every student recalculates their GPA before registration, scholarships, and grad-school apps. GPACalc does the credit weighting correctly and instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gradePoints`, `gpa`, `standing`) are covered by headless regression tests: the grade scale, credit weighting, mixed +/− grades, ignoring invalid rows, and standing cutoffs; CI runs them on every push.

## License
MIT © Alex Wictor
