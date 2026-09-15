# Generator Sizing ⚡

Size a generator from the appliances you want to run: **total running watts** plus the **largest starting surge**, then a recommended generator size. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Checklist of common home appliances with running/starting watts.
- Peak demand = total running + single largest surge (only one motor starts at a time).
- Recommends the next standard generator size (2,000–12,000 W).
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Check the appliances you'll run at once.

> Leave headroom — running a generator at 100% continuously shortens its life.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
