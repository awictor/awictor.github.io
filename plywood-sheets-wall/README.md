# Plywood Sheets 📐

Work out how many **4×8 plywood or OSB sheets** cover a wall, floor, or roof area, with a waste allowance. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/plywood-sheets-wall/).

Enter the area dimensions, sheet size, and waste allowance. You get the sheets to buy, area to cover, and coverage per sheet.

## How it works

- A standard 4×8 sheet covers 32 square feet — set the sheet size if you use 4×10 or metric panels.
- Sheets = ceil(area × (1 + waste%) ÷ sheet coverage); a 10% waste allowance covers cuts and offcuts.
- Stagger the seams (running bond) for strength, and leave a small gap for expansion.
- Round up — a partial sheet still means buying a whole one.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
