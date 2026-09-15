# JSON to XML

**Convert JSON into clean, indented XML.** Arrays become repeated elements, nested objects nest, text is escaped, and invalid element names are sanitized. Choose a root name, indentation, and an optional XML declaration. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to XML](https://awictor.github.io/json-to-xml/)**

## Conversion rules
- Each key → `<key>value</key>`; arrays repeat the element
- Nested objects nest; `null` / empty → self-closing `<key/>`
- `<`, `>`, `&` in text are escaped; names with spaces/leading digits are sanitized
- Custom root element, indent (2/4/0), optional `<?xml …?>` declaration

## Tests
```
node tests/selftest.mjs
```
Pure functions (`escapeXml`, `sanitizeName`, `jsonToXml`) are covered by headless tests — escaping, name sanitizing, flat/nested objects, array repetition, self-closing empties, custom root, single-line (indent 0), and the declaration option. CI runs them on every push.

## License
MIT © Alex Wictor
