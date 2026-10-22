---
sidebar_position: 5
---

# Lending and idle balances

Waiting stablecoin sits in the handler for the schedule's route. The idle route earns no lending yield. A LayerBank route can lend the stablecoin. LayerBank is the only lending route at launch.

The contracts are not deployed. These pages do not publish an APY or an interest figure. The offchain system does not store an accrued-interest quote.

For a LayerBank route, the app shows an indicative supply APY. It comes from the LayerBank pool's current variable supply rate, assumed for one year with per-second compounding. It excludes incentive rewards. It is not guaranteed, and it is not a BitChill rate.

## Routes

| Route | Waiting stablecoin |
| --- | --- |
| Idle | Held by the handler. No lending yield. |
| LayerBank | Can be lent. At the initial launch, DOC has this route. The protocol also has LayerBank handlers for USDRIF and USDT0, which the initial launch does not enable. |

Sovryn is not a launch route. Tropykus is not a route in this protocol.

A purchase spends the schedule's gross purchase amount. It does not spend a separate interest balance by itself. Interest on a lending route stays in the lending position until you withdraw it or credit it to a schedule.

## What you can do with interest

On a lending route, the contract has calls to withdraw accrued lending interest and to credit some of it to a schedule's spendable balance. An idle route rejects an interest withdrawal.

These pages do not show the amount. The manager view `getAccruedInterest(user, token, routeIndex)` returns it for one lending route, and the app reads it there. An idle route has no interest.

A delete returns principal. A delete does not claim interest. A principal withdrawal does not claim interest. Use the interest call when you want the interest.

A schedule pause does not block an interest withdrawal. A deposit pause does not block it. The protected purchase window can block an interest withdrawal for five blocks. Website data does not block it.

## Risk

A lending route depends on that venue. The venue can change liquidity and the yield. LayerBank yield is not guaranteed. The yield is not a published BitChill rate. An idle route removes that lending exposure and also removes lending yield.

## Read next

- [Fees](/docs/user-guide/fees)
- [Security model](/docs/security/security-model)
- [FAQ](/docs/resources/faq)
