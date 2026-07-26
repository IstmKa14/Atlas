# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.
# Atlas AI Development Guide


## Startup Checklist

Before implementing any feature:

1. Read AGENTS.md completely.
2. If the task involves UI, read DESIGN.md.
3. Read progress.md.
4. Read error_memory.md.
5. Review decisions.md if architecture may be affected.
6. Understand the existing implementation before making changes.
7. Plan first, then code.
8. After finishing, update progress.md.
9. If a new bug was encountered, append it to error_memory.md.
10. If an architectural or technical decision was made, append it to decisions.md.

## 1. Project Overview
- What Atlas is
- Goals
- Vision
- Core principles

---

## 2. Tech Stack

Frontend
- Expo SDK 57
- React Native
- TypeScript
- Expo Router
- NativeWind
- Zustand
- TanStack Query
- Expo Image
- Expo Image Picker
- React Hook Form
- Zod
- Reanimated
- FlashList

Backend
- Neon PostgreSQL
- Drizzle ORM
- Groq API
- Hono/Express (if backend exists)

Always use the latest stable version unless instructed otherwise.

---

## 3. Folder Structure

app/
components/
features/
hooks/
lib/
store/
db/
types/
constants/
assets/

Follow existing architecture.
Never reorganize without approval.

---

## 4. Development Rules

Before implementing ANY feature:

1. Read this file completely.
2. Understand existing architecture.
3. Check Progress section.
4. Check Error Memory section.
5. Reuse existing components.
6. Don't duplicate code.
7. Keep files small.
8. Keep logic simple.

Never start coding immediately.

---

## 5. Code Style

- TypeScript strict mode.
- Never use any.
- Use functional components.
- Prefer composition.
- Small reusable hooks.
- Keep components under ~250 lines when possible.
- Separate UI from business logic.

---

## 6. State Management

Global

- Zustand

Server

- TanStack Query

Forms

- React Hook Form

Validation

- Zod

Do not introduce Redux or Context unless approved.

---

## 7. Database Rules

Database

Neon PostgreSQL

ORM

Drizzle

Never write raw SQL unless necessary.

Always

- create migrations
- use relations
- keep schema typed

---

## 8. API Rules

Never expose secrets.

Groq calls happen through backend.

Validate every request.

Handle errors gracefully.

---

## 9. UI Rules

For UI tasks:

Read DESIGN.md first.

Do NOT guess colors, spacing, typography or animations.

DESIGN.md is the design source of truth.

and `images` folder use that for the disgn imaegs insperations 

---

## 10. Progress Tracker

craete a `progress.md` file on yoor inital work and then update it 

After EVERY completed task:

Update this progerss.md.

Example

✅ Authentication

✅ Create Memory

⬜ Delete Memory

⬜ Weekly AI Summary

Keep it updated after every feature.

---

## 11. Error Memory

crate afile called Error_memory.md and note the err there 
For every new error add:

### Error

...

### Cause

...

### Solution

...

### Prevention

Before debugging

Read this file first.

For every new error add:

### Error

...

### Cause

...

### Solution

...

### Prevention

...

Never remove previous errors.

Always append.

---

## 12. Decisions Log

Whenever a major decision is made

Document:

Decision

Reason

Alternatives considered

Impact

Never overwrite history.

Append only.

---

## 13. Feature Workflow

For every feature

Understand request

↓

Inspect existing code

↓

Plan implementation

↓

Implement

↓

Test

↓

Fix issues

↓

Update Progress

↓

Update Error Memory if needed

↓

Report completion

---

## 14. Libraries

Prefer existing libraries.

Never install a new dependency without explaining

- why
- benefits
- alternatives

and asking permission.

---

## 15. Performance

Avoid unnecessary renders.

Memoize only when useful.

Lazy load heavy screens.

Optimize FlatLists.

Cache API calls.

Keep animations smooth.

---

## 16. Git Rules

Small commits.

One feature per commit.

Meaningful commit messages.

Never modify unrelated files.

---

## 17. Testing

Before finishing:

- No TypeScript errors
- No lint errors
- No console.log
- No unused imports
- No dead code

---

## 18. Final Checklist

Before saying "Done"

✓ Feature works

✓ Progress updated

✓ Error Memory updated (if needed)

✓ Types correct

✓ Architecture unchanged

✓ No duplicated code

✓ UI follows DESIGN.md