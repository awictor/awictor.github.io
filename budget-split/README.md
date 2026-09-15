# BudgetSplit

**50/30/20 budget allocator** — enter your after-tax income and split it across needs, wants, and savings (the 50/30/20 rule) or your own percentages, and see the dollar amounts plus any unallocated leftover. One offline HTML file, no signup, no tracking.

👉 **[Open BudgetSplit](https://awictor.github.io/budget-split/)**

## Features
- Editable category labels and percentages; presets (50/30/20, 60/20/20, 70/20/10, 80/10/10)
- Live dollar amounts, total %, and leftover / over-allocated indicator
- Visual allocation bar; dark mode; remembers your setup; 100% client-side

## Why
Budgeting frameworks are simple math but tedious to redo when your income or rules change. BudgetSplit turns a number into a plan in seconds, privately. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`allocate`, `num`) are covered by headless tests — the canonical 50/30/20 split, custom/under/over allocations, non-numeric handling, and invalid input; CI runs them on every push.

## License
MIT © Alex Wictor
