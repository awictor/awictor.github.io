# Crawlspace Vents 🏚️

Find how many foundation **vents** a crawlspace needs by the 1/150 rule (or 1/1500 with a vapor barrier). Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/crawlspace-vents/).

Enter the crawlspace floor area, ventilation ratio, and the net free area per vent. You get the number of vents and total net free area.

## How it works

- A vented crawlspace over bare ground wants 1 sq ft of net free vent per 150 sq ft of floor.
- Lay a vapor barrier on the ground and the ratio relaxes to 1/1500 — far fewer vents.
- Vents = ceil(total net free area ÷ the net free area of one vent); spread them around the perimeter and near corners.
- Many modern builds seal and condition the crawlspace instead — then it isn't vented at all.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
