# LetterSpacing

**Tracking ⇄ em ⇄ px converter** — translate design-tool tracking (the 1/1000-em units in Figma, Photoshop, InDesign) to CSS `letter-spacing` in em and px, with a live preview. One offline HTML file, no signup, no tracking (the other kind).

👉 **[Open LetterSpacing](https://awictor.github.io/letter-spacing/)**

## Features
- Three linked fields: tracking, em, and px (all update together)
- Font-size input for the em ⇄ px conversion
- Copy-ready `letter-spacing: …em;` and a live text preview
- Dark mode; 100% client-side

## Why
Designers hand off tracking as a unitless number (e.g. "50"), but CSS wants em or px. The rule is simple — tracking ÷ 1000 = em — yet it's easy to forget mid-build. LetterSpacing does it instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`trackingToEm`, `emToTracking`, `emToPx`, `pxToEm`, `convert`) are covered by headless tests — the 1/1000-em relation, em⇄px with font size, negative tracking, round-trips, linearity, and font-size validation. CI runs them on every push.

## License
MIT © Alex Wictor
