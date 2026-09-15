# URLParse

**URL inspector** — paste a URL to break it into its parts (protocol, host, port, path, query, hash) and list every query parameter, decoded. One offline HTML file, no signup, no tracking.

👉 **[Open URLParse](https://awictor.github.io/url-parse/)**

## Features
- Protocol, userinfo, host, port, path, query, hash, and origin
- Query parameters listed as decoded key/value pairs (`+` and `%20` handled)
- Uses the browser's native, spec-compliant URL parser
- Clear invalid-URL messages
- Dark mode, remembers your URL
- 100% client-side; works offline

## Why
Debugging links, redirects, and query strings is constant, and it's easy to miscount `&`s by eye. URLParse lays out every part and decodes each parameter. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `parseUrl` function is covered by headless regression tests, including query decoding, userinfo, and invalid input; CI runs them on every push.

## License
MIT © Alex Wictor
