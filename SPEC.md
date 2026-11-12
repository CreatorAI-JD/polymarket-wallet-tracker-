POLYMARKET WALLET INTELLIGENCE TRACKER

Complete Product Requirements & Claude Code Development Specification

Project: Polymarket Wallet Intelligence Tracker
Product Type: Real-time wallet monitoring and market intelligence platform
Primary Purpose: Identify high-performing Polymarket wallets, monitor their trading activity, analyze their historical performance, and detect when multiple successful wallets make similar trades.

⸻

1. PRODUCT VISION

Build a professional financial intelligence platform that monitors Polymarket wallets and identifies patterns in their trading activity.

The platform should automatically discover and rank high-performing wallets, track their trades, monitor their positions, analyze their historical performance, and detect when multiple top-performing wallets enter the same market on the same side.

The central feature is a Smart Wallet Consensus Engine.

This engine compares trades from monitored wallets and sends notifications when multiple wallets participate in the same market with similar positions within a specified time window.

The platform should allow users to understand:

* Which wallets have historically performed well.
* What markets those wallets are trading.
* Whether they are buying YES or NO.
* How much they are trading.
* When they enter and exit positions.
* Whether multiple successful wallets agree on the same market.
* How accurate historical consensus signals have been.
* Which wallets are changing their trading behavior.

The application should operate as a read-only intelligence platform. It should never require users to provide private wallet keys, seed phrases, or trading permissions.

The platform must not present wallet activity as guaranteed predictions or financial advice.

2. CORE PRODUCT FEATURES

The application must contain the following primary sections:

1. Overview Dashboard
2. Top Wallets Leaderboard
3. Individual Wallet Profiles
4. Live Trade Tracker
5. Smart Wallet Consensus
6. Notifications Center
7. Wallet Analytics
8. Wallet Discovery
9. Watchlist
10. Market Explorer
11. Historical Consensus Analysis
12. Settings

Every section must be connected to the same underlying data system.

3. GLOBAL WEBSITE LAYOUT

Use a professional desktop-first dashboard layout.

The application should have three primary structural elements:

A. Left Sidebar
B. Top Navigation Bar
C. Main Content Area

Left Sidebar

Create a persistent navigation sidebar on desktop.

Navigation order:

1. Overview
2. Top Wallets
3. Trade Tracker
4. Consensus Signals
5. Notifications
6. Analytics
7. Wallet Discovery
8. Watchlist
9. Market Explorer
10. Settings

The active page should have a subtle green highlight and matching icon.

The sidebar should be collapsible.

On mobile, replace the permanent sidebar with a responsive navigation drawer.

Top Navigation Bar

Include:

* Global search.
* Market category selector.
* Live data connection indicator.
* Last data update timestamp.
* Notification bell.
* Unread notification count.
* User profile menu.
* Settings shortcut.

The global search should allow searching for wallet addresses, market names, and tracked wallet identities.

Main Content Area

Each page should follow a consistent layout:

1. Page title.
2. Short page description.
3. Important statistics.
4. Main charts or tables.
5. Secondary information.
6. Filters and controls.

Avoid unnecessary empty space while maintaining readability.

4. OVERVIEW DASHBOARD

The dashboard should provide an overview of all monitored wallet activity.

Main Statistics Cards

Display:

* Total tracked wallets.
* Active wallets today.
* Total trades detected.
* Markets monitored.
* Consensus signals detected.
* High-priority alerts.
* Total tracked wallet trading volume.

Each card should include:

* Large statistic.
* Descriptive label.
* Comparison with the previous period, where available.
* Small trend indicator.
* Last updated timestamp.

Never display fabricated numbers as real statistics.

Recent Wallet Activity

Create a live activity feed showing the latest transactions from monitored wallets.

Each activity item should display:

* Wallet name or shortened address.
* Wallet ranking.
* Market name.
* YES or NO position.
* Trade amount.
* Execution price.
* Transaction timestamp.
* Link to wallet profile.
* Link to market.

Allow users to filter activity by:

* Wallet ranking.
* Market category.
* YES or NO.
* Minimum trade size.
* Time range.

