# .editorconfig Generator

Generate a `.editorconfig` file so every EditorConfig-aware editor formats your project the same way — indent style/size, charset, line endings, trailing-whitespace trimming, final newline, and per-glob overrides.

**[Open the tool →](https://awictor.github.io/editorconfig/)**

- `root = true`, glob sections, canonical key ordering
- Indent, charset, EOL, max line length, trim, final newline
- Copy to clipboard; dark mode
- 100% offline, no dependencies, no tracking

## Example

```ini
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
```

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
