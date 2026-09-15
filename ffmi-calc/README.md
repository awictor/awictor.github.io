# FFMI Calculator

A single-file, offline **Fat-Free Mass Index** calculator. Enter weight, body fat %, and height to get your FFMI, normalized FFMI, lean mass, and a muscularity interpretation. Unlike BMI, FFMI ignores fat — so it actually reflects how muscular you are.

**Live:** https://awictor.github.io/ffmi-calc/

## Features

- **FFMI** — `fat-free mass (kg) / height (m)²`
- **Normalized FFMI** — adjusted to a 1.8 m reference so heights compare fairly
- **Fat-free (lean) mass** in kg
- Muscularity interpretation band
- kg/lb and cm/in unit toggles
- Dark mode, 100% offline, zero dependencies

## Rough guide (men)

18–20 average · 20–22 fit · 22–23 very muscular · ~25 often cited as the natural ceiling. Women typically run 3–4 points lower.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions, including known vectors and category boundaries. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
