# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

**Primary user:** Reflective, journaling-oriented individuals who already have a self-awareness habit and want an AI layer on top of it. They actively choose to document their life — not passively. They open Atlas at quiet moments: end of day, morning routine, after a meaningful event. They are not notetakers optimising productivity; they are people who value their own story and want to feel it understood.

## Product Purpose

Atlas is a life-memory app: capture moments (photos, notes, voice), surface patterns and insights via AI, and present that story back beautifully. Success means the user feels their life is being witnessed — not just logged — and gains clarity about who they are and where they're going.

**Tagline (confirmed):** "Your life, beautifully remembered."

## Positioning

Atlas does three things that are each independently common — journaling, AI summaries, and photo capture — and binds them into one cohesive, emotionally resonant loop. The meaningful difference is not any single capability but the combination: capture + AI reflection + beautiful presentation as a unified experience. A neighbouring product could not truthfully claim Atlas's specific triad with this editorial, understated visual language.

## Operating Context

- Users open the app during personal, reflective moments — not on the commute, not in a meeting.
- Typical session: capture a moment (photo + note, or voice), review the day's summary, read an AI insight.
- The AI Insights screen provides Daily, Weekly, Monthly, and All views — AI is a background narrator surfacing patterns, not a chatbot.
- There is a persistent tab bar: Home, Moments, Capture (+), AI, Me.
- Home shows a personalised greeting, today's moment count, recent moments strip, and a daily AI insight card.
- Moments screen: filterable by All / Photos / Notes / Voice; chronological list with thumbnails.
- Timeline: calendar-based, by day.
- AI Insights: AI-generated reflections on mood, patterns (Most Active Time, Top Mood, Most Captured, Reflection Time).
- Profile (Me): user name, avatar, stats (Moments, Reflections, Days Streak), settings links.

## Capabilities and Constraints

- **Auth:** Clerk (Google OAuth, Apple Sign-In, email/password).
- **Database:** Neon PostgreSQL via Drizzle ORM.
- **AI:** Groq API for generating insights and reflections.
- **Frontend:** Expo SDK 57, React Native, Expo Router, NativeWind v4 (Tailwind v3), Zustand, TanStack Query.
- **Platform:** Cross-platform iOS + Android with a shared design language (adaptive). iOS is the primary visual target given the reference designs.
- **Solo project:** No team, no monetisation plan at this stage.
- **Multimodal capture:** Photos, written notes, and voice notes are all first-class memory types.
- **Place capture:** Geographic context is planned (referenced in onboarding copy).
- **Empty states:** Fully designed — "No moments yet", "No moments on this day", "No insights yet" each have their own copy and a "Capture a Moment" CTA.

## Brand Commitments

- **Name:** Atlas
- **Logo:** Serif "A" glyph (editorial, strong stroke contrast) with a peach-to-mint atmospheric gradient orb behind the right stem. Wave decoration below. Wordmark set wide-tracked all-caps: A T L A S.
- **Visual language:** Off-white canvas (#f5f5f5), warm near-black ink (#0c0a09), soft pastel atmospheric gradient orbs (mint, peach, lavender, sky, rose) as decoration only. Inspired by the ElevenLabs editorial aesthetic — print-magazine calm, not tech-product urgency. DESIGN.md is the committed visual record.
- **Voice:** Warm, personal, understated. Never clinical. Never gamified. The app speaks to the user as if it knows them.
- **No emojis in UI:** Icons from expo-symbols only (SF Symbols / Material Symbols).

## Evidence on Hand

- `images/logo.png` — confirmed app icon (serif A + gradient orb + waves)
- `images/design.png` — full design reference showing all 5 screens (Home, Moments, Timeline, AI Insights, Profile) in both real-state and empty-state variants
- `images/login.png` — sign-in screen reference (Google, Apple, email/password)
- `images/onboridng1.png` — splash/brand slide reference
- `images/onbordign-2.png` — welcome/features slide reference (3 feature cards)
- No real user testimonials or case studies exist yet — do not fabricate.
- No pricing or monetisation data exists yet — do not fabricate.

## Product Principles

1. **The story matters more than the data.** Every screen should feel like a page in a beautifully kept book, not a dashboard. Metrics exist to serve meaning, not to impress.
2. **Calm over clever.** AI is a quiet narrator, not a chatbot. Insights surface gently; the app never competes for attention with the life it is recording.
3. **Capture must be effortless; reflection must feel rewarding.** The fastest path from lived moment to stored memory must never feel like admin. The payoff — a beautiful insight, a rediscovered day — must feel worth every tap.
4. **Editorial restraint as brand.** The off-white + ink palette and weight-300 display type are not aesthetic choices — they are brand commitments. Saturation, bold type, and neon accents are prohibited regardless of trend.
5. **Empty states are an invitation, not a failure.** A user with zero moments is a user at the beginning of their story, not a broken state. Design for the journey from empty to full.
