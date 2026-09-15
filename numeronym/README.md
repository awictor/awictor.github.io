# Numeronym

**Numeronym generator** — turn long words into the developer-style shorthand where the middle letters become a count: **accessibility → a11y**, **internationalization → i18n**, **kubernetes → k8s**, **localization → l10n**. One offline HTML file, no signup, no tracking.

👉 **[Open Numeronym](https://awictor.github.io/numeronym/)**

## Features
- First letter + count-of-middle-letters + last letter
- Works on whole passages (only alphabetic runs are abbreviated; punctuation, digits, and spacing are preserved)
- Adjustable minimum word length; endpoint case preserved (Kubernetes → K8s)
- Copy-ready output; example chips; dark mode; 100% client-side

## Why
Numeronyms (a11y, i18n, k8s, l10n, o11y) are everywhere in tech, and coining one by hand means counting letters. Numeronym does it instantly for any word or passage, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`numeronym`, `numeronymText`) are covered by headless tests — the classic numeronyms, the first+count+last formula, short-word passthrough, the min-length threshold, per-word application, punctuation/case preservation, and coercion. CI runs them on every push.

## License
MIT © Alex Wictor
