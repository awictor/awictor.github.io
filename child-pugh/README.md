# Child-Pugh Score

Calculate the **Child-Pugh score** and **class (A / B / C)** for chronic liver disease from bilirubin, albumin, INR, ascites, and encephalopathy — each scored 1–3 points. Widely used for prognosis, surgical-risk assessment, and transplant discussion. One offline HTML file, no signup, no tracking.

👉 **[Open Child-Pugh Score](https://awictor.github.io/child-pugh/)**

## Scoring
Five factors × 1–3 points = 5–15 total → **Class A** (5–6), **Class B** (7–9), **Class C** (10–15), with a one/two-year survival note per class.

> Educational aid, not medical advice.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bilirubinPoints`, `albuminPoints`, `inrPoints`, `ascitesPoints`, `encephalopathyPoints`, `classOf`, `score`) are covered by headless tests on every threshold boundary, best/worst/mixed cases, class cutoffs, the interpretation string, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
