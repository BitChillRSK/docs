---
sidebar_position: 2
---

# Creating a DCA Schedule

A DCA schedule defines how stablecoins are spent over time to buy rBTC.

## Inputs

When creating a schedule, you provide:

- `token`
- `depositAmount`
- `purchaseAmount`
- `purchasePeriod` (seconds)
- `lendingProtocolIndex`

## Contract Validations

`createDcaSchedule` enforces:

- `depositAmount > 0`
- `purchaseAmount >= token minimum` (custom token minimum if set, otherwise default minimum)
- `purchaseAmount <= depositAmount / 2`
- `purchasePeriod >= minPurchasePeriod`
- per-user per-token schedule count below `maxSchedulesPerToken`

## Practical Defaults (from repo deployment constants)

These are project defaults used in deployment scripts and may change by owner actions:

- Default min purchase amount: `25` tokens (18 decimals)
- Default min purchase period: `1 day`
- Max schedules per token: `10`

The frontend currently presents 1/2/4 week presets for UX.

## What Happens On-Chain

1. DcaManager validates params.
2. The selected handler is resolved from `(token, lendingProtocolIndex)` in `OperationsAdmin`.
3. Handler `depositToken` pulls stablecoin from your wallet.
4. Schedule is created with a generated `scheduleId`.

## Schedule ID

`scheduleId` is derived on creation from:

- user address
- token address
- block timestamp
- current per-token schedule count

## Next Steps

- [Manage existing schedules](/docs/user-guide/manage-schedules)
- [Understand fees](/docs/user-guide/fees)
