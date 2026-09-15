# Return Grille Size 🌬️

Size an HVAC **return air grille** from airflow (CFM) and a target face velocity, allowing for grille free area. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/return-grille-size/).

Enter the airflow, target face velocity, and the grille's free-area percent. You get the gross grille face area needed, net free area, and an example square size.

## How it works

- Net free area = airflow ÷ face velocity. At 400 CFM and 400 fpm that's 1 sq ft (144 sq in).
- Return grilles run quietest around 300–500 fpm — lower is quieter but needs a bigger grille.
- Louvers block part of the opening, so gross size = net area ÷ the grille's free-area fraction (about 75%).
- Undersized returns starve the blower, raise static pressure, and make the system noisy — err larger.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
