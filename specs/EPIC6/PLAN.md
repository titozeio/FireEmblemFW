# EPIC6 – Plan

## Status

`closed`

## Completed On

2026-10-24

## User Story Order

1. **US1 – Dependency**: Add `@supabase/supabase-js` via CDN and get approval noted.
2. **US6 – Keys/config**: Create config files, add to `.gitignore`, add example.
3. **US2 – Schema/RLS**: Create SQL for `characters` and `classes` tables, enable RLS, add policies.
4. **US3 – Migration**: Export current JSON data and insert into Supabase.
5. **US4 – Load from Supabase**: Refactor data loading to Supabase with spinners/feedback.
6. **US5 – Immediate saves**: Make fields editable (route select, tier numeric stepper, others sensible) with autosave and status.
7. **US7 – Docs**: Update ARCHITECTURE to reflect Supabase as source of truth.

## Dependencies

- 2 depends on 1,6
- 3 depends on 2
- 4 depends on 3
- 5 depends on 4
- 7 depends on 4,5

## Verification

- Manual: load data from Supabase, edit a field, verify it updates in Supabase table, reload page shows saved value.
- Check RLS with anon key.
- No runtime dependency on local JSON files.

## Open Questions

- None.

## PM Approval

- Approved by the PM on 2026-10-24.
