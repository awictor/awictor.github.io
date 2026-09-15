# Text Summarizer

Paste an article and get an instant **extractive summary** — the most important sentences, picked by word-frequency scoring. No AI service, no upload, 100% offline. One HTML file.

👉 **[Open Text Summarizer](https://awictor.github.io/summarizer/)**

## How it works
It counts how often each meaningful word appears (ignoring stop-words), scores each sentence by the total weight of the words it contains, and keeps the top-scoring ones — **in their original order** so the summary reads naturally. No machine-learning model, no network calls.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenize`, `splitSentences`, `wordFrequencies`, `scoreSentence`, `summarize`) are covered by headless tests — tokenization, sentence splitting, stop-word-filtered frequencies, a worked scoring example, top-n selection with deterministic tie-breaking, original-order output, the "n ≥ sentence count" case, empty input, and n clamping. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
