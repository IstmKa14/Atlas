# Atlas — Decisions Log

---

## Decision: NativeWind v4 (stable) over v5 preview

**Date:** 2026-07-26

**Decision:**
Use NativeWind v4.2.6 with Tailwind CSS v3.4.19 (stable) instead of the NativeWind v5 preview with Tailwind CSS v4.

**Reason:**
- User provided the official NativeWind stable installation docs (v4 flow).
- NativeWind v5 is still in pre-release (`5.0.0-preview.2`). The companion package `react-native-css` nightly pinned its peer dep to Expo SDK 54, causing install failures on SDK 57.
- v4 is the production-ready, fully documented version.

**Alternatives Considered:**
- NativeWind v5 preview + react-native-css nightly — rejected due to SDK peer dep mismatch.
- Manual Tailwind CLI CSS generation — rejected as unnecessary with Metro integration.

**Impact:**
- `tailwind.config.js` uses Tailwind v3 `@tailwind` directives, not `@import "tailwindcss/..."`.
- `babel.config.js` is required (v5 would not need it).
- `withNativeWind` metro helper (capital W) is from v4.
- All design tokens encoded in `tailwind.config.js > theme.extend`.

---

## Decision: Design tokens in tailwind.config.js

**Date:** 2026-07-26

**Decision:**
All Atlas design tokens (colors, typography, spacing, radius, shadows) from `DESIGN.md` are encoded directly in `tailwind.config.js` under `theme.extend`.

**Reason:**
- Single source of truth accessible to all components via className.
- Enables IDE autocompletion for design tokens.
- Avoids duplicating values in StyleSheet objects.

**Alternatives Considered:**
- Separate `constants/colors.ts` file — kept but would duplicate values.
- CSS custom properties in global.css — not needed for v4 flow.

**Impact:**
- All components must use NativeWind className instead of inline StyleSheet for colors/spacing/typography.
- Token names match DESIGN.md exactly (e.g. `bg-canvas`, `text-ink`, `rounded-pill`).

---

## Decision: Clerk for Authentication

**Date:** 2026-07-26

**Decision:**
Use Clerk (`@clerk/expo`) with custom flows (`useSignIn`, `useSignUp`, `useSSO`) for authentication.

**Reason:**
- User requested Clerk authentication via the `clerk-expo` skill.
- The project already had custom auth UI screens (`login.tsx` and `signup.tsx`), so custom hooks were the natural choice over prebuilt native components (`AuthView`).

**Alternatives Considered:**
- Prebuilt components (`AuthView`) — rejected because it overrides the custom UI already created.
- Supabase/Custom backend — rejected as the user explicitly asked for Clerk setup and provided the Clerk publishable key.

**Impact:**
- The root layout is wrapped in `ClerkProvider` using `expo-secure-store` for the token cache.
- `login.tsx` and `signup.tsx` now use `useSignIn`, `useSignUp`, and `useSSO` to hook up email/password and social login.
