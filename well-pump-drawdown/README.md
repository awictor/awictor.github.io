# Well Tank Drawdown 🌊

Find the usable **drawdown** of a well pressure tank from its size, precharge, and cut-in/cut-out pressures. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/well-pump-drawdown/).

Enter tank total volume, cut-in and cut-out pressures, and precharge. You get the usable drawdown in gallons, drawdown as a percent of the tank, and the recommended precharge.

## How it works

- A bladder tank is mostly air. Water compresses that air between the pump's cut-in and cut-out pressures — the water it gives back is the drawdown.
- By Boyle's law (absolute pressure = gauge + 14.7): drawdown = tank × precharge_abs × (1÷cut-in_abs − 1÷cut-out_abs).
- Set the precharge about 2 psi below cut-in with the tank empty of water.
- More drawdown means fewer pump starts — aim for at least a minute of run time to protect the motor.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
