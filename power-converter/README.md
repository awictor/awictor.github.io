# Power Converter

Convert power between **watts, kilowatts, megawatts, mechanical horsepower, metric horsepower (PS), BTU per hour, and foot-pounds per second** — every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open Power Converter](https://awictor.github.io/power-converter/)**

## Reference
1 mechanical hp ≈ 745.7 W; 1 metric hp (PS) = 735.49875 W; a 1-ton AC unit = 12,000 BTU/h ≈ 3.5 kW. Converts through watts.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toWatts`, `fromWatts`, `convert`, `all`) are covered by headless tests: hp/PS/BTU·h vectors, the mechanical>metric hp check, the 1-ton AC figure, MW scaling, identity, round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