Recent Consensus Signals

Show the most recent detected consensus events.

Each event should include:

* Market name.
* Position direction.
* Number of participating wallets.
* Combined trade volume.
* Average wallet ranking.
* Time window.
* Signal strength.
* Link to the full consensus report.

5. TOP WALLETS LEADERBOARD

This section identifies and ranks the most successful Polymarket wallets.

The platform should automatically discover wallets and maintain a continuously updated leaderboard.

Ranking Categories

Allow users to switch between:

* All-time realized profit.
* 90-day realized profit.
* 30-day realized profit.
* 7-day realized profit.
* Highest return on capital.
* Highest historical win rate.
* Most consistent performers.
* Highest trading volume.
* Most active wallets.

Leaderboard Table

Columns:

1. Rank.
2. Wallet address.
3. Wallet label.
4. Realized profit.
5. Unrealized profit.
6. Return on capital.
7. Historical win rate.
8. Total markets.
9. Total trades.
10. Trading volume.
11. Last active.

Allow users to:

* Sort columns.
* Search wallets.
* Filter by category.
* Change ranking period.
* Open wallet profiles.
* Add wallets to a watchlist.

Wallet Ranking Methodology

Do not rank wallets exclusively by total profit.

A wallet with one unusually successful trade should not automatically rank above a wallet with a large and consistent trading history.

Consider:

* Realized profit.
* Return on capital.
* Number of completed markets.
* Historical win rate.
* Trading consistency.
* Sample size.
* Market category performance.
* Recent performance.
* Position concentration.

Show the ranking methodology transparently.

Separate realized and unrealized profit.

Clearly explain that historical win rates depend on how completed markets and positions are measured.

Avoid treating partial trades, multiple entries, and multiple exits as independent winning predictions.

6. INDIVIDUAL WALLET PROFILES

Every tracked wallet should have its own detailed profile page.

Wallet Overview

Display:

* Full public wallet address.
* Shortened wallet address.
* Wallet ranking.
* Total realized profit.
* Unrealized profit.
* Return on capital.
* Historical win rate.
* Number of completed markets.
* Total trading volume.
* Number of active positions.
* Last transaction.
* First observed activity.

Include a copy-address button and an external Polymarket explorer link where available.

Wallet Performance

Create charts showing:

* Profit over time.
* Trading volume over time.
* Historical win rate.
* Number of trades per day.
* Market category distribution.
* YES versus NO position distribution.
* Average position size.

Allow date filters:

* 24 hours.
* 7 days.
* 30 days.
* 90 days.
* All time.

Current Positions

Show publicly available open positions.

Include:

* Market.
* Position direction.
* Shares.
* Average entry price.
* Current market value.
* Unrealized profit or loss.
* Last updated timestamp.

If information is unavailable, clearly label it unavailable instead of estimating it.

Historical Trades

Show the wallet’s complete available trade history.

Allow sorting and filtering.

Clicking a trade should open the associated market and transaction details.

7. LIVE TRADE TRACKER

This section monitors transactions from every tracked wallet.

Trade Detection

The backend should continuously collect publicly available wallet trade data.

For each detected transaction, capture:

* Wallet address.
* Transaction ID.
* Market ID.
* Market name.
* Token or outcome identifier.
* Position direction.
* Trade side.
* Shares.
* Price.
* Trade amount.
* Timestamp.
* Transaction status.
* Data source.

Distinguish between buying and selling.

Do not confuse a trade’s transaction side with the market’s YES/NO outcome.

Trade Table

Display:

Column	Information
Wallet	Address or label
Rank	Current leaderboard rank
Market	Market name
Position	YES or NO
Action	BUY or SELL
Price	Execution price
Amount	Transaction value
Time	Transaction timestamp

Trade Filters

* Wallet.
* Market.
* Category.
* YES/NO.
* BUY/SELL.
* Minimum amount.
* Maximum amount.
* Date range.
* Wallet ranking.
* Transaction status.

Trade Details

Clicking a trade opens a detail panel showing:

