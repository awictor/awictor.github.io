# Dehumidifier Sizing Calculator 💧

Size a dehumidifier from your room area and how damp the space feels. Returns the **pints/day** removal capacity you need and the **recommended standard unit size**, using the classic AHAM chart.

**[Open the app →](https://awictor.github.io/dehumidifier/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

A space needs a base pint-per-day capacity for the first 500 sq ft, then a fixed step for every additional 500 sq ft. Wetter conditions raise both:

| Dampness | Base (500 sq ft) | Per extra 500 sq ft |
|---|---|---|
| Moderately damp (50–60%) | 10 | +4 |
| Very damp (60–70%) | 12 | +5 |
| Wet (70–80%) | 14 | +6 |
| Extremely wet (80–100%) | 16 | +7 |

The recommended unit rounds up to the nearest common size (20, 30, 35, 50, 70 pint). Newer DOE-labeled units report lower pint numbers for the same real capacity — match by AHAM rating when you can.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
