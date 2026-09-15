# Golf Club Gapping ⛳

Check the **yardage gap between two clubs** and plan even spacing across your set. Single HTML file, fully offline, nothing leaves your device.

## Why

A bag full of clubs that all fly nearly the same distance — or with a 25-yard hole in the middle — costs you shots. Good gapping means a club for every distance. This flags gaps that are too tight or too wide and shows the even spacing your range implies.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/golf-gapping/
- Enter two adjacent clubs' **carry distances** to see the gap and whether it's ideal.
- Enter your longest and shortest carries and the number of clubs to see the even-gap target.

## How it works

- Gap = longer carry − shorter carry; aim for ~10–15 yards between clubs.
- Under 8 yd is redundant; over 15 yd leaves a distance you can only fudge.
- Even spacing = (longest − shortest) ÷ (clubs − 1) — a benchmark for your real carries.
- Use carry distances (not total with roll) from a launch monitor; fix big gaps by bending lofts or adding a wedge.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