* Full transaction information.
* Wallet profile.
* Market information.
* Related trades.
* Other wallets trading the same market.
* Historical activity surrounding the transaction.

8. SMART WALLET CONSENSUS ENGINE

THIS IS THE MOST IMPORTANT FEATURE OF THE ENTIRE PLATFORM.

The consensus engine should detect when multiple high-performing wallets make similar trades on the same market.

Primary Function

Continuously compare transactions from all monitored wallets.

Identify when multiple wallets:

* Enter the same market.
* Take the same YES or NO position.
* Trade within a configurable time window.
* Meet minimum performance and trade-size criteria.

Group matching activity into a single consensus event.

Example Consensus Event

Market: Bitcoin above $100K?

Position: YES

Participating wallets: 7

Combined detected volume: $18,400

Wallet activity:

* Wallet A: $4,500
* Wallet B: $3,200
* Wallet C: $2,800
* Wallet D: $2,500
* Wallet E: $2,000
* Wallet F: $1,900
* Wallet G: $1,500

These numbers are illustrative only.

Consensus Detection Logic

The engine should:

1. Receive a new wallet transaction.
2. Identify the wallet.
3. Identify the exact market.
4. Identify the outcome token.
5. Determine whether the wallet is buying or selling.
6. Determine the position direction.
7. Retrieve the wallet’s current ranking and performance.
8. Compare the transaction with recent transactions from other monitored wallets.
9. Group qualifying transactions by market and outcome.
10. Calculate the number of distinct wallets participating.
11. Calculate combined trade volume.
12. Calculate the time between the first and most recent matching transactions.
13. Check user-defined notification thresholds.
14. Create or update a consensus event.
15. Send a notification if the event qualifies.

Consensus Thresholds

Provide configurable settings.

Suggested default thresholds:

* Low activity: 2 wallets.
* Moderate activity: 3–4 wallets.
* High activity: 5–7 wallets.
* Very high activity: 8 or more wallets.

Allow users to set their own minimum wallet count.

Time Windows

Allow consensus matching within:

* 5 minutes.
* 15 minutes.
* 30 minutes.
* 1 hour.
* 3 hours.
* 6 hours.
* 12 hours.
* 24 hours.

Allow custom time windows.

Important Matching Rules

Do not group transactions just because they share a similar market title.

Match using the exact market and outcome/token identifiers.

Treat separate YES and NO positions as different consensus groups.

Account for:

* Multiple trades by the same wallet.
* Partial fills.
* Repeated transactions.
* Position increases.
* Position reductions.
* Wallets buying and later selling.
* Duplicate transaction records.
* Different wallet addresses that may be related.

Count distinct wallet addresses rather than transaction count.

Do not count the same wallet multiple times toward the minimum consensus threshold.

Distinguish between wallets buying into a position and wallets selling or reducing a position.

When wallets take opposite positions, create a separate opposing activity indicator.

Do not interpret a sell transaction as automatically creating a NO position.

Consensus Strength Score

Create a transparent consensus scoring system.

Consider:

* Number of distinct participating wallets.
* Historical wallet performance.
* Recency of activity.
* Trade size relative to wallet history.
* Concentration of activity.
* Independence of participating wallets.
* Whether the wallets have a history of similar successful trades.

Display the individual components of the score.

Do not call this score a probability of market success.

A strong consensus score should mean that the detected activity meets more of the platform’s defined criteria, not that the outcome is likely to happen.

9. CONSENSUS SIGNALS PAGE

Create a dedicated page for all detected consensus events.

Consensus Table

Columns:

* Market.
* Position.
* Number of wallets.
* Combined volume.
* Average wallet ranking.
* First trade.
* Latest trade.
* Time window.
* Signal strength.
* Status.

Allow filtering by:

* High consensus.
* Medium consensus.
* Low consensus.
* YES positions.
* NO positions.
* Market category.
* Minimum wallet count.
* Minimum combined volume.
* Time range.

Individual Consensus Report

Clicking a signal opens a complete report.

Include:

