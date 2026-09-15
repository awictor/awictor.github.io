# HTML to JSX

**Convert HTML into React-ready JSX.** Paste HTML and get JSX with `class`→`className`, `for`→`htmlFor`, camelCased attributes, inline `style` strings turned into style objects, self-closing void tags, and comments converted to `{/* … */}`. One offline HTML file, no signup, no tracking.

👉 **[Open HTML to JSX](https://awictor.github.io/html-to-jsx/)**

## Converts
- `class` → `className`, `for` → `htmlFor`, `tabindex` → `tabIndex`, and many more attributes to camelCase
- Inline `style="a: b; c: d"` → `style={{ a: 'b', c: 'd' }}` with camelCased CSS properties (incl. `-webkit-` → `Webkit`)
- Void elements (`br`, `img`, `input`, `hr`, `meta`, `link`, …) become self-closing
- `<!-- comments -->` → `{/* comments */}`
- Event attributes (`onclick` → `onClick`) renamed — wire up the handlers yourself

## Tests
```
node tests/selftest.mjs
```
Pure functions (`camelCss`, `parseStyle`, `htmlToJsx`) are covered by headless tests — CSS camelCasing incl. vendor prefixes, style-object building, attribute renames, void self-closing/normalization, comment conversion, and not corrupting attribute-like substrings. CI runs them on every push.

## License
MIT © Alex Wictor
