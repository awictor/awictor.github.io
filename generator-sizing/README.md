# Generator Sizing Calculator

Size a backup **generator** from your appliances' running watts plus the largest starting surge, with a safety margin.

**[Open the tool →](https://awictor.github.io/generator-sizing/)**

- Total running watts + largest single starting surge
- Safety-margin headroom (~20%)
- Enter each appliance as `running,starting` watts
- For home backup, RV, and camping. Dark mode, 100% offline, no dependencies, no tracking

## Example

Fridge (600/1800), sump (1200), lights (300), TV (100) → 2,200 running + 1,200 surge = 3,400 W; recommend ~4,080 W.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
