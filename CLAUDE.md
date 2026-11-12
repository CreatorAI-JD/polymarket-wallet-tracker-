# CLAUDE.md — instructions for Claude Code

This repo is the Polymarket Wallet Intelligence Tracker. The full product spec is in `SPEC.md`; read it before starting any phase.

## Ground rules
- Build in the phase order from SPEC.md §26. Finish and verify a phase before starting the next.
- Read-only platform. Never ask for or store private keys, seed phrases or signing credentials.
- Never fabricate data. If a field is unavailable, show "Unavailable", not an estimate or zero.
- BUY/SELL is the trade side; YES/NO is the outcome. Never derive one from the other.
- Consensus counts distinct wallets per exact `(condition_id, outcome_token_id)`, never by market title.
- Consensus score is not a probability. Never word it as one in UI copy.

## What's already here
- `supabase/migrations/0001_init.sql` — schema from SPEC.md §16, with dedup constraints, indexes and RLS.
- `src/lib/consensus/engine.ts` — pure, dependency-free consensus engine (the core feature) with tests in `engine.test.ts`.
  Run: `node --experimental-strip-types --test src/lib/consensus/engine.test.ts`
- `docs/polymarket-api.md` — verified notes on the current Polymarket Data API v2. Re-check the live docs before coding against it.

## Phase 1 next steps
1. `npx create-next-app@latest . --ts --tailwind --app --src-dir` (keep existing files).
2. Add the palette from SPEC.md §19 as Tailwind theme tokens; load Inter; enable tabular numbers on numeric cells.
3. Build the sidebar + top bar shell with the 10 nav items.
4. Wire Supabase (`@supabase/supabase-js`, `@supabase/ssr`) and apply the migration.
5. Wire the existing consensus engine into a worker in Phase 5 — don't rewrite it.
