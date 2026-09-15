# Mean Arterial Pressure (MAP)

Calculate **mean arterial pressure** and **pulse pressure** from a systolic/diastolic reading, with a perfusion-range readout. One offline HTML file, no signup, no tracking.

👉 **[Open MAP Calculator](https://awictor.github.io/mean-arterial-pressure/)**

## Formula
`MAP = (SBP + 2·DBP) / 3` — diastole is weighted double because the heart spends about twice as long there. A MAP of ~70–100 mmHg is a common perfusion target; pulse pressure (SBP − DBP) is typically ~40 mmHg.

> Educational aid, not medical advice.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`meanArterialPressure`, `pulsePressure`, `category`, `analyze`) are covered by headless tests: the 120/80 → 93.33 and 90/60 → 70 vectors, the DBP+(SBP−DBP)/3 identity, pulse pressure, category boundaries (65/100), and validation (SBP ≤ DBP rejected). CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
