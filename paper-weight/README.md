# Paper Weight Converter 📄

Convert paper weight between **GSM** and **US pound basis weight** for bond, text, cover, and index grades — for printing and stationery.

**[Open the app →](https://awictor.github.io/paper-weight/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
GSM = lb × 1406.5 ÷ basis-area(in²)
```

US basis weight is the weight of a 500-sheet ream at that grade's **basis size**, so the same "70 lb" means different things across grades. GSM sizes the paper directly and is grade-independent. Basis areas: bond 17×22, text 25×38, cover 20×26, index 25.5×30.5.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
