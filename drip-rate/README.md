# IV Drip Rate Calculator

Calculate the **IV drip rate in drops per minute (gtt/min)** from an infusion order — volume, time and tubing drop factor — plus the flow rate (mL/hr) and total infusion time. Built for nursing students and clinicians. One offline HTML file, no signup, no tracking.

👉 **[Open IV Drip Rate](https://awictor.github.io/drip-rate/)**

## The formula
**gtt/min = (volume mL × drop factor) ÷ time in minutes.** Macrodrip sets are 10/15/20 gtt/mL; microdrip (pediatric) sets are 60 gtt/mL — with which gtt/min conveniently equals mL/hr.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dropFactor`, `flowRate`, `dropsPerMin`, `dropsPerMinFromRate`, `infusionTimeHr`) are covered by headless tests — the flow-rate and drip-rate formulas, agreement between the volume/time and mL/hr paths, the microdrip gtt/min = mL/hr identity, standard drop-factor lookups, infusion time, monotonicity, and validation. CI runs them on every push.

## Not medical advice
Education only; always follow your facility's protocol.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
