# AnionGap

**Serum anion gap calculator** — enter sodium, chloride, and bicarbonate to get the anion gap, with albumin correction and interpretation against the reference range. One offline HTML file, no signup, no tracking.

👉 **[Open AnionGap](https://awictor.github.io/anion-gap/)**

## Features
- Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻)
- **Albumin correction** (+2.5 per g/dL below 4.0) — a low albumin can mask a true gap
- Category: Low / Normal (≈ 8–12) / High
- Dark mode; 100% client-side

## Why
The anion gap is a first step in working up a metabolic acidosis, and forgetting the albumin correction is a classic pitfall. AnionGap computes both offline so no patient data leaves the browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
Reference ranges vary by lab and method; interpretation belongs to a clinician. This tool does the arithmetic only.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`anionGap`, `correctedAnionGap`, `category`) are covered by headless tests — the core formula, albumin correction above and below normal, category bands and boundaries, the masked-gap scenario, a DKA-style high gap, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
