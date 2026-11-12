/**
 * Smart Wallet Consensus Engine (SPEC.md §8).
 *
 * Pure and dependency-free so it can run in a worker, a test, or a replay.
 * It processes trades one at a time (incrementally) and never rescans history.
 *
 * Key rules enforced here:
 * - Groups by exact outcome token id (never by market title).
 * - YES and NO tokens of the same market are separate groups; the other side is
 *   reported as opposing activity.
 * - BUY/SELL is the trade side. A SELL never becomes a NO position; it reduces the
 *   wallet's net contribution to the group it sold out of.
 * - Wallets count once, and only while their net buying in the window is positive.
 * - Duplicate trade records are ignored.
 */

export type Side = "BUY" | "SELL";

export interface Trade {
  transactionId: string;
  wallet: string;         // lowercased 0x address
  conditionId: string;    // market (on-chain condition id)
  tokenId: string;        // outcome token id
  outcome: string;        // outcome label, e.g. "Yes" / "No"
  side: Side;
  shares: number;
  price: number;          // 0..1
  usdc: number;           // trade value in USDC
  timestamp: number;      // ms since epoch
}

export interface WalletProfile {
  rank: number;                // current leaderboard rank, 1 = best
  avgTradeUsd?: number;        // historical average trade size, if known
}

export interface ConsensusConfig {
  windowMs: number;
  minWallets: number;
  minTradeUsd: number;
  maxRank: number;             // only wallets ranked at or better than this count
  /** Returns the wallet's profile, or null if the wallet isn't tracked. */
  getWallet: (address: string) => WalletProfile | null;
}

export interface Participant {
  wallet: string;
  rankAtJoin: number;
  boughtUsd: number;
  soldUsd: number;
  netUsd: number;
  firstTradeAt: number;
  latestTradeAt: number;
  tradeIds: string[];
}

export interface ScoreComponents {
  walletCount: number;     // 0..1
  walletQuality: number;   // 0..1
  sizeVsHistory: number | null; // 0..1, null when no wallet has history
  dispersion: number;      // 0..1, 1 = volume evenly spread across wallets
}

export interface ConsensusEvent {
  id: string;
  conditionId: string;
  tokenId: string;
  outcome: string;
  firstDetected: number;
  lastUpdated: number;
  firstTradeAt: number;
  latestTradeAt: number;
  participants: Participant[];
  distinctWallets: number;
  combinedNetUsd: number;
  score: number;           // 0..100 criteria score — NOT a probability
  components: ScoreComponents;
  opposing: OpposingActivity[];
}

export interface OpposingActivity {
  tokenId: string;
  outcome: string;
  distinctWallets: number;
  combinedNetUsd: number;
}

export type EngineResult =
  | { kind: "ignored"; reason: string }
  | { kind: "recorded" }                                   // counted, no event yet
  | { kind: "created"; event: ConsensusEvent }
  | { kind: "updated"; event: ConsensusEvent; walletsJoined: string[]; walletsLeft: string[] };

interface Entry {
  trade: Trade;
  rank: number;
  avgTradeUsd?: number;
}

const WEIGHTS = { walletCount: 0.4, walletQuality: 0.3, sizeVsHistory: 0.15, dispersion: 0.15 };

export class ConsensusEngine {
  private seen = new Set<string>();
  private buckets = new Map<string, Entry[]>();          // tokenId -> entries in window
  private tokensByCondition = new Map<string, Set<string>>();
  private active = new Map<string, ConsensusEvent>();    // tokenId -> active event
  private nextId = 1;

  private config: ConsensusConfig;

  constructor(config: ConsensusConfig) {
    this.config = config;
  }

  static tradeKey(t: Trade): string {
    return [t.transactionId, t.wallet, t.tokenId, t.side, t.shares, t.price].join("|");
  }

  process(trade: Trade): EngineResult {
    const t = { ...trade, wallet: trade.wallet.toLowerCase() };
    const key = ConsensusEngine.tradeKey(t);
    if (this.seen.has(key)) return { kind: "ignored", reason: "duplicate" };

    const profile = this.config.getWallet(t.wallet);
    if (!profile) return { kind: "ignored", reason: "wallet not tracked" };
    if (profile.rank > this.config.maxRank) return { kind: "ignored", reason: "wallet below rank threshold" };
    if (t.side === "BUY" && t.usdc < this.config.minTradeUsd) {
      return { kind: "ignored", reason: "below minimum trade size" };
    }
    this.seen.add(key);

    if (!this.tokensByCondition.has(t.conditionId)) this.tokensByCondition.set(t.conditionId, new Set());
    this.tokensByCondition.get(t.conditionId)!.add(t.tokenId);

    const bucket = this.buckets.get(t.tokenId) ?? [];
    bucket.push({ trade: t, rank: profile.rank, avgTradeUsd: profile.avgTradeUsd });
    this.buckets.set(t.tokenId, this.prune(bucket, t.timestamp));

    // An active event expires once no qualifying trade has arrived for a full window.
    let event = this.active.get(t.tokenId);
    if (event && t.timestamp - event.latestTradeAt > this.config.windowMs) {
      this.active.delete(t.tokenId);
      event = undefined;
    }

    const participants = event
      ? this.participantsFor(this.entriesSince(t.tokenId, event.firstTradeAt))
      : this.participantsFor(this.buckets.get(t.tokenId)!);
    const qualifying = participants.filter((p) => p.netUsd > 0);

    if (!event) {
      if (qualifying.length < this.config.minWallets) return { kind: "recorded" };
      const created = this.build(t, qualifying, `ce_${this.nextId++}`, t.timestamp);
      this.active.set(t.tokenId, created);
      return { kind: "created", event: created };
    }

    const before = new Set(event.participants.map((p) => p.wallet));
    const updated = this.build(t, qualifying, event.id, event.firstDetected);
    this.active.set(t.tokenId, updated);
    const after = new Set(updated.participants.map((p) => p.wallet));
    return {
      kind: "updated",
      event: updated,
      walletsJoined: [...after].filter((w) => !before.has(w)),
      walletsLeft: [...before].filter((w) => !after.has(w)),
    };
  }

