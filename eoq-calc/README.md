# EOQ Calculator

Find the **economic order quantity** — the order size that minimizes total inventory cost — plus orders per year, days between orders, the ordering/holding cost breakdown, and your **reorder point**. Handy for inventory planning and FBA restock decisions. One offline HTML file, no signup, no tracking.

👉 **[Open EOQ Calculator](https://awictor.github.io/eoq-calc/)**

## The formula
`EOQ = √(2 · D · S / H)` — where D is annual demand, S is cost per order, and H is holding cost per unit per year. At the EOQ, annual ordering cost equals annual holding cost (their sum is minimized). The reorder point is daily demand × lead time (+ optional safety stock).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`eoq`, `ordersPerYear`, `cycleDays`, `annualOrderingCost`, `annualHoldingCost`, `totalAnnualCost`, `reorderPoint`, `analyze`) are covered by headless tests: the textbook D=1000/S=10/H=2 → 100 vector, the ordering=holding equality at EOQ, a cost-minimization property check against nearby quantities, reorder point with safety stock, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
