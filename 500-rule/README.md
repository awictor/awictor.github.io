# Star Exposure Calculator 🌌

Find the longest shutter speed before stars start to trail, using the **500 rule**, from your lens's focal length and your camera's crop factor.

**[Open the app →](https://awictor.github.io/500-rule/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
max seconds = rule / (focal length × crop factor)
```

The **500 rule** is the classic guideline; multiplying focal length by the sensor's crop factor gives the full-frame equivalent. High-resolution sensors show trailing sooner, so many shooters use the stricter **300** (or 200) rule. The sky drifts about **15 arcseconds per second** at the celestial equator — go longer than the rule allows and you'll want a star tracker.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