  /** Every trade for a token since `from`, including ones that aged out of the sliding window. */
  private history = new Map<string, Entry[]>();
  private entriesSince(tokenId: string, from: number): Entry[] {
    return (this.history.get(tokenId) ?? []).filter((e) => e.trade.timestamp >= from);
  }

  private prune(bucket: Entry[], now: number): Entry[] {
    const last = bucket[bucket.length - 1];
    const hist = this.history.get(last.trade.tokenId) ?? [];
    hist.push(last);
    const active = this.active.get(last.trade.tokenId);
    const keepFrom = Math.min(now - this.config.windowMs, active?.firstTradeAt ?? Infinity);
    this.history.set(last.trade.tokenId, hist.filter((e) => e.trade.timestamp >= keepFrom));
    return bucket.filter((e) => now - e.trade.timestamp <= this.config.windowMs);
  }

  private participantsFor(entries: Entry[]): Participant[] {
    const byWallet = new Map<string, Participant>();
    for (const { trade, rank } of entries) {
      let p = byWallet.get(trade.wallet);
      if (!p) {
        p = { wallet: trade.wallet, rankAtJoin: rank, boughtUsd: 0, soldUsd: 0, netUsd: 0,
              firstTradeAt: trade.timestamp, latestTradeAt: trade.timestamp, tradeIds: [] };
        byWallet.set(trade.wallet, p);
      }
      if (trade.side === "BUY") p.boughtUsd += trade.usdc; else p.soldUsd += trade.usdc;
      p.netUsd = p.boughtUsd - p.soldUsd;
      p.firstTradeAt = Math.min(p.firstTradeAt, trade.timestamp);
      p.latestTradeAt = Math.max(p.latestTradeAt, trade.timestamp);
      p.tradeIds.push(trade.transactionId);
    }
    return [...byWallet.values()];
  }

  private build(t: Trade, qualifying: Participant[], id: string, firstDetected: number): ConsensusEvent {
    const combined = qualifying.reduce((s, p) => s + p.netUsd, 0);
    const components = this.score(t.tokenId, qualifying, combined);
    const weighted =
      components.sizeVsHistory === null
        ? (WEIGHTS.walletCount * components.walletCount +
           WEIGHTS.walletQuality * components.walletQuality +
           WEIGHTS.dispersion * components.dispersion) / (1 - WEIGHTS.sizeVsHistory)
        : WEIGHTS.walletCount * components.walletCount +
          WEIGHTS.walletQuality * components.walletQuality +
          WEIGHTS.sizeVsHistory * components.sizeVsHistory +
          WEIGHTS.dispersion * components.dispersion;
    return {
      id,
      conditionId: t.conditionId,
      tokenId: t.tokenId,
      outcome: t.outcome,
      firstDetected,
      lastUpdated: t.timestamp,
      firstTradeAt: Math.min(...qualifying.map((p) => p.firstTradeAt)),
      latestTradeAt: Math.max(...qualifying.map((p) => p.latestTradeAt)),
      participants: qualifying.sort((a, b) => b.netUsd - a.netUsd),
      distinctWallets: qualifying.length,
      combinedNetUsd: combined,
      score: Math.round(weighted * 100),
      components,
      opposing: this.opposing(t),
    };
  }

  private score(tokenId: string, qualifying: Participant[], combined: number): ScoreComponents {
    const walletCount = Math.min(qualifying.length / 8, 1);
    const walletQuality =
      qualifying.reduce((s, p) => s + Math.max(0, 1 - (p.rankAtJoin - 1) / this.config.maxRank), 0) /
      qualifying.length;

    const ratios: number[] = [];
    for (const p of qualifying) {
      const avg = this.config.getWallet(p.wallet)?.avgTradeUsd;
      if (avg && avg > 0) ratios.push(Math.min(p.netUsd / avg / 3, 1)); // 3x usual size = max
    }
    const sizeVsHistory = ratios.length ? ratios.reduce((a, b) => a + b, 0) / ratios.length : null;

    // Normalized entropy of volume shares: 1 = evenly spread, 0 = one wallet dominates.
    let dispersion = 1;
    if (qualifying.length > 1 && combined > 0) {
      const h = qualifying.reduce((s, p) => {
        const share = p.netUsd / combined;
        return share > 0 ? s - share * Math.log(share) : s;
      }, 0);
      dispersion = h / Math.log(qualifying.length);
    }
    void tokenId;
    return { walletCount, walletQuality, sizeVsHistory, dispersion };
  }

  private opposing(t: Trade): OpposingActivity[] {
    const out: OpposingActivity[] = [];
    for (const other of this.tokensByCondition.get(t.conditionId) ?? []) {
      if (other === t.tokenId) continue;
      const entries = (this.buckets.get(other) ?? []).filter((e) => t.timestamp - e.trade.timestamp <= this.config.windowMs);
      const ps = this.participantsFor(entries).filter((p) => p.netUsd > 0);
      if (ps.length) {
        out.push({
          tokenId: other,
          outcome: entries[0].trade.outcome,
          distinctWallets: ps.length,
          combinedNetUsd: ps.reduce((s, p) => s + p.netUsd, 0),
        });
      }
    }
    return out;
  }
}
