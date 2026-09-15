# Sweat Rate 💧

Measure your **sweat rate** from weight change and fluid intake during exercise, and get an hourly replacement target. Single HTML file, fully offline, nothing leaves your device.

## Why

Endurance athletes lose fluid at wildly different rates, and both under- and over-drinking are dangerous. The only way to know yours is to measure — weigh in, weigh out, track what you drank. This does the arithmetic and gives you a per-hour target.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/sweat-rate/
- Weigh yourself **before and after** a workout (dry).
- Enter the **fluid you drank** and the **duration**.
- Read the sweat rate, total sweat lost, and a drink-target per hour.

## How it works

- Sweat lost = weight lost + fluid drunk (1 kg ≈ 1 L).
- Rate = sweat lost ÷ hours. Because you replaced some fluid, drinking more reveals a higher true rate.
- Aim to drink near your sweat rate on long efforts, but don't exceed it — over-drinking risks hyponatremia.
- Re-measure across heat, humidity, and intensity; sweat rate isn't fixed.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
