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

The manager uses a reentrancy guard on the user calls that change balances, edit schedules, and pay claims. The purchase calls are swapper-only and do not take that guard. A token or a lending market can therefore run a purchase from a callback during a user call. For that reason, a deposit or a withdrawal stores and logs the new balance before the handler call. See [Event order](/docs/contracts/integration#event-order).

## Purchase limits

- The purchase amount meets the token minimum and does not exceed principal.
- The period is a whole number of UTC days and meets the minimum.
- The first purchase is eligible on the creation UTC day once the swapper submits it. A later purchase becomes eligible at 00:00 UTC on the due day.
- Missed slots are skipped. There is no catch-up.
- The measured gross rBTC is checked against the batch minimum, scaled to the actual input and rounded up. A short result reverts the purchase.
- A schedule pause reverts a batch that includes that schedule.

## Fee limit

The owner sets the fee curve on each handler. The contract rejects a maximum rate above 500 basis points. The fee is taken from the rBTC output. The gross stablecoin amount is still spent. No live rate is published.

## External systems

A purchase or a lending route depends on systems outside these contracts:

- Money on Chain, for a DOC purchase
- LayerBank, for a LayerBank route
- Rootstock block production and gas
- Uniswap V3 and the Money on Chain BTC/USD oracle, for a USDRIF or USDT0 purchase through a DEX handler. The initial launch does not enable those handlers.

The initial launch supports DOC only, on idle and LayerBank. Sovryn is not a launch route. Tropykus is not a route in this protocol. The idle route does not depend on a lending venue.

A Money on Chain redemption uses the Money on Chain price. The DOC handler passes no minimum to Money on Chain and has no oracle floor, so the scaled batch minimum is its only output check. The BitChill swapper always sends a positive DOC minimum. A DEX handler gives the router the larger of the scaled batch minimum and an oracle floor as `amountOutMinimum`, so the router enforces the floor. The handler then checks the measured output against the scaled batch minimum. Its swap path must be on the handler's allowlist. A failed check reverts the purchase. See [Purchase minimum](/docs/contracts/core-contracts#purchase-minimum) and [DEX handler settings](/docs/contracts/core-contracts#dex-handler-settings).

## Deployment shape

The deployment creates new contract instances. The registry owner assigns each handler once, and an assignment cannot be replaced. A later pair, such as a USDRIF or USDT0 DEX handler, is a new handler contract and a new assignment on the same registry. These pages do not describe a proxy upgrade of a live deployment, because this version is not deployed.

## Read next

- [Audit status](/docs/security/audits)
- [Contract source](https://github.com/BitChillRSK/dca-contracts)
