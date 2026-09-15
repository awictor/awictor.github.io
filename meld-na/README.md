# MELD-Na Calculator

Calculate the **MELD** and **MELD-Na** scores from bilirubin, INR, creatinine and sodium — the model used to predict liver-disease mortality and set transplant priority. One offline HTML file, no signup, no tracking.

👉 **[Open MELD-Na Calculator](https://awictor.github.io/meld-na/)**

## The formula
`MELD = 3.78·ln(bili) + 11.2·ln(INR) + 9.57·ln(Cr) + 6.43` (labs floored to 1.0, Cr capped at 4.0 or 4.0 with dialysis). When MELD > 11: `MELD-Na = MELD + 1.32·(137 − Na) − 0.033·MELD·(137 − Na)`, Na bounded 125–137, final bounded 6–40.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`meld`, `meldNa`, `severity`) are covered by headless tests — the minimum score, lab flooring, worked MELD and MELD-Na vectors, the creatinine cap and dialysis rule, the no-correction case, sodium bounds, the low-sodium effect, score bounds, severity bands, and validation. CI runs them on every push.

## Not medical advice
Education only.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