1. Market overview.
2. Consensus direction.
3. Participating wallet list.
4. Individual trade amounts.
5. Wallet historical performance.
6. Wallet ranking at the time of the event.
7. Transaction timestamps.
8. Combined trade volume.
9. Opposing wallet activity.
10. Historical consensus performance.
11. Related transactions.

Include a timeline that reconstructs how the consensus developed.

Opposing Activity Detection

An additional feature should identify when top wallets disagree.

Example:

* 6 tracked wallets bought YES.
* 4 tracked wallets bought NO.

Show both groups separately.

Do not simply declare the majority correct.

Display the performance and volume of each group.

10. NOTIFICATIONS CENTER

Create a dedicated notification system.

Notification Types

1. Multiple top wallets enter the same market.
2. Multiple top wallets take the same position.
3. A highly ranked wallet makes a large trade.
4. A tracked wallet enters a new market.
5. A tracked wallet closes or reduces a position.
6. Several tracked wallets begin trading the same market.
7. Top wallets take opposing positions.
8. A wallet’s performance changes significantly.
9. A new consensus event reaches the user’s threshold.
10. A consensus event changes direction or participation.

Notification Card Format

Each notification should show:

* Alert type.
* Market name.
* YES or NO.
* Number of wallets.
* Combined trade volume.
* First and latest transaction time.
* Alert strength.
* Participating wallets.
* View details action.

Notification Delivery

Support:

* In-app notifications.
* Browser notifications.
* Email notifications.
* Optional push notifications where supported.

Allow users to enable or disable each notification type.

Notification Settings

Users should be able to configure:

* Minimum wallet count.
* Minimum wallet ranking.
* Minimum trade size.
* Time window.
* Market categories.
* Consensus strength.
* Notification frequency.
* Delivery method.

Prevent duplicate notifications.

Update an existing consensus alert when new wallets join the same event rather than repeatedly creating identical alerts.

11. WALLET DISCOVERY

Build an automated wallet discovery system.

The platform should identify publicly observable wallets that meet configurable performance criteria.

Discovery Criteria

* Historical realized profitability.
* Return on capital.
* Completed market count.
* Trading history length.
* Win rate.
* Performance consistency.
* Market category performance.
* Trading volume.
* Recent activity.

Do not automatically label a wallet as a top performer based on one successful transaction.

Require minimum historical activity.

Manual Wallet Addition

Allow users to enter a public wallet address.

The platform should:

1. Validate the address format.
2. Check available public data.
3. Retrieve available historical transactions.
4. Calculate performance.
5. Add the wallet to the tracking database.
6. Display its profile.

Allow users to remove wallets from their personal watchlist without deleting shared historical transaction records.

12. WATCHLIST

Users should be able to create their own wallet watchlists.

Features:

* Add and remove wallets.
* Create custom lists.
* Assign wallet labels.
* Add private notes.
* Monitor selected wallets.
* Receive alerts only from selected wallets.
* Compare selected wallet performance.

Example watchlists:

* Top 10 Wallets.
* Crypto Traders.
* Politics Traders.
* High Volume Wallets.
* Recently Discovered Wallets.

13. MARKET EXPLORER

Create a dedicated market discovery section.

Display publicly available Polymarket markets.

Market information:

* Market name.
* Category.
* Market status.
* YES price.
* NO price.
* Trading volume.
* Liquidity, where available.
* Market close time.
* Number of tracked wallets participating.
* Combined tracked-wallet volume.
* Consensus direction.

Allow filtering by:

* Politics.
* Sports.
* Cryptocurrency.
* Economics.
* Technology.
* Other categories.

When a market is selected, show all detected activity from monitored wallets.

14. HISTORICAL CONSENSUS ANALYSIS

This feature is extremely important.

The platform should record every qualifying consensus event and evaluate its historical outcome.

Track:

* Date and time of consensus.
* Market.
* Position direction.
* Participating wallets.
* Combined volume.
* Consensus strength.
* Market price at detection.
* Market price after 1 hour.
* Market price after 6 hours.
* Market price after 24 hours.
* Final market resolution.
* Event outcome.

Display historical statistics such as:

