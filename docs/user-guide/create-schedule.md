---
sidebar_position: 2
---

# Create a schedule

A schedule spends one stablecoin on one route and buys rBTC on a UTC-day cadence. The contracts that accept this call are not deployed.

## Call

`createDcaSchedule` takes:

- `token`, the stablecoin
- `depositAmount`, the first principal
- `purchaseAmount`, the gross stablecoin amount of each purchase
- `purchasePeriod`, the cadence in seconds
- `routeIndex`, the route that will hold the funds

Approve the handler for that token and route. Approve the full deposit. Then call the manager. The handler pulls the deposit to itself. The schedule is credited with that full amount. The handler address comes from the deployment record after deployment. The protocol is not deployed, so this page does not publish a handler address.

## Checks

The call reverts when any of these checks fail:

- The deposit is zero.
- This token and route have no handler.
- New deposits are paused for this token and route.
- This token has no minimum purchase amount.
- The purchase amount is below that minimum.
- The purchase amount is above the deposit.
- The period is below the protocol minimum.
- The period is not a whole number of UTC days.
- You already hold the maximum number of schedules for this token.

The deployment script sets a minimum purchase of 25 whole tokens for DOC, USDRIF, and USDT0, in each token's own decimals. It sets the minimum period to 7 days. It sets the schedule cap to 10 schedules for each token. The owner can change these values. They are not a live setting, because the contracts are not deployed. There is no single raw-unit minimum for every stablecoin. USDT0 uses 6 decimals. DOC and USDRIF use 18 decimals.

## Schedule id

The new id is the next decimal counter value. The first id is 1. You keep the id with the stablecoin. A later call uses that pair. The id is not a row number in a list, and it is not a hash.

## Cadence anchor

A new schedule has a cadence anchor of zero. The anchor is not the creation time, and it is not the purchase time. The first purchase is eligible on the creation UTC day once the swapper submits it. That purchase sets the anchor to the UTC midnight of that day. A later purchase becomes eligible at 00:00 UTC on the due day. Missed slots are skipped. There is no catch-up. The contract does not promise a minute.

## After creation

The stablecoin is in the handler for that token and route. An idle handler holds it and earns no lending yield. A LayerBank or Sovryn handler can lend it. Purchased rBTC is claimed later. It is not sent to you inside the purchase.

## Read next

- [Manage a schedule](/docs/user-guide/manage-schedules)
- [Fees](/docs/user-guide/fees)
