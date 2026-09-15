# Wind Correction Angle 🧭

Solve the **wind triangle**: the crab angle to hold a course, the heading to fly, and the groundspeed you'll make. Single HTML file, fully offline, nothing leaves your device.

## Why

Wind pushes you off track, so you point the nose into it and accept a groundspeed that isn't your airspeed. Doing arcsin and cosine in the cockpit is exactly what the E6B was invented to avoid — this does the same solve instantly, and warns you when the crosswind simply beats your airspeed.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/wind-triangle/
- Enter your **true airspeed**, **desired course**, the **wind direction** (blowing *from*, like a METAR), and **wind speed**.
- Read the heading to fly, the correction angle (with left/right sense), the groundspeed, and the head/cross components.

## How it works

- WCA = arcsin( wind speed × sin(wind-to-course angle) ÷ TAS ) — crab into the wind.
- Groundspeed = TAS × cos(WCA) − headwind component.
- Wind is entered as the direction it blows *from*, matching aviation weather reports.
- If the crosswind exceeds your TAS the course is unholdable, and the tool says so instead of returning nonsense.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
