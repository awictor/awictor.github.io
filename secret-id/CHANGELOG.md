# Changelog

## 0.1.0
- First release. Leaked API key / token type detector.
- 15 credential patterns: AWS, GitHub, GitLab, Stripe, OpenAI, Slack, Google, npm, SendGrid, Twilio, JWT, PEM keys, UUID, hex digests.
- Scans a whole blob, reports every match, most-specific-first classification.
- 100% client-side. Dark mode, theme persistence.
- Headless test suite (10 checks) + CI.