* Number of qualifying events.
* Percentage of events followed by favorable price movement.
* Average price movement.
* Median price movement.
* Performance by wallet count.
* Performance by wallet ranking.
* Performance by market category.
* Performance by consensus strength.

Separate short-term price movement from final market resolution.

Do not exclude failed or unsuccessful events.

Do not claim a strategy is profitable without including realistic transaction costs, fees, slippage, and complete historical data where applicable.

15. WALLET ANALYTICS

Create a professional analytics dashboard.

Include:

Performance Charts

* Realized profit over time.
* Unrealized profit over time.
* Return on capital.
* Historical win rate.
* Trading volume.
* Average position size.

Behavioral Analytics

* Most frequently traded categories.
* Average holding period.
* Most active trading hours.
* Average entry price.
* Number of markets traded.
* Position concentration.
* Trading frequency.

Comparison Tools

Allow users to compare multiple wallets.

Show:

* Historical profit.
* Return on capital.
* Win rate.
* Trade volume.
* Market preferences.
* Position distribution.
* Trading frequency.
* Performance consistency.

Make sure all metrics use comparable time periods and definitions.

16. DATABASE STRUCTURE

Use PostgreSQL through Supabase.

Create a well-organized relational database.

Recommended tables:

wallets

* id
* address
* label
* discovery_date
* first_seen
* last_active
* total_realized_profit
* unrealized_profit
* return_on_capital
* historical_win_rate
* total_trades
* completed_markets
* total_volume
* current_rank
* updated_at

trades

* id
* transaction_id
* wallet_id
* market_id
* outcome_token_id
* outcome
* action
* shares
* price
* amount
* timestamp
* transaction_status
* created_at

Enforce transaction deduplication.

markets

* id
* external_market_id
* condition_id
* title
* category
* status
* close_time
* resolution
* last_updated

positions

* id
* wallet_id
* market_id
* outcome_token_id
* shares
* average_entry_price
* current_value
* realized_profit
* unrealized_profit
* updated_at

consensus_events

* id
* market_id
* outcome
* first_detected
* last_updated
* distinct_wallet_count
* combined_volume
* consensus_score
* event_status
* resolved_at
* resolution

consensus_participants

* id
* consensus_event_id
* wallet_id
* first_trade_id
* latest_trade_id
* total_detected_volume
* net_position_change
* joined_at

notifications

* id
* user_id
* consensus_event_id
* notification_type
* title
* message
* read_status
* created_at

watchlists

* id
* user_id
* name
* created_at

watchlist_wallets

* id
* watchlist_id
* wallet_id
* notes
* created_at

user_settings

* id
* user_id
* minimum_wallet_count
* minimum_trade_size
* consensus_time_window
* minimum_wallet_rank
* notification_preferences
* updated_at

Add appropriate indexes for:

* Wallet addresses.
* Transaction IDs.
* Market IDs.
* Outcome token IDs.
* Transaction timestamps.
* Consensus event IDs.
* Wallet rankings.

Use database migrations and enforce data integrity.

17. API AND DATA INTEGRATION

Use official Polymarket public data sources wherever available.

Investigate the current official API documentation before implementing endpoints.

Potential integrations:

* Gamma API for market discovery and market metadata.
* Data API for public wallet activity, positions, and historical data.
* CLOB API for market pricing and order book information.
* Official public WebSocket feeds where appropriate.
* Polygon blockchain data for transaction verification when needed.

Use public read-only endpoints.

Do not assume that one API provides all wallet information.

Determine which endpoint provides each required data field.

Data Collection Architecture

Create separate services for:

1. Market data collection.
2. Wallet discovery.
3. Trade collection.
4. Position synchronization.
5. Wallet performance calculations.
6. Consensus detection.
7. Notification delivery.
8. Historical event evaluation.

Use incremental synchronization where possible.

Do not repeatedly download the entire history of every wallet.

Maintain cursors or timestamps to collect new data efficiently.

Data Reliability

Implement:

* API rate-limit handling.
* Retry logic.
* Exponential backoff.
* Error logging.
* Duplicate detection.
* Data validation.
* Missing-data handling.
* Last successful synchronization timestamps.
* Background job monitoring.

