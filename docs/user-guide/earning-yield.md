---
sidebar_position: 5
---

# Lending and idle balances

Waiting stablecoin sits in the handler for the schedule's route. The idle route earns no lending yield. A LayerBank route and a Sovryn route can lend the stablecoin. Sovryn is a DOC route only.

The contracts are not deployed. An accrued-interest figure is not available. The offchain system does not store an accrued-interest quote. These pages do not publish a live APY.

## Routes

| Route | Waiting stablecoin |
| --- | --- |
| Idle | Held by the handler. No lending yield. |
| LayerBank | Can be lent. DOC, USDRIF, and USDT0 have this route. |
| Sovryn | Can be lent. DOC has this route. |

Tropykus is not a route in this protocol.

A purchase spends the schedule's gross purchase amount. It does not spend a separate interest balance by itself. Interest on a lending route stays in the lending position until you withdraw it or credit it to a schedule.

## What you can do with interest

On a lending route, the contract has calls to withdraw accrued lending interest and to credit some of it to a schedule's spendable balance. An idle route rejects an interest withdrawal.

These pages do not show the amount. An accrued-interest figure is not available.

A delete returns principal. A delete does not claim interest. A principal withdrawal does not claim interest. Use the interest call when you want the interest.

A schedule pause does not block an interest withdrawal. A deposit pause does not block it. The protected purchase window can block an interest withdrawal for five blocks. Website data does not block it.

## Risk

A lending route depends on that venue. The venue can change liquidity and the yield. The yield is not a published BitChill rate. An idle route removes that lending exposure and also removes lending yield.

## Read next

- [Fees](/docs/user-guide/fees)
- [Security model](/docs/security/security-model)
- [FAQ](/docs/resources/faq)
