# Atlas — Error Memory

> Read this before debugging. Never remove entries. Always append.

---

## Error: react-native-css nightly peer dep mismatch

### Error
`npm error peer expo@"54.0.0-preview.6" from react-native-css@0.0.0-nightly.5ce6396`

### Cause
The NativeWind v5 companion package `react-native-css@0.0.0-nightly.5ce6396` has its peer dependency hard-pinned to `expo@54.0.0-preview.6`, making it incompatible with Expo SDK 57.

### Solution
Switched to NativeWind v4 (stable) + Tailwind CSS v3 which does not require `react-native-css`. Uninstalled `react-native-css` and `@tailwindcss/postcss`.

### Prevention
When evaluating pre-release/nightly packages, check their peer deps against the project's Expo SDK version before installing. Prefer stable releases for core styling infrastructure.
