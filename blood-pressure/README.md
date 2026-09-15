# BloodPressure

**Blood pressure category + MAP calculator** — enter a systolic/diastolic reading and see its 2017 ACC/AHA category (Normal, Elevated, Stage 1/2, Crisis), plus mean arterial pressure (MAP) and pulse pressure. One offline HTML file, no signup, no tracking.

👉 **[Open BloodPressure](https://awictor.github.io/blood-pressure/)**

> ⚠️ **Educational only.** A single reading isn't a diagnosis — blood pressure varies through the day and with technique. Discuss concerns with a clinician. Not medical advice.

## Features
- Color-coded AHA category with the correct OR/AND boundary rules
- Mean arterial pressure `MAP = DBP + (SBP − DBP)/3` and pulse pressure
- Reference table highlighting your current category
- Dark mode; remembers your reading; **100% client-side** (health data never leaves the page)

## Why
Blood-pressure categories have subtle rules (Elevated needs *both* numbers in range; Stage 1/2 use *either*), so eyeballing them is error-prone. BloodPressure applies the guideline exactly and privately. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bpCategory`, `meanArterialPressure`, `pulsePressure`) are covered by headless tests across every category, the AND-vs-OR rules, and boundary values; CI runs them on every push.

## License
MIT © Alex Wictor
