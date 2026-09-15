# RoasCalc

**ROAS / ACOS & break-even ad calculator** — enter your ad spend, sales, and product margin to get ROAS, ACOS, the break-even ACOS/ROAS you can afford, and your net profit after ads — with a clear profitable/losing verdict. One offline HTML file, no signup, no tracking.

👉 **[Open RoasCalc](https://awictor.github.io/roas-calc/)**

> ⚠️ Estimates only — not financial advice.

## Features
- ROAS (sales ÷ spend) and ACOS (spend ÷ sales), which are reciprocals
- Break-even ACOS (= your margin) and break-even ROAS (= 1 ÷ margin)
- Net profit after ads and a profitable/losing verdict
- Dark mode; 100% client-side

## Why
"Is a 25% ACOS good?" only makes sense against your margin. RoasCalc ties spend, sales, and margin together so you instantly see whether a campaign clears break-even — useful for PPC and marketplace sellers. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`roas`, `acos`, `breakEvenAcos`, `breakEvenRoas`, `netProfit`) are covered by headless tests — the ROAS/ACOS reciprocal relationship, break-even = margin, the zero-profit-at-break-even identity, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor
