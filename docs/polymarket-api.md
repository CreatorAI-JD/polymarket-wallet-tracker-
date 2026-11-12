# Polymarket public API notes (checked 2026-11-11)

Always re-check https://docs.polymarket.com before implementing. Machine-readable contract: https://data-api.polymarket.com/v2/openapi.json (explorer at /v2/docs).

## Data API v2 — `https://data-api.polymarket.com/v2`
- No API key needed for public data routes.
- Every response is `{ data, pagination? }`. A miss is `data: null` or `[]`, not an error.
- Pagination is cursor-only: follow `pagination.next_cursor` until null. Sending `offset` is a 400.
- On feeds (`/v2/trades`, `/v2/activity`), re-send identical filters on every page; changing a filter mid-walk silently re-anchors.
- Boards/positions cursors pin their query; contradicting params = 400.
- **Units:** bare `volume`/`size` are SHARES. `_usdc` fields are USD. Don't mix them in the UI.
- `null` numeric = unavailable, never zero. `outcome_index: 999` = outcome couldn't be labeled.
- `/v2/trades?user=` and `/v2/activity`: omitted `start` floors to 3 years back; `start=1` = full history.
- Rate limits: `429` with `Retry-After` (honor it). `503 request_timeout` is server-side; also honor `Retry-After`.
- Identifiers: `condition` = on-chain 0x condition id; `market_id` = Gamma id; `token_id` = CLOB asset id.

| Need | Endpoint |
|---|---|
| Wallet open/closed positions | `GET /v2/positions?user=` (`status=CLOSED` for closed) |
| Market holders | `GET /v2/positions?condition=` |
| Wallet / market / global trades | `GET /v2/trades` (`user`, `condition`, `event_id`) |
| Wallet activity | `GET /v2/activity` |
| Leaderboard (discovery seed) | `GET /v2/leaderboard?time_period=day|week|month|all&category=&sort_by=PNL|VOLUME` |
| Biggest wins | `GET /v2/biggest-winners` |
| Price history | `GET /v2/prices-history` (keyed by `token_id`) |

Leaderboard caveat: day/week/month windows are marked equity change (include unrealized); `all` is realized-only. Label accordingly.

There is no native 90-day window — compute it from stored trades/positions.

## Other sources
- Gamma API — market metadata, categories, close times, resolution.
- CLOB API / WebSocket — live prices and order books.
- Polygon chain — tx verification only when needed.