If an API fails, show the last successful update and indicate that live data may be delayed.

Never present stale data as live.

18. TECHNICAL STACK

Recommended technology:

Frontend:

* Next.js.
* React.
* TypeScript.
* Tailwind CSS.
* Reusable UI components.

Backend:

* Node.js or Python.
* Organized API services.
* Background workers.
* Scheduled synchronization.

Database:

* Supabase.
* PostgreSQL.

Charts:

* Recharts or another suitable charting library.

Real-time updates:

* WebSockets where supported.
* Supabase Realtime where appropriate.
* Efficient polling as a fallback.

Authentication:

* Supabase Authentication.

Hosting:

* Vercel for the frontend.
* Suitable background worker hosting for data processing.

Notifications:

* Browser notifications.
* Email integration.
* In-app notification system.

19. UI/UX DESIGN SYSTEM

The entire website must follow one consistent visual design.

Design Direction

Combine:

* Bloomberg Terminal’s information density.
* Modern cryptocurrency analytics platforms.
* Professional financial intelligence dashboards.
* Clean SaaS design.

The finished website should feel like a serious financial data platform, not a generic template or AI-generated demo.

Exact Color Palette

Use these colors throughout the application.

Main background:
#0B1120

Sidebar background:
#101827

Card background:
#172235

Secondary card background:
#1D2939

Borders:
#293548

Primary green:
#16A36A

Bright positive green:
#22C58B

Negative red:
#EF5350

Blue:
#3B82F6

Primary text:
#F8FAFC

Secondary text:
#94A3B8

Muted text:
#64748B

Color Rules

Green:

* Positive profit.
* Positive performance.
* YES consensus when appropriate.
* Successful status indicators.

Red:

* Negative profit.
* Losses.
* Negative performance.
* NO consensus when clearly labeled.

Blue:

* Links.
* Secondary actions.
* Interactive controls.

Gray:

* Neutral information.
* Inactive states.
* Secondary data.

Never rely on color alone to communicate meaning.

Typography

Use Inter throughout the application.

Main page titles:
26–32px.

Section headings:
18–22px.

Card headings:
14–16px.

Body:
13–14px.

Secondary labels:
11–12px.

Use:

* 600–700 font weight for headings.
* 400 font weight for body text.
* Tabular numbers for financial values.

Card Design

Cards should use:

* Dark backgrounds.
* Subtle borders.
* 10–14px corner radius.
* Consistent padding.
* Minimal shadows.
* Clear spacing.

Avoid excessive gradients, glowing effects, and unnecessary decoration.

Table Design

All tables must support:

* Sorting.
* Filtering.
* Search.
* Pagination or efficient virtual scrolling.
* Row hover effects.
* Consistent column alignment.
* Readable financial values.
* Clickable wallet and market links.

On mobile, use responsive tables or compact cards.

Chart Design

Use consistent chart styling.

Include:

* Line charts.
* Bar charts.
* Pie charts.
* Volume charts.
* Wallet performance charts.
* Historical activity timelines.

Charts must have:

* Clear labels.
* Tooltips.
* Date ranges.
* Readable axes.
* Loading states.
* Empty states.
* Accurate data.

Consensus Card Design

Consensus alerts should be visually recognizable.

Use subtle green or red borders based on position direction.

Every card should show:

* Market name.
* YES/NO direction.
* Number of wallets.
* Combined trade volume.
* Time window.
* Wallet list.
* Signal strength.
* View details button.

Do not overwhelm users with flashing animations.

Animation Rules

Use subtle animations for:

* Live transaction indicators.
* New notifications.
* Page transitions.
* Chart updates.
* Hover states.

Keep animations fast and professional.

20. RESPONSIVE DESIGN

Support:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

Desktop:

* Fixed sidebar.
* Full data tables.
* Multi-column dashboard.
* Detailed analytics.

Tablet:

* Collapsible sidebar.
* Reduced column counts.
* Responsive cards.

Mobile:

