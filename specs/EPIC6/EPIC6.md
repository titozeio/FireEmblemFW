# EPIC6 – Migrate to Supabase as single source of truth

## Objective

Migrate all character and class data from the Excel/JSON pipeline to Supabase. Once migrated, Supabase becomes the single source of truth. The site will load and save directly to Supabase with immediate updates and proper user feedback.

## User Stories

- **US1.** As a developer, I want to use `@supabase/supabase-js` via CDN as an approved runtime dependency, so the app can talk to Supabase.
- **US2.** As a developer, I want the tables `characters` and `classes` created in Supabase with all relevant fields, `id`, and `updated_at`, with RLS enabled.
- **US3.** As a developer, I want all current data migrated from `data/characters.json` and `data/classes.json` into Supabase.
- **US4.** As a user, I want the app to load data from Supabase with a loading spinner/feedback while fetching.
- **US5.** As a user, I want to edit fields directly in the UI (selects for route, numeric stepper for tier score, and other editable fields as appropriate) and have changes saved immediately to Supabase with visual feedback ("Guardando...", "Guardado", errors).
- **US6.** As a developer, I want to keep API keys out of git by using a local config file ignored by `.gitignore` and provide a `.example` file.
- **US7.** As a developer, I want docs updated (ARCHITECTURE) to reflect Supabase as the single source of truth and remove reliance on Excel/JSON at runtime.

## Scope

- Add `@supabase/supabase-js` via CDN in `index.html`
- Create `js/supabase-client.js`, `js/supabase-config.js` (gitignored), `js/supabase-config.example.js`
- Update `js/data.js`, `js/main.js`, `js/render.js`, `js/logic.js`, `js/state.js` as needed
- Add loading spinners and save status indicators
- Add SQL schema/RLS notes for Supabase setup
- Update `docs/ARCHITECTURE.md`
- Update `.gitignore`

## Out of Scope

- Authentication (start with RLS policies allowing anon select/update as agreed)
- Complex migrations beyond current data
- Removing the original Excel file from repo (keep for historical/reference only, not used at runtime)
