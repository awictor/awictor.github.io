# Hurricane Category Calculator 🌀

Find the **Saffir-Simpson** hurricane category from a sustained wind speed, with the full classification and whether it's a major hurricane.

**[Open the app →](https://awictor.github.io/hurricane-category/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## The scale (1-min sustained wind, mph)

| Wind | Class |
|---|---|
| < 39 | Tropical Depression |
| 39–73 | Tropical Storm |
| 74–95 | Category 1 |
| 96–110 | Category 2 |
| 111–129 | Category 3 |
| 130–156 | Category 4 |
| 157+ | Category 5 |

Categories **3+** are "major" hurricanes. The scale measures **wind only** — surge, rainfall flooding, and tornadoes cause most deaths, so a lower category can still be deadly. Follow official evacuation orders.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