* Collapsible navigation.
* Stacked statistics.
* Compact trade cards.
* Horizontal table scrolling when needed.
* Easy notification access.
* Readable charts.

No page should overflow horizontally except intentionally scrollable tables.

21. SEARCH AND FILTER SYSTEM

Create a global search system.

Search should support:

* Wallet addresses.
* Wallet labels.
* Market names.
* Market categories.
* Transaction IDs.

Filters should be consistent across pages.

Allow users to clear all filters and save frequently used filter combinations where practical.

22. SECURITY AND PRIVACY

Use secure authentication.

Implement appropriate database permissions and row-level security.

Protect user-specific settings and watchlists.

Never store:

* Private wallet keys.
* Seed phrases.
* Private signing credentials.

Do not require wallet connection for read-only public tracking.

Use server-side validation for sensitive application operations.

Protect API credentials using environment variables.

Never expose private API credentials in frontend code.

Do not allow one user to access another user’s private watchlists or account settings.

23. PERFORMANCE REQUIREMENTS

The application should remain responsive while monitoring large numbers of wallets.

Implement:

* Efficient database queries.
* Indexed transaction tables.
* Pagination.
* Background processing.
* Incremental synchronization.
* Caching of frequently requested data.
* Reusable API responses.
* Rate limiting.
* Job queues where appropriate.

The consensus engine should process new transactions incrementally rather than repeatedly scanning all historical transactions.

Allow the number of tracked wallets to increase without requiring a complete rewrite.

24. ERROR HANDLING

Build clear error states for:

* API connection failures.
* Missing wallet data.
* Invalid wallet addresses.
* Market information unavailable.
* Database connection errors.
* Delayed synchronization.
* Failed notifications.
* Missing transaction history.

Display useful error messages.

Do not silently replace unavailable information with fabricated values.

Add a system health page or status section showing:

* API connection status.
* Database status.
* Last synchronization.
* Background worker status.
* Failed job count.
* Data processing delays.

25. TESTING REQUIREMENTS

Before launch, test:

Wallet tracking:

* Adding wallets.
* Removing wallets from watchlists.
* Updating wallet profiles.
* Ranking calculations.

Trade tracking:

* Detecting new trades.
* Preventing duplicate transactions.
* Identifying YES/NO positions.
* Identifying BUY/SELL actions.

Consensus:

* Matching the same market.
* Matching the same outcome.
* Counting distinct wallets.
* Ignoring duplicate transactions.
* Handling multiple trades by one wallet.
* Handling opposing positions.
* Updating existing events.
* Sending alerts at correct thresholds.

Notifications:

* In-app alerts.
* Browser permissions.
* Email delivery if enabled.
* Duplicate prevention.
* Read/unread states.

Interface:

* Navigation.
* Search.
* Filters.
* Sorting.
* Pagination.
* Mobile responsiveness.
* Loading and empty states.

26. DEVELOPMENT PHASES

Build the application in the following order.

Phase 1: Project Foundation

* Create the Next.js application.
* Configure TypeScript.
* Install dependencies.
* Configure Tailwind CSS.
* Establish the color system.
* Create reusable components.
* Build sidebar and navigation.
* Configure Supabase.
* Create database migrations.

Deliverable: A working application shell with navigation and consistent styling.

Phase 2: Polymarket Data Integration

* Review official API documentation.
* Connect public market data.
* Retrieve available wallet activity.
* Retrieve historical trades.
* Create data collection services.
* Implement synchronization.
* Validate incoming data.

Deliverable: Real Polymarket data flowing into the application.

Phase 3: Wallet Intelligence

* Build wallet discovery.
* Create leaderboard.
* Calculate performance.
* Build individual profiles.
* Add historical charts.
* Add wallet watchlists.

Deliverable: A functional wallet intelligence system.

Phase 4: Trade Monitoring

* Build trade collection.
* Create transaction history.
* Add filters.
* Add sorting.
* Add wallet activity feeds.
* Add market links.

Deliverable: A functional trade monitoring platform.

Phase 5: Consensus Engine

