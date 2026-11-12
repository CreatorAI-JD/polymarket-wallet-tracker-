import { test } from "node:test";
import assert from "node:assert/strict";
import { ConsensusEngine, type Trade } from "./engine.ts";

const MIN = 60_000;
const ranks: Record<string, number> = { "0xa": 1, "0xb": 2, "0xc": 3, "0xd": 4, "0xlow": 900 };

function engine(minWallets = 3) {
  return new ConsensusEngine({
    windowMs: 60 * MIN,
    minWallets,
    minTradeUsd: 100,
    maxRank: 100,
    getWallet: (a) => (a in ranks ? { rank: ranks[a] } : null),
  });
}

let n = 0;
function trade(wallet: string, opts: Partial<Trade> = {}): Trade {
  n++;
  return {
    transactionId: `tx${n}`, wallet, conditionId: "cond1", tokenId: "yes1", outcome: "Yes",
    side: "BUY", shares: 1000, price: 0.5, usdc: 500, timestamp: n * MIN, ...opts,
  };
}

test("creates an event once distinct wallets reach the threshold", () => {
  const e = engine();
  assert.equal(e.process(trade("0xa")).kind, "recorded");
  assert.equal(e.process(trade("0xb")).kind, "recorded");
  const r = e.process(trade("0xc"));
  assert.equal(r.kind, "created");
  if (r.kind === "created") {
    assert.equal(r.event.distinctWallets, 3);
    assert.equal(r.event.combinedNetUsd, 1500);
    assert.ok(r.event.score >= 0 && r.event.score <= 100);
  }
});

test("same wallet trading repeatedly counts once", () => {
  const e = engine();
  e.process(trade("0xa"));
  e.process(trade("0xa"));
  const r = e.process(trade("0xa"));
  assert.equal(r.kind, "recorded");
});

test("duplicate trade records are ignored", () => {
  const e = engine(2);
  const t = trade("0xa");
  e.process(t);
  const r = e.process({ ...t });
  assert.deepEqual(r, { kind: "ignored", reason: "duplicate" });
});

test("YES and NO tokens are separate groups, and opposing activity is reported", () => {
  const e = engine(2);
  e.process(trade("0xa", { tokenId: "no1", outcome: "No" }));
  assert.equal(e.process(trade("0xb")).kind, "recorded"); // only 1 YES wallet
  const r = e.process(trade("0xc"));
  assert.equal(r.kind, "created");
  if (r.kind === "created") {
    assert.equal(r.event.distinctWallets, 2);
    assert.equal(r.event.opposing.length, 1);
    assert.equal(r.event.opposing[0].outcome, "No");
  }
});

test("a SELL is not a NO position and removes a wallet that fully exits", () => {
  const e = engine(2);
  e.process(trade("0xa"));
  e.process(trade("0xb"));
  const exit = e.process(trade("0xa", { side: "SELL", usdc: 500 }));
  assert.equal(exit.kind, "updated");
  if (exit.kind === "updated") {
    assert.deepEqual(exit.walletsLeft, ["0xa"]);
    assert.equal(exit.event.opposing.length, 0);
  }
});

test("updates the existing event when a new wallet joins (no new event)", () => {
  const e = engine(2);
  e.process(trade("0xa"));
  const c = e.process(trade("0xb"));
  const u = e.process(trade("0xc"));
  assert.equal(u.kind, "updated");
  if (c.kind === "created" && u.kind === "updated") {
    assert.equal(u.event.id, c.event.id);
    assert.deepEqual(u.walletsJoined, ["0xc"]);
  }
});

test("trades outside the window do not combine", () => {
  const e = engine(2);
  e.process(trade("0xa", { timestamp: 0 }));
  const r = e.process(trade("0xb", { timestamp: 2 * 60 * MIN }));
  assert.equal(r.kind, "recorded");
});

test("untracked, low-ranked and small trades are ignored", () => {
  const e = engine(2);
  assert.equal(e.process(trade("0xzzz")).kind, "ignored");
  assert.equal(e.process(trade("0xlow")).kind, "ignored");
  assert.equal(e.process(trade("0xa", { usdc: 50 })).kind, "ignored");
});
