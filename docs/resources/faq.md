---
sidebar_position: 1
---

# Frequently asked questions

## General

### What is BitChill?

BitChill is a dollar-cost averaging protocol on Rootstock. You deposit a stablecoin on a schedule. A swapper can buy rBTC for you on a UTC-day cadence. rBTC is the native asset of Rootstock.

The contracts in these pages are not deployed.

### Which stablecoins and routes does this protocol use?

| Stablecoin | Decimals | Routes |
| --- | --- | --- |
| DOC | 18 | Idle, LayerBank, Sovryn |
| USDRIF | 18 | Idle, LayerBank |
| USDT0 | 6 | Idle, LayerBank |

Tropykus is not a route. The idle route earns no lending yield. The route table is on the [supported tokens page](/docs/getting-started/supported-assets).

### Is this version audited?

No manual audit of this version is published. The 2025 Ivan Fitro reports cover earlier contract versions. An audit is planned. The protocol is not deployed before that audit. See [Audit status](/docs/security/audits).

### Where are the contracts?

The protocol contracts are not deployed. The [address page](/docs/contracts/addresses) does not list a manager, a registry, a handler, a swapper, or a fee collector.

## Schedules

### How often can a purchase run?

The cadence is a whole number of UTC days, measured from the cadence anchor. The anchor is a UTC midnight, or zero before the first purchase. It is not the purchase time. A purchase becomes eligible at 00:00 UTC on the due day. There is no guaranteed minute. A missed day is skipped. There is no catch-up purchase.

The deployment script uses a minimum of 7 days. The owner can change the minimum. The contract does not allow a minimum below one UTC day.

### What else does a purchase need?

A purchase needs an allowlisted swapper, enough principal for the gross amount, no schedule pause, liquidity, a passing price check, and a successful transaction. A deposit pause does not by itself stop a purchase.

### What is the minimum purchase?

The owner sets a minimum for each stablecoin. The deployment script uses 25 whole tokens, in that token's decimals. USDT0 has 6 decimals. DOC and USDRIF have 18 decimals. There is no live minimum, because the contracts are not deployed.

The purchase amount also cannot exceed the schedule principal.

### Can I hold more than one schedule?

Yes, up to the cap for that stablecoin. The deployment script uses a cap of 10. Each schedule has its own id, balance, amount, cadence, and route. rBTC for the same token and route is stored in one handler.

### What does a schedule pause do?

It blocks purchases for that schedule. It does not block a withdrawal, a delete, an rBTC claim, or an edit. A deposit pause blocks new deposits for one token and one route, and it also leaves those exits open.

The protected purchase window can block an edit, a delete, and some withdrawals for five blocks. An rBTC claim stays open. Website data never blocks your exit.

### What does delete return?

A delete returns principal. It does not claim interest. It does not claim accumulated rBTC.

## Fees and yield

### How is the fee charged?

You spend the gross stablecoin amount. The venue receives that stablecoin. The fee is taken in rBTC from the swap output. You receive the buyer-net rBTC. The fee is not taken from the stablecoin before the purchase.

The owner configures the fee. These pages do not state a live percentage. The screen shows the gross cost and the buyer-net rBTC. The screen does not show an exact fee row.

### What yield do I earn?

The idle route earns no lending yield. A LayerBank or Sovryn route can lend the waiting stablecoin. An accrued-interest figure is not available. The offchain system does not store an accrued-interest quote. These pages do not publish a live APY.

### Who pays gas for a purchase?

The swapper submits the purchase transaction and pays that gas. You pay gas for a transaction you send.

## rBTC

### How do I claim rBTC?

Call `withdrawAccumulatedRbtc` for one token and route, or `withdrawAllAccumulatedRbtc` for several pairs. The balance is per account, token, and route. A claim does not delete the schedule. A delete does not claim the rBTC.

### Is rBTC the same as BTC with no cost?

rBTC is the Rootstock native asset. Backing and an exchange price are different facts. A conversion is not a promise of a cost-free 1:1 exchange.

## Read next

- [Security model](/docs/security/security-model)
- [Fees](/docs/user-guide/fees)
