# Crop Factor & Equivalent Focal Length

Calculate a camera's **crop factor** from sensor size, and the **35mm-equivalent** focal length and depth-of-field aperture.

**[Open the tool →](https://awictor.github.io/crop-factor/)**

- Crop factor = full-frame diagonal (43.27 mm) ÷ sensor diagonal
- Equivalent focal length and DoF-equivalent aperture
- Presets: full frame, APS-C, MFT, 1″, custom
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 35 mm f/1.8 lens on APS-C (1.53×) frames like ~53 mm and blurs like ~f/2.7 on full frame.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
