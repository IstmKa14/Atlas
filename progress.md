# Atlas — Progress Tracker

## Setup

✅ NativeWind v4.2.6 + Tailwind CSS v3 installed
✅ `tailwind.config.js` — all Atlas design tokens from DESIGN.md
✅ `babel.config.js` — NativeWind/babel preset
✅ `metro.config.js` — withNativeWind pointing at `src/global.css`
✅ `src/global.css` — Tailwind base/components/utilities directives
✅ `app.json` — web bundler set to Metro
✅ `nativewind-env.d.ts` — TypeScript className types
✅ `src/app/_layout.tsx` — imports global.css

## Features

✅ Onboarding UI (4 slides — splash, welcome/features, capture, reflect)
✅ Authentication UI (login + signup — email/password, Google, Apple, validation states)
⬜ Auth provider wiring (Clerk / Supabase / custom)
⬜ Home / Feed Screen
⬜ Create Memory
⬜ Delete Memory
⬜ Weekly AI Summary
