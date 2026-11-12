# Polymarket Wallet Intelligence Tracker

Read-only platform that ranks high-performing Polymarket wallets, tracks their trades, and flags when several of them take the same side of the same market (the Smart Wallet Consensus Engine).

Not financial advice. Consensus scores measure how many of the platform's criteria an event meets — they are not probabilities of an outcome.

## Status
- [x] Product spec — `SPEC.md`
- [x] Database schema with dedup, indexes and RLS — `supabase/migrations/0001_init.sql`
- [x] Consensus engine + tests — `src/lib/consensus/`
- [x] Polymarket Data API v2 notes — `docs/polymarket-api.md`
- [ ] Phase 1 app shell (Next.js + Tailwind + Supabase) — see `CLAUDE.md`

## Run the engine tests
```
npm test
```
Requires Node 22.6+.
