---
sidebar_position: 2
---

# Security model

This page describes the controls in the undeployed contracts. No manual audit of this version is published. An audit is planned. The protocol is not deployed before that audit.

## User control

You sign the calls that move your funds:

- create, fund, edit, and pause a schedule
- withdraw principal
- delete a schedule, which returns principal
- claim rBTC
- on a lending route, withdraw or credit interest

The manager stores the schedule. The handler holds the stablecoin and the rBTC. A claim pays rBTC when you request it. The purchase transaction does not force that payment.

Website data never blocks a user exit. A missing or stale page is not a lock on the contract.

## Pauses

| Pause | Who sets it | What it blocks |
| --- | --- | --- |
| Schedule pause | The schedule owner | Purchases for that schedule |
| Deposit pause | The owner, for one token and one route | New deposits for that pair |

Neither pause blocks a withdrawal, a delete, an rBTC claim, or an edit.

## Protected window

A swapper can open a five-block window before a purchase batch. During that window the contract refuses an amount edit, a period edit, a pause edit, a delete, a principal withdrawal, and an interest withdrawal. An rBTC claim stays available. A deposit stays available unless that pair is deposit-paused.

The window stops a user from changing the purchased state after the swapper has prepared the batch. It is not a pause of the exit forever. The blocked calls return after the window.

## Callers

| Caller | Gate |
| --- | --- |
| User | The schedule's `user` field must be the caller |
| Swapper | The registry allowlist |
| Owner | Owner-only configuration |
| Handler entry | The call must come from the manager |

The manager uses a reentrancy guard on the external calls that change balances, edit schedules, run purchases, and pay claims.

## Purchase limits

- The purchase amount meets the token minimum and does not exceed principal.
- The period is a whole number of UTC days and meets the minimum.
- A purchase is eligible at 00:00 UTC on the due day.
- A missed slot is skipped. The contract does not queue it.
- The measured rBTC can be checked against a batch minimum. A short result reverts the purchase.
- A schedule pause reverts a batch that includes that schedule.

## Fee limit

The owner sets the fee curve on each handler. The contract rejects a maximum rate above 500 basis points. The fee is taken from the rBTC output. The gross stablecoin amount is still spent. No live rate is published.

## External systems

A purchase or a lending route depends on systems outside these contracts:

- Money on Chain, for a DOC purchase
- Uniswap, for a USDRIF or USDT0 purchase
- LayerBank, for a LayerBank route
- Sovryn, for the DOC Sovryn route
- Rootstock block production and gas

Tropykus is not a route in this protocol. The idle route does not depend on a lending venue.

A DEX purchase uses a price check and a minimum output. A Money on Chain redemption uses the Money on Chain price and can also face the batch minimum. A failed check reverts the purchase.

## Deployment shape

The deployment script creates new contract instances and assigns each handler once. These pages do not describe a proxy upgrade of a live deployment, because this version is not deployed.

## Read next

- [Audit status](/docs/security/audits)
- [Contract source](https://github.com/BitChillRSK/dca-contracts)
