# Towing Capacity Check 🚚

Check whether your loaded trailer is within your vehicle's **tow rating**, and estimate **tongue weight**. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Gross trailer weight (empty + cargo) vs. tow rating, with pass/fail.
- Margin to the rating and tongue weight at a chosen percentage.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter trailer weight, cargo, tow rating, and tongue percentage.

> Tongue weight should be 10–15% of GTW for a bumper-pull — too little causes dangerous sway. Also check payload.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
