# FancyText

**Unicode text styler** — turn plain text into 𝐛𝐨𝐥𝐝, 𝑖𝑡𝑎𝑙𝑖𝑐, 𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎, Ｆｕｌｌｗｉｄｔｈ, and Ⓒⓘⓡⓒⓛⓔⓓ unicode for social bios, usernames, headings and posts. One offline HTML file, no signup, no tracking.

👉 **[Open FancyText](https://awictor.github.io/fancy-text/)**

## Features
- Five styles, each with one-tap copy
- Real Unicode (mathematical alphanumerics, fullwidth forms, enclosed alphanumerics) — pastes wherever plain text works
- Handles letters, digits, and the tricky reserved code points (e.g. italic `h`)
- Dark mode; remembers your input; 100% client-side; works offline

## Why
"Bold" text in a Twitter/Instagram bio isn't markup — it's Unicode look-alike glyphs. FancyText generates them correctly and lets you copy in one tap. Part of the [Toolkit](https://awictor.github.io/toolkit/).

> These are stylistic look-alikes; some apps and screen readers may not render or read them as normal letters — use in moderation.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toStyle`, `circled`, `OFFSETS`, `STYLES`) are covered by headless tests verifying exact code-point mappings for each style, the italic-`h` exception, fullwidth space, and passthrough; CI runs them on every push.

## License
MIT © Alex Wictor
