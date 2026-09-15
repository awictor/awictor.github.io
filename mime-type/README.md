# MimeType

**MIME type & file extension lookup** — type a filename, extension, or MIME type and get the matching Content-Type (and every extension for a given type). Searchable table of ~75 common types. One offline HTML file, no signup, no tracking.

👉 **[Open MimeType](https://awictor.github.io/mime-type/)**

## Features
- Extension → MIME (`report.pdf` → `application/pdf`), reverse MIME → extensions
- Handles bare extensions, leading dots, multi-dot names (`backup.tar.gz`), and any case
- Live search over both extension and MIME substring
- Dark mode; 100% client-side

## Why
Setting a `Content-Type` header or validating an upload means remembering exact MIME strings — and the OOXML ones (`.xlsx`, `.docx`) are impossible to recall. MimeType looks them up instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`extractExt`, `byExtension`, `byMime`, `search`) are covered by headless tests — extension extraction, common and OOXML lookups, unknown → null, reverse MIME lookup, case-insensitivity, substring search, and the full sorted table. CI runs them on every push.

## License
MIT © Alex Wictor
