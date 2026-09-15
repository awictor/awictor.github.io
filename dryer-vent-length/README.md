# Dryer Vent Length 🧺

Check a clothes **dryer vent** against the code limit: equivalent length from straight duct plus elbows, and how much run you have left. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/dryer-vent-length/).

Enter the straight duct run, the number of 90° and 45° elbows, and the max equivalent length. You get the equivalent length used, allowance left, and a pass/fail against code.

## How it works

- The IRC default limit is 35 equivalent feet unless the dryer's manual says otherwise — always follow the manual if it differs.
- Each 90° elbow counts as about 5 feet of duct; each 45° elbow counts as about 2.5 feet.
- Equivalent length = straight run + elbow allowances. It must stay at or under the limit.
- Use smooth rigid metal duct, not ribbed foil — ribbing traps lint and shortens the real allowance.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
