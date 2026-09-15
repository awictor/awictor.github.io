# CORS Header Generator

Generate **CORS response headers** — `Access-Control-Allow-Origin`, `-Methods`, `-Headers`, `-Expose-Headers`, `-Allow-Credentials`, and `-Max-Age` — from a simple config, with a built-in warning for the classic **credentials + wildcard** conflict.

**[Open the tool →](https://awictor.github.io/cors-generator/)**

- Pick methods, list allowed/exposed headers, set max-age
- Wildcard or specific origins
- Flags `Allow-Credentials: true` with `Allow-Origin: *` (which browsers reject)
- Copy to clipboard; dark mode
- 100% offline, no dependencies, no tracking

## Example

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
