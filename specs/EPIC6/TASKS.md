# EPIC6 – Tasks

## Status

`closed`

## US1: Add runtime dependency via CDN
- [<] [T0] [@dev0] Add `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm" type="module">` or import from CDN in JS modules.

## US6: Secure config
- [<] [T1] [@dev0] Create `js/supabase-config.example.js` with placeholders.
- [<] [T2] [@dev0] Create `js/supabase-config.js` with URL and publishable key (gitignored).
- [<] [T3] [@dev0] Update `.gitignore` to ignore `js/supabase-config.js`.

## US2: Schema and RLS
- [-] [T4] [@dev0] Create SQL schema for `characters` and `classes` (all needed columns, id, updated_at).
- [-] [T5] [@dev0] Enable RLS and add policies for anon SELECT/UPDATE.

## US3: Migrate data
- [<] [T6] [@dev0] Generate SQL/JSON migration from `data/characters.json` and `data/classes.json` and insert into Supabase.

## US4: Load from Supabase
- [<] [T7] [@dev0] Create `js/supabase-client.js`, refactor `js/data.js` to load from Supabase, add loading spinners/feedback.

## US5: Immediate saves
- [<] [T8] [@dev0] Make fields editable (route select, tier numeric stepper, others sensible), save on change with "Guardando..."/"Guardado"/error states.

## US7: Docs
- [<] [T9] [@dev0] Update `docs/ARCHITECTURE.md` and notes.
