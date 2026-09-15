# CalBurn

**Calories burned calculator (MET)** — pick an activity, enter your weight and duration, and get an estimate of calories burned using standard MET values. One offline HTML file, no signup, no tracking.

👉 **[Open CalBurn](https://awictor.github.io/cal-burn/)**

## Features
- 20+ activities with MET values (walking, running, cycling, HIIT, yoga, …)
- Weight in kg or lb; duration in minutes
- Shows total calories and kcal/min
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
"How many calories did that workout burn?" comes up daily. CalBurn uses the standard MET formula (`MET × 3.5 × kg ÷ 200 × minutes`) so you can compare activities instantly. Estimates only, not medical advice. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`perMinute`, `caloriesBurned`, `lbToKg`) are covered by headless regression tests with worked values (running 6mph, 70 kg, 30 min ≈ 360 kcal), linearity, and guards; CI runs them on every push.

## License
MIT © Alex Wictor
