-- Polymarket Wallet Intelligence Tracker — initial schema (SPEC.md §16)

create extension if not exists pgcrypto;

-- Shared public data ------------------------------------------------------

create table wallets (
  id uuid primary key default gen_random_uuid(),
  address text not null unique check (address ~ '^0x[0-9a-f]{40}$'),
  label text,
  discovery_date timestamptz not null default now(),
  first_seen timestamptz,
  last_active timestamptz,
  total_realized_profit numeric,          -- null = unavailable
  unrealized_profit numeric,
  return_on_capital numeric,
  historical_win_rate numeric check (historical_win_rate between 0 and 1),
  total_trades integer,
  completed_markets integer,
  total_volume numeric,
  current_rank integer,
  updated_at timestamptz not null default now()
);
create index wallets_rank_idx on wallets (current_rank);

create table markets (
  id uuid primary key default gen_random_uuid(),
  external_market_id text unique,          -- Gamma market id
  condition_id text not null unique,       -- on-chain 0x condition id
  title text not null,
  category text,
  status text not null default 'open',
  close_time timestamptz,
  resolution text,
  last_updated timestamptz not null default now()
);
create index markets_category_idx on markets (category);

create table trades (
  id uuid primary key default gen_random_uuid(),
  transaction_id text not null,
  wallet_id uuid not null references wallets(id) on delete cascade,
  market_id uuid not null references markets(id) on delete cascade,
  outcome_token_id text not null,
  outcome text not null,                   -- e.g. YES / NO (outcome label)
  action text not null check (action in ('BUY','SELL')),  -- trade side, independent of outcome
  shares numeric not null check (shares > 0),
  price numeric not null check (price >= 0 and price <= 1),
  amount numeric not null,                 -- USDC
  "timestamp" timestamptz not null,
  transaction_status text not null default 'confirmed',
  data_source text not null default 'data-api-v2',
  created_at timestamptz not null default now(),
  -- one tx can contain several fills; dedupe on tx + wallet + token + side + size + price
  unique (transaction_id, wallet_id, outcome_token_id, action, shares, price)
);
create index trades_tx_idx on trades (transaction_id);
create index trades_wallet_ts_idx on trades (wallet_id, "timestamp" desc);
create index trades_market_idx on trades (market_id);
create index trades_token_ts_idx on trades (outcome_token_id, "timestamp" desc);
create index trades_ts_idx on trades ("timestamp" desc);

create table positions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references wallets(id) on delete cascade,
  market_id uuid not null references markets(id) on delete cascade,
  outcome_token_id text not null,
  shares numeric not null,
  average_entry_price numeric,
  current_value numeric,
  realized_profit numeric,
  unrealized_profit numeric,
  updated_at timestamptz not null default now(),
  unique (wallet_id, outcome_token_id)
);
create index positions_market_idx on positions (market_id);

create table consensus_events (
  id uuid primary key default gen_random_uuid(),
  market_id uuid not null references markets(id) on delete cascade,
  outcome_token_id text not null,
  outcome text not null,
  first_detected timestamptz not null,
  last_updated timestamptz not null,
  distinct_wallet_count integer not null,
  combined_volume numeric not null,
  consensus_score numeric,
  score_components jsonb,                  -- transparency: each component shown in UI
  event_status text not null default 'active',
  price_at_detection numeric,
  price_1h numeric,
  price_6h numeric,
  price_24h numeric,
  resolved_at timestamptz,
  resolution text
);
create index consensus_market_idx on consensus_events (market_id, outcome_token_id);
create index consensus_detected_idx on consensus_events (first_detected desc);

create table consensus_participants (
  id uuid primary key default gen_random_uuid(),
  consensus_event_id uuid not null references consensus_events(id) on delete cascade,
  wallet_id uuid not null references wallets(id) on delete cascade,
  first_trade_id uuid references trades(id),
  latest_trade_id uuid references trades(id),
  total_detected_volume numeric not null,
  net_position_change numeric not null,
  wallet_rank_at_join integer,
  joined_at timestamptz not null,
  unique (consensus_event_id, wallet_id)   -- a wallet counts once per event
);
create index consensus_participants_event_idx on consensus_participants (consensus_event_id);

create table sync_state (
  stream text primary key,                 -- e.g. 'trades:<wallet>' or 'markets'
  cursor text,
  last_success_at timestamptz,
  last_error text,
  last_error_at timestamptz,
  failed_count integer not null default 0
);

-- Per-user data (RLS) -----------------------------------------------------

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consensus_event_id uuid references consensus_events(id) on delete cascade,
  notification_type text not null,
  title text not null,
  message text not null,
  read_status boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- one alert per user per consensus event; updated in place when wallets join
create unique index notifications_event_dedupe
  on notifications (user_id, consensus_event_id, notification_type)
  where consensus_event_id is not null;
create index notifications_user_idx on notifications (user_id, created_at desc);

create table watchlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table watchlist_wallets (
  id uuid primary key default gen_random_uuid(),
  watchlist_id uuid not null references watchlists(id) on delete cascade,
  wallet_id uuid not null references wallets(id) on delete cascade,
  notes text,
  created_at timestamptz not null default now(),
  unique (watchlist_id, wallet_id)
);

create table user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  minimum_wallet_count integer not null default 3 check (minimum_wallet_count >= 2),
  minimum_trade_size numeric not null default 100,
  consensus_time_window interval not null default '1 hour',
  minimum_wallet_rank integer not null default 100,
  notification_preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row-level security -------------------------------------------------------

alter table wallets enable row level security;
alter table markets enable row level security;
alter table trades enable row level security;
alter table positions enable row level security;
alter table consensus_events enable row level security;
alter table consensus_participants enable row level security;
alter table sync_state enable row level security;
alter table notifications enable row level security;
alter table watchlists enable row level security;
alter table watchlist_wallets enable row level security;
alter table user_settings enable row level security;

-- Public market data: readable by anyone, writable only by the service role (workers).
create policy "public read" on wallets for select using (true);
create policy "public read" on markets for select using (true);
create policy "public read" on trades for select using (true);
create policy "public read" on positions for select using (true);
create policy "public read" on consensus_events for select using (true);
create policy "public read" on consensus_participants for select using (true);
create policy "public read" on sync_state for select using (true);

-- Private user data: owner only.
create policy "own notifications" on notifications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own watchlists" on watchlists
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own watchlist wallets" on watchlist_wallets
  for all using (exists (select 1 from watchlists w where w.id = watchlist_id and w.user_id = auth.uid()))
  with check (exists (select 1 from watchlists w where w.id = watchlist_id and w.user_id = auth.uid()));
create policy "own settings" on user_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
