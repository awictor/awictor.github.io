# Ability Modifier 🎲

Convert a **D&D 5e ability score to its modifier**, plus the proficiency bonus for a character level. Single HTML file, fully offline, nothing leaves your device.

## Why

Every check, attack, and save in 5e starts from an ability modifier and a proficiency bonus. The floor division trips up new players, and proficiency scaling is a table nobody remembers. This does both at the table, no book flipping.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/ability-modifier/
- Enter an **ability score** (1–30).
- Enter your **character level** (1–20).
- Read the modifier, the proficiency bonus, and their sum for a proficient roll.

## How it works

- Modifier = ⌊(score − 10) ÷ 2⌋: 16 → +3, 10 → +0, 8 → −1.
- Proficiency bonus: +2 (levels 1–4), +3 (5–8), +4 (9–12), +5 (13–16), +6 (17–20).
- Add both for skills/attacks you're proficient in.
- Scores run 1–30; 20 is the usual player cap.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
