# PassiveVoice

**Passive voice detector** — paste your writing and instantly see every passive-voice construction highlighted, with a count and per-phrase list. One offline HTML file, no signup, no tracking.

👉 **[Open PassiveVoice](https://awictor.github.io/passive-voice/)**

## Features
- Flags a form of *to be* (is/are/was/were/be/been/being/am) followed by a past participle
- Handles regular `-ed` and 80+ common irregular participles, and an adverb between (e.g. "was quickly passed")
- Inline highlighting plus a list of flagged phrases; word and sentence counts
- Dark mode; 100% client-side

## Why
Passive voice hides who did what and saps energy from prose. PassiveVoice surfaces it so you can decide, sentence by sentence, whether to rewrite — all offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Note
Detection is heuristic (like `write-good` and similar linters): it can miss unusual participles or over-flag words like "indeed." Use it as a prompt, not a rule.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isParticiple`, `analyze`) are covered by headless tests — regular and irregular participles, simple and adverb-separated passives, `being` + participle, active-voice negatives, multi-sentence counts, and empty input. CI runs them on every push.

## License
MIT © Alex Wictor
