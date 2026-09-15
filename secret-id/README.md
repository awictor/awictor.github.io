# SecretID

**Detect leaked API keys & token types** — paste a secret or a chunk of logs/config and SecretID tells you what kind of credential it is: AWS, GitHub, GitLab, Stripe, OpenAI, Slack, Google, npm, SendGrid, Twilio, JWTs, PEM private keys, UUIDs, and hex digests. One offline HTML file, no signup, no tracking.

👉 **[Open SecretID](https://awictor.github.io/secret-id/)**

> 🔒 Runs entirely in your browser — nothing is uploaded. Still, rotate any real secret you paste.

## Features
- Recognizes 15 common credential formats by their prefix/shape
- Scans a whole blob and reports every match, not just the first token
- Most-specific-first ordering so the label is meaningful
- Dark mode; 100% client-side

## Why
During incident triage or a code review you often find a mystery string and need to know "what is this, and how bad is it?" SecretID answers instantly and offline, so you never paste a live secret into a web service. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`identify`, `classify`) are covered by headless tests — AWS/GitHub/Stripe/OpenAI/Google/JWT/PEM/UUID/hex detection, embedded-in-a-blob matching, and plain text yielding no matches. CI runs them on every push.

## License
MIT © Alex Wictor
