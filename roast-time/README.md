# Roast Cooking Time Calculator

Estimate roasting time from weight and meat type — turkey (stuffed/unstuffed), chicken, beef (rare/medium/well), pork, ham, lamb — with the recommended oven temperature and safe internal temperature.

**[Open the tool →](https://awictor.github.io/roast-time/)**

- `total = weight × minutes-per-pound`, formatted as h/m
- USDA safe internal temps and oven temperatures
- Nine meat/doneness presets
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 12 lb unstuffed turkey at 13 min/lb → **2h 36m** at 325 °F, to 165 °F internal.

*Always confirm doneness with a meat thermometer.*

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