* Build market matching.
* Build outcome matching.
* Group transactions.
* Count distinct wallets.
* Calculate combined volume.
* Implement configurable thresholds.
* Detect opposing activity.
* Store historical consensus events.

Deliverable: A working multi-wallet consensus detection system.

Phase 6: Notifications

* Build notification center.
* Add alert settings.
* Implement browser notifications.
* Add optional email notifications.
* Prevent duplicates.
* Update alerts when new wallets join an event.

Deliverable: A functional notification system.

Phase 7: Analytics

* Build wallet comparisons.
* Create consensus history.
* Calculate historical event outcomes.
* Create market analytics.
* Add historical replay.

Deliverable: A complete analytics platform.

Phase 8: Finalization

* Test every feature.
* Fix bugs.
* Improve loading speed.
* Verify database security.
* Test mobile layouts.
* Check API reliability.
* Remove placeholder data.
* Deploy the finished platform.

Deliverable: A production-ready application.

27. ADDITIONAL FEATURES TO IMPROVE THE PRODUCT

These features should be considered after the main platform is working.

Smart Money Timeline

Create a timeline showing when tracked wallets begin participating in different markets.

Allow users to see which wallets were first and which joined later.

Wallet Agreement Score

Measure how frequently selected wallets participate in the same market on the same side.

Include historical agreement statistics.

Contrarian Activity

Detect when high-performing wallets take opposing positions.

Show both sides, their volume, historical performance, and timing.

Wallet Behavior Changes

Detect unusual changes in a wallet’s behavior.

Examples:

* Suddenly trading more frequently.
* Entering unfamiliar categories.
* Increasing or reducing average position size.
* Changing its typical trading direction.
* Experiencing significant changes in realized performance.

Historical Replay

Allow users to reconstruct a market’s wallet activity over time.

Display:

* First tracked wallet.
* Subsequent wallets.
* Changes in participation.
* Price movements.
* Market resolution.

Related Wallet Detection

Where publicly observable evidence supports it, identify wallets with potentially related activity patterns.

Do not claim common ownership without reliable evidence.

Consensus Quality Reports

Create reports comparing different consensus thresholds and wallet groups.

Measure:

* Historical event count.
* Favorable and unfavorable outcomes.
* Price movement.
* Average time to resolution.
* Results by market category.

Include unsuccessful signals and incomplete data.

28. IMPORTANT PRODUCT RULES

1. Never fabricate live wallet data.
2. Never fabricate historical profit or win rates.
3. Always distinguish realized and unrealized profit.
4. Always display data timestamps.
5. Do not count one wallet multiple times toward consensus.
6. Do not confuse BUY/SELL with YES/NO.
7. Do not group unrelated markets.
8. Do not send repeated duplicate alerts.
9. Never claim that wallet consensus guarantees a market outcome.
10. Keep the platform read-only.
11. Protect all user data.
12. Make every visible interface control functional.
13. Do not build fake dashboard interactions.
14. Keep the entire application visually consistent.
15. Build modular code that can be extended later.

29. FINAL INSTRUCTIONS TO CLAUDE CODE

You are responsible for building the complete Polymarket Wallet Intelligence Tracker.

Do not just create a static dashboard or visual prototype.

Build a fully functional application with a real database, real public Polymarket data, working wallet tracking, historical performance calculations, trade monitoring, consensus detection, and notifications.

Follow the design system and technical requirements in this document.

Prioritize functionality and data accuracy over visual effects.

Do not skip database setup, backend logic, API integration, or error handling.

Do not pretend that a feature works if it is only a visual placeholder.

If an API does not provide a required data field, investigate an alternative public source or clearly explain the limitation.

Before implementing an API integration, review its current official documentation.

Build in phases, verify each phase, and preserve working features when adding new functionality.

Keep the code organized, reusable, secure, and scalable.

The final product should feel like a professional wallet intelligence terminal that users can leave open throughout the day to monitor Polymarket wallet activity and discover meaningful patterns.

THE PRIMARY PRODUCT GOAL:

Create the best possible read-only Polymarket wallet tracking and consensus intelligence platform, with the Smart Wallet Consensus Engine as its defining feature.