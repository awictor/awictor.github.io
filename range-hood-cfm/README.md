# Range Hood CFM 🍳

Size a kitchen **range hood** in CFM from your cooktop width and burner BTU, with an island adjustment. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/range-hood-cfm/).

Enter your cooktop width, total burner BTU (for gas), and whether it's an island cooktop. You get the recommended CFM plus each rule's number.

## How it works

- Rule of thumb: 100 CFM per linear foot of cooktop width (a 30″ range wants about 250 CFM).
- For gas, also allow 1 CFM per 100 BTU of total burner output — take whichever number is larger.
- Island hoods lose the wall's help catching rising air, so add about 50%.
- Over 400 CFM, many codes require a dedicated make-up air supply and larger ducts.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
