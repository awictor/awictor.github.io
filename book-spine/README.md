# Book Spine Width Calculator 📖

Calculate a print book's **spine width** from its page count and paper thickness (pages per inch), in inches, millimeters, and points — for cover design.

**[Open the app →](https://awictor.github.io/book-spine/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
spine (in) = page count ÷ pages-per-inch (PPI)
```

PPI is a property of the paper stock (printers publish it): typically ~370 (thick) to ~512 (thin), with 444 common for white 50 lb text. Count every sheet's two sides as the page count and use the actual paper your printer uses. Below ~80–100 pages, many printers can't print spine text. 1 inch = 72 pt = 25.4 mm. Always confirm against your printer's spine spec.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
