# Air Changes per Hour (ACH) Calculator

Calculate the ventilation airflow (**CFM**) needed for a target **air changes per hour**, or ACH from a fan's CFM, plus room volume.

**[Open the tool →](https://awictor.github.io/air-changes/)**

- CFM = ACH × volume ÷ 60, both directions
- Room volume and minutes per air change
- For HVAC sizing and indoor air quality
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 15×12×8 ft room (1,440 ft³) at 6 ACH needs 144 CFM — one air change every 10 minutes.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
